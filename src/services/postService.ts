import { Photo, PhotoFilter } from '../helpers/photoTypes';
import {IPost, PostsPayload} from '../helpers/postTypes';
const ApiError = require('../error/apiError');

class PostsRepository {
  private postId: number;
  private posts: IPost[];
  // private readonly emailNotifyServ: EmailNotificationService;
  constructor() {
    this.postId = 1;
    this.posts = [];
    // this.emailNotifyServ = new EmailNotificationService()
  }

  public createPost(id: number, payload: PostsPayload): void {
    if (this.checkPhotoSize(payload.photo)) {
      this.posts.push({
        id: this.postId,
        ...payload,
        authorId: id,
        createdData: new Date(),
        likers: []
      });
      this.postId = this.postId + 1;

      console.log('successfully created')
    } else {
      console.log('photo size it too big')

    }

  }

  public deletePost(userId: number, postId: number): string {
    const post = this.getPostById(postId);
    if(post === undefined) {
      throw ApiError.BadRequest('Post not found');
    }

    if (post.authorId != userId) {
      throw ApiError.NoAccesRights();
    }

    this.posts = this.posts.filter((posts) => posts.id != postId);
    return 'post was succesfully deleted'
  }

  public updatePost(userId: number, postId: number, payload: PostsPayload): IPost {
    const post = this.getPostById(postId);

    if(post === undefined) {
      throw ApiError.BadRequest('Post not found');
    }

    if (post.authorId != userId) {
      throw ApiError.NoAccesRights();
    }

    this.posts = this.posts.map((item) => {
      if (item.id === postId) {
        return { ...item, ...payload }
      }
      return item

    })
    return this.getPostById(postId);
  }

  public changePhotoFilter(userId: number, postId: number, filter: PhotoFilter): Photo {

    const post = this.getPostById(postId);

    if(post === undefined) {
      throw ApiError.BadRequest('Post not found');
    }

    if (post.authorId != userId) {
      throw ApiError.NoAccesRights();
    }

    this.posts = this.posts.map((item) => {
      if (item.id === postId) {
        const photo = { ...item.photo }
        photo.filter = filter
        return { ...item, photo }
      }
      return item
    })
    const filteredPhoto = this.getPostById(postId);
    return filteredPhoto.photo
  }

  public getLikes(id: number): number {
    const post = this.getPostById(id);

    if(post === undefined) {
      throw ApiError.BadRequest('Post not found')
    }

    return post.likers.length;
  }

  public getUserPosts(id: number): IPost[] {
    return this.posts.filter((posts) => posts.authorId === id)!;
  }

  public getAllPosts(): IPost[] {
    return this.posts;
  }

  public getPostById(postId: number): IPost {
    return this.posts.find((item) => item.id === postId)!;
  }

  public likePost(userId: number, postId: number): void {
    this.posts = this.posts.map((item) => {
      if (item.id === postId) {
        const userIndex = item.likers.findIndex((item) => item === userId)
        if (userIndex === -1) {
          item.likers.push(userId);
          // this.emailNotifyServ.postLikeNotify(item);
        } else {
          item.likers.splice(userIndex, 1);
        }
      }
      return item
    })
  }

  public checkPhotoSize(photo: Photo): boolean {
    if (photo.size > 1024) { //conditional check
      return false
    }
    return true
  }
}

module.exports = new PostsRepository();