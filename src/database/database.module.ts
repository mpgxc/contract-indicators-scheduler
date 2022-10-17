import { REQUEST } from '@nestjs/core';
import { Module, Scope } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { DatabaseService } from './database.service';

@Module({
  providers: [
    DatabaseService,
    {
      scope: Scope.REQUEST,
      inject: [REQUEST, DatabaseService],
      provide: PrismaClient,
      useFactory: (request: Request, manager: DatabaseService) =>
        manager.getClient(request),
    },
  ],
  exports: [PrismaClient],
})
export class DatabaseModule {}
