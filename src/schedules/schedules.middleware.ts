import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestHeaders implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers?.['x-tenant-id']) {
      throw new BadRequestException('Missing x-tenant-id header');
    }

    return next();
  }
}
