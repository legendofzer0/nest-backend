import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConnectionModule } from './connection/connection.module';
import { HashMiddleware } from './hash/hash.middleware';
import { UsersController } from './users/users.controller';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [UsersModule, ConnectionModule, RolesModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HashMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.GET },
        { path: 'users/login', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.DELETE },
      )
      .forRoutes(UsersController);
  }
}
