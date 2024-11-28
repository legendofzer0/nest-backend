import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { ConnectionService } from './connection.service';
import { CreateConnectionDto } from './dto/create-connection.dto';
import { UpdateConnectionDto } from './dto/update-connection.dto';

@WebSocketGateway()
export class ConnectionGateway {
  constructor(private readonly connectionService: ConnectionService) {}

  @SubscribeMessage('createConnection')
  create(@MessageBody() createConnectionDto: CreateConnectionDto) {
    return this.connectionService.create(createConnectionDto);
  }

  @SubscribeMessage('findAllConnection')
  findAll() {
    return this.connectionService.findAll();
  }

  @SubscribeMessage('findOneConnection')
  findOne(@MessageBody() id: number) {
    return this.connectionService.findOne(id);
  }

  @SubscribeMessage('updateConnection')
  update(@MessageBody() updateConnectionDto: UpdateConnectionDto) {
    return this.connectionService.update(updateConnectionDto.id, updateConnectionDto);
  }

  @SubscribeMessage('removeConnection')
  remove(@MessageBody() id: number) {
    return this.connectionService.remove(id);
  }
}
