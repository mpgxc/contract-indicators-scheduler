import { Request as RequestExpress } from 'express';
import { PrismaClient } from '@prisma/client';

declare module 'express' {
  interface Request extends RequestExpress {
    prisma: PrismaClient;
  }
}
