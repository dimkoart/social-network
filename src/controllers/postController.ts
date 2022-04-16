import { Request, Response, NextFunction } from 'express';
import { IPost } from '../helpers/postTypes';
import { IGetUserAuthInfoRequest } from '../middleware/authMiddleware';

const postService = require('../services/postService');
const ApiError = require('../error/apiError');

class PostController {


  public createPost(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    try {
      const { payload } = req.body;
      const { id } = req.user
      const post = postService.createPost(id, payload);
      return res.json(post);
    } catch (e) {
      next(e);
    }
  }

  public deletePost(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    try {
      const { postId } = req.body;
      const { id } = req.user

      return res.json(postService.deletePost(id, postId));
    } catch (e) {
      next(e);
    }
  }

  public updatePost(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    try {
      const { postId, payload } = req.body;
      const { id } = req.user;

      const updatedPost: IPost = postService.updatePost(id, postId, payload);
      return res.json(updatedPost);
    } catch (e) {
      next(e)
    }
  }

  public getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const allPosts: IPost[] = postService.getAllPosts()
      return res.json(allPosts);
    } catch (e) {
      next(e);
    }
  }

  public getUserPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body;
      const userPosts: IPost[] = postService.getUserPosts(userId);
      return res.json(userPosts);
    } catch (e) {
      next(e);
    }
  }

  public getLikes(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId } = req.body;
      const countOfLikes = postService.getLikes(postId);
      return res.json(countOfLikes)
    } catch (e) {
      next(e);
    }
  }

  public likePost(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    try {
      const { postId } = req.body;
      const { id } = req.user;

      const likePost = postService.likePost(id, postId);
      res.json(likePost)
    } catch (e) {
      next(e)
    }
  }

  public changePhotoFilter(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    try {
      const { postId, filter } = req.body;
      const { id } = req.user;
      
      const updatedPhoto = postService.changePhotoFilter(id, postId, filter);
      res.json(updatedPhoto);
    } catch (e) {
      next(e);
    }

  }

}

module.exports = new PostController();