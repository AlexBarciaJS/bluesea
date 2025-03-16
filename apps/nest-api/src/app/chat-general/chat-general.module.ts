import { Module } from '@nestjs/common';
import { ChatGeneralController } from './controller/chat-general.controller';
import { ChatGeneralService } from './service/chat-general.service';

@Module({
  imports: [],
  controllers: [ChatGeneralController],
  providers: [ChatGeneralService],
})
export class ChatGeneralModule {}
