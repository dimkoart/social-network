import { IValidate } from '../helpers/validateInterface';
import { UserPayload, IUser } from '../helpers/userTypes';


const ApiError = require('../error/apiError');
const mailService = require('./mailService');

class UserRepository implements IValidate {
  private userId: number;
  private users: IUser[]=[];

  constructor() {
    this.userId = 1;
    
  }

  public login(payload: UserPayload): IUser {
    if (this.checkEmail(payload.email)) {
      throw ApiError.BadRequest('there is no registred user with such email')
    }

    // this.users.map((item) => {
    //   if (item.email === payload.email) {
    //     item.isLogin = true;
    //   }
    // })

    const user = this.users.find((item) => item.email === payload.email)!;
    console.log(user)
    return user
  }

  public registration(payload: UserPayload): IUser {
    if (!this.checkEmail(payload.email)) {
      throw ApiError.BadRequest('user with this email is already registered')
    }
    const user = {
      id: this.userId,
      ...payload,
      // isLogin: true,
      isMailSubscribe: false
    }
    this.users.push(user)
    this.userId = this.userId + 1;
    return user;
  }

  public getUserInfo(userId: number): IUser {
    return this.users.find((item) => item.id === userId)!;
  }

  public getUserByEmail(email: string): IUser {
    return this.users.find((item) => item.email === email)!;
  }

  public updateUserInfo(userId: number, firstName?: string, lastName?: string): IUser {
    this.users.map((item) => {
      if (item.id === userId) {
        if (firstName != undefined && lastName != undefined) {
          item.firstName = firstName,
          item.lastName = lastName
        }

        if (firstName != undefined) {
          return item.firstName = firstName;
        }
        if (lastName != undefined) {
          return item.lastName = lastName;
        }
      }
      return item;
    })
    const user = this.getUserInfo(userId);
    console.log(mailService.updateProfileNotify(user.email));
    return user

  }

  public configureEmailSending(): void { }

  checkEmail(email: string): boolean {
    const user = this.getUserByEmail(email);
    if (user === undefined) {
      return true
    }
    return false
  }

  public subscribeEmailNotify(id: number): string {
    const user = this.getUserInfo(id);

    if (!user.isMailSubscribe) {
      user.isMailSubscribe = true
      return 'you have successfully subscribed to the email notification';
    }
    return 'you already subscribed to the email notification'


  }

  public unSubEmailNotify(id: number): string {
    const user = this.getUserInfo(id);
    if (user.isMailSubscribe) {
      user.isMailSubscribe = false
      return 'you have successfully unsubscribed to the email notification';
    }
    return 'you already unsubscribed to the email notification'
  }
}
module.exports = new UserRepository();