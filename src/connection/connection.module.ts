import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { ConnectionGateway } from './connection.gateway';

@Module({
  providers: [ConnectionGateway, ConnectionService],
})
export class ConnectionModule {}
