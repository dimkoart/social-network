// // interface IValidate {
// //   checkEmail?(email: string): boolean;
// //   checkPhotoSize?(size: number): boolean;
// // };

// // interface UserPayload {
// //   firstName: string;
// //   lastName: string;
// //   email: string;
// // }

// // interface IUser {
// //   userId: number;
// //   firstName: string;
// //   lastName: string;
// //   email: string;
// //   isLogin: boolean;
// //   isMailSubscribe: boolean;
// // }

// interface PostsPayload {
//   description: string;
//   photo: Photo;
//   title: string;
// }

// type Photo = {
//   image: string;
//   size: number;
//   filter: string
// }

// interface IPost {
//   id: number;
//   title: string;
//   description: string;
//   createdData: Date;
//   authorId: number;
//   photo: Photo;
//   photoFilter: string;
//   likers: number[];
// }

// enum PhotoFilter {
//   none = 'None',
//   moon = 'Moon',
//   amaro = 'Amaro',
//   nashville = 'Nashville',
//   clarendon = 'Clarendon'
// }

// // class UserRepository implements IValidate {
// //   private userId: number;
// //   private users: IUser[];
// //   private readonly emailNotifyServ: EmailNotificationService
// //   constructor() {
// //     this.userId = 1;
// //     this.users = [];
// //     this.emailNotifyServ = new EmailNotificationService();
// //   }

// //   public login(payload: UserPayload): void {
// //     if (this.checkEmail(payload.email)) {
// //       this.users.map((item) => {
// //         if (item.email === payload.email) {
// //           item.isLogin = true;
// //         }
// //       })
// //     }
// //   }

// //   public registration(payload: UserPayload): void {
// //     if (this.checkEmail(payload.email)) {
// //       this.users.push({
// //         userId: this.userId,
// //         ...payload,
// //         isLogin: true,
// //         isMailSubscribe: false
// //       })
// //       this.userId = this.userId + 1;
// //     }
// //   }

// //   public getUserInfo(userId: number): IUser {
// //     return this.users.find((item) => item.userId === userId)!;
// //   }

// //   public getUserByEmail(email: string): IUser {
// //     return this.users.find((item) => item.email === email)!;
// //   }

// //   public updateUserInfo(userId: number, firstName: string, lastName: string): void {
// //     this.users.map((item) => {
// //       if (item.userId === userId) {
// //         item.firstName = firstName;
// //         item.lastName = lastName;
// //       }
// //     this.emailNotifyServ.updateProfileNotify(item.email)
// //     })
// //   }

// //   public configureEmailSending(): void { }

// //   checkEmail(email: string): boolean {
// //     const uniqEmail = this.users.find((item) => item.email === email)
// //     if (!uniqEmail) {
// //       return true
// //     }
// //     return false
// //   }

// //   public subscribeEmailNotify(id: number): string {
// //     const user = this.users.find((item) => item.userId === id)!;

// //     if (!user.isMailSubscribe) {
// //       user.isMailSubscribe = true
// //       return 'you have successfully subscribed to the email notification';
// //     }
// //     return 'you already subscribed to the email notification'


// //   }

// //   public unSubEmailNotify(id: number): string {
// //     const user = this.users.find((item) => item.userId === id)!;
// //     if (user.isMailSubscribe) {
// //       user.isMailSubscribe = false
// //       return 'you have successfully unsubscribed to the email notification';
// //     }
// //     return 'you already unsubscribed to the email notification'
// //   }


// // }

// class UserService {
//   private readonly userRepository: UserRepository;
//   constructor() {
//     this.userRepository = new UserRepository()
//   }

//   public login(payload: UserPayload) {
//     this.userRepository.login(payload);
//   }

//   public registration(payload: UserPayload) {
//     this.userRepository.registration(payload);
//   }

//   public getUserInfo(payload: UserPayload): IUser {
//     return this.userRepository.registration(payload)!;
//   }

//   public getUserByEmail(payload: UserPayload): IUser {
//     return this.userRepository.registration(payload)!;
//   }

//   public updateUserInfo(id: number, firstName: string, lastName: string) {
//     this.userRepository.updateUserInfo(id, firstName, lastName);
//   }

//   public subscribeEmailNotify(userId: number): string {
//     return this.userRepository.subscribeEmailNotify(userId);
//   }

//   public unSubEmailNotify(userId: number): string {
//     return this.userRepository.unSubEmailNotify(userId);
//   }

// }

// class PostsRepository {
//   private postId: number;
//   private posts: IPost[];
//   private readonly emailNotifyServ: EmailNotificationService;
//   constructor() {
//     this.postId = 1;
//     this.posts = [];
//     this.emailNotifyServ = new EmailNotificationService()
//   }

//   public createPost(userId: number, payload: PostsPayload): void {
//     if (this.checkPhotoSize(payload.photo)) {
//       this.posts.push({
//         id: this.postId,
//         ...payload,
//         authorId: userId,
//         createdData: new Date(),
//         photoFilter: 'none',
//         likers: []
//       });
//       this.postId = this.postId + 1;

//       console.log('successfully create')
//     } else {
//       console.log('photo size it too big')
//     }

//   }

//   public deletePost(id: number): void {
//     this.posts = this.posts.filter((posts) => posts.id != id);
//   }

//   public updatePost(postId: number, payload: PostsPayload): IPost {
//     this.posts = this.posts.map((item) => {
//       if (item.id === postId) {
//         return { ...item, ...payload }
//       }
//       return item

//     })
//     return this.posts.find((item) => item.id === postId)!;
//   }

//   public changePhotoFilter(id: number, filter: PhotoFilter): Photo {
//     this.posts = this.posts.map((item) => {
//       if (item.id === id) {
//         const photo = { ...item.photo }
//         photo.filter = filter
//         return { ...item, photo }
//       }
//       return item
//     })
//     const filteredPhoto = this.posts.find((item) => item.id === id)!
//     return filteredPhoto.photo
//   }

//   public getLikes(id: number): number {
//     const post = this.posts.find((item) => item.id === id)!;
//     return post.likers.length;
//   }

//   public getUserPosts(id: number): IPost[] {
//     return this.posts.filter((posts) => posts.authorId === id)!;
//   }

//   public getAllPosts(): IPost[] {
//     return this.posts
//   }

//   public likePost(userId: number, postId: number): void {
//     this.posts = this.posts.map((item) => {
//       if (item.id === postId) {
//         const userIndex = item.likers.findIndex((item) => item === userId)
//         if (userIndex === -1) {
//           item.likers.push(userId);
//           this.emailNotifyServ.postLikeNotify(item);
//         } else {
//           item.likers.splice(userIndex, 1);
//         }
//       }
//       return item
//     })
//   }

//   public checkPhotoSize(photo: Photo): boolean {
//     if (photo.size > 1024) { //conditional check
//       return false
//     }
//     return true
//   }
// }

// class PostsService {
//   private readonly postsRepository: PostsRepository;
//   constructor() {
//     this.postsRepository = new PostsRepository();
//   }

//   public createPost(userId: number, payload: PostsPayload): void {
//     this.postsRepository.createPost(userId, payload);
//   }

//   public deletePost(id: number): void {
//     this.postsRepository.deletePost(id);
//   }

//   public updatePost(postId: number, payload: PostsPayload): IPost {
//     return this.postsRepository.updatePost(postId, payload);
//   }

//   public getAllPosts(): IPost[] {
//     return this.postsRepository.getAllPosts();
//   }

//   public getUserPosts(id: number): IPost[] {
//     return this.postsRepository.getUserPosts(id);
//   }

//   public getLikes(id: number): number {
//     return this.postsRepository.getLikes(id);
//   }

//   public likePost(userId: number, postId: number): void {
//     this.postsRepository.likePost(userId, postId);
//   }

//   public changePhotoFilter(postId: number, filter: PhotoFilter): Photo {
//     return this.postsRepository.changePhotoFilter(postId, filter);
//   }

// }

// class EmailNotificationRepository {
//   public updateProfileNotify(email: string): string {
//     return `your profile has been reset, a notification has been
//      sent to your email ${email}`
//   }

//   public postLikeNotify(post: IPost): string {
//     return `someone has been liked your post ${post.title}`;
//   }
// }

// class EmailNotificationService {
//   private readonly emailNoifyRepository: EmailNotificationRepository
//   constructor() {
//     this.emailNoifyRepository = new EmailNotificationRepository()
//   }

//   public updateProfileNotify(email: string): void {
//     console.log(this.emailNoifyRepository.updateProfileNotify(email));
//   }

//   public postLikeNotify(post: IPost): void {
//     console.log(this.emailNoifyRepository.postLikeNotify(post));
//   }
// }

// const userServ = new UserService();
// const anderey: UserPayload[] = [
//   {
//     firstName: 'Ivan',
//     lastName: 'Ivanov',
//     email: 'ivan.ivanov@leverx.com',
//   },
//   {
//     firstName: 'AG',
//     lastName: 'sDgmd',
//     email: 'jhbjkdsmkf.ivanov@leverx.com',
//   },
// ];
// anderey.forEach((userData: UserPayload) => {
//   userServ.registration(userData);
// });

// const postServ = new PostsService;
// const userPost1: PostsPayload[] = [
//   {
//     title: 'title',
//     description: 'descr',
//     photo: {
//       image: 'car.jpg',
//       size: 1000,
//       filter: 'none'
//     }
//   },
//   {
//     title: 'huds',
//     description: 'dgdsgs',
//     photo: {
//       image: 'flower.jpg',
//       size: 297,
//       filter: 'none'
//     }
//   },
//   {
//     title: 'gds',
//     description: 'bgsdmn',
//     photo: {
//       image: 'fruit.jpg',
//       size: 900,
//       filter: 'none'
//     }
//   },
// ];

// const userPost2: PostsPayload[] = [
//   {
//     title: 'second user',
//     description: 'gsdg',
//     photo: {
//       image: 'rock.jpg',
//       size: 876,
//       filter: 'none'
//     }
//   },
// ]

// const updateData: PostsPayload = {
//   title: 'updated',
//   description: 'desc updated',
//   photo: {
//     image: 'potato.jpg',
//     size: 876,
//     filter: 'none'
//   }
// }

// userPost1.forEach((postsData: PostsPayload) => {
//   postServ.createPost(1, postsData)
// })

// userPost2.forEach((postsData: PostsPayload) => {
//   postServ.createPost(2, postsData)
// })
// console.log('All posts:');
// console.log(postServ.getAllPosts());
// console.log('deleting post');
// postServ.deletePost(2);
// console.log('Update post:');
// console.log(postServ.updatePost(3, updateData));
// console.log('All posts:');
// console.log(postServ.getAllPosts());
// console.log('get user posts: ');
// console.log(postServ.getUserPosts(2));

// console.log('Count of likes: ' + postServ.getLikes(3));
// postServ.likePost(2, 3); //+like
// console.log('Count of likes: ' + postServ.getLikes(3));
// postServ.likePost(2, 3); //-like
// console.log('Count of likes: ' + postServ.getLikes(3));

// console.log(postServ.changePhotoFilter(3, PhotoFilter.moon))

// console.log(userServ.subscribeEmailNotify(2));
// console.log(userServ.unSubEmailNotify(2));






