import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: any, _res: any, next: NextFunction) {
    const userId = req.params.id;
    if (!userId) {
      throw new Error('User id is required');
    }
    if (isNaN(Number(userId))) {
      throw new Error('User id must be a number');
    }
    next();
  }
}
