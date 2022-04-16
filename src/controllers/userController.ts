import { Request, Response, NextFunction } from 'express';
import { IUser } from '../helpers/userTypes';
import {IGetUserAuthInfoRequest} from '../middleware/authMiddleware';

const userService = require('../services/userService');
const tokenService = require('../services/tokenService');

class UserController {

  public login(req: Request, res: Response, next: NextFunction) {
    try{
      const {firstName, lastName, email, password} = req.body;
      const user: IUser = userService.login({firstName, lastName, email, password});
      const token = tokenService.generate({id: user.id, emal: user.email})
      return res.json(user)
    } catch(e) {
      next(e)
    }
  }

  public registration(req: Request, res: Response, next: NextFunction) {
    try{
      const {firstName, lastName, email, password} = req.body;
      const user = userService.registration({firstName, lastName, email, password});
      const token = tokenService.generate({id: user.id, emal: user.email})
      return res.json(user)
    } catch(e) {
      next(e);
    }
    
  }

  public getUserInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.body
      const userById: IUser = userService.getUserInfo(id)!;
      return res.json(userById)
    } catch(e) {
      next(e);
    }
    
  }

  public getUserByEmail(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    try{
      const {email} = req.body
      const userByEmail: IUser = userService.getUserByEmail(email);
      return res.json(userByEmail);
    } catch(e) {
      next(e);
    }
  }

  public updateUserInfo(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    try {
      const {firstName, lastName} = req.body;
      const {id} = req.user;

      const updatedUser: string = userService.updateUserInfo(id, firstName, lastName);
      return res.json(updatedUser);
    } catch(e) {
      next(e);
    }
  }

  public subscribeEmailNotify(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    try {
      return res.json(userService.subscribeEmailNotify(req.user.id));
    } catch(e) {
      next(e);
    }
  }

  public unSubEmailNotify(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    try {
      return res.json(userService.unSubEmailNotify(req.user.id));
    } catch(e) {
      next(e);
    }
  }

}

module.exports = new UserController();