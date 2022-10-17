import {
  Injectable,
  OnModuleDestroy,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private clients: Record<string, PrismaClient> = {};

  //TODO: Adicionar mecanismo de cache para evitar consultar o banco a cada requisição
  private async getTenants(): Promise<string[]> {
    const client = new PrismaClient();

    const response =
      (await client.$queryRaw`SELECT schema_name FROM information_schema.schemata;`) as Array<{
        schema_name: string;
      }>;

    client.$disconnect();

    return response
      .map(({ schema_name }) => schema_name)
      .filter((schema_name) =>
        schema_name.startsWith(process.env.TENANT_PREFIX),
      );
  }

  async getClient(request: Request): Promise<PrismaClient> {
    const tenantId = request.headers['x-tenant-id'];

    //TODO: Adicionar mecanismo de cache para evitar consultar o banco a cada requisição
    const tenants = await this.getTenants();

    if (!tenants.includes(tenantId)) {
      throw new ForbiddenException(
        'Tenant not found! You do not have permission to access this resource.',
      );
    }

    let client = this.clients[tenantId];

    if (!client) {
      client = new PrismaClient({
        datasources: {
          db: {
            url: process.env.DATABASE_URL.replace('public', tenantId),
          },
        },
      });

      this.clients[tenantId] = client;
    }

    return client;
  }

  async onModuleDestroy() {
    await Promise.all(
      Object.values(this.clients).map((client) => client.$disconnect()),
    );
  }
}
