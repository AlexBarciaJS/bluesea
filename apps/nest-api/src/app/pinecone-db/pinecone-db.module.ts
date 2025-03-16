import { Module } from '@nestjs/common';
import { PineconeDbController } from './controller/pinecone-db.controller';
import { PineconeDbService } from './service/pinecone-db.service';
import { ChatCoreModule } from '../chat-core/chat-core.module';

@Module({
  imports: [ChatCoreModule],
  controllers: [PineconeDbController],
  providers: [PineconeDbService],
})
export class PineconeDbModule {}
