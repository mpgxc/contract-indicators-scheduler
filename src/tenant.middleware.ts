import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      req.prisma = new PrismaClient({
        datasources: {
          db: {
            url: `${process.env.DATABASE_URL_TENANT}${req.headers['x-tenant-id']}`,
          },
        },
      });
    } catch (error) {
      throw new ForbiddenException('Tenant not found');
    }

    return next();
  }
}
