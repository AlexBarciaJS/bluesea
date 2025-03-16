import { Module } from '@nestjs/common';
import { ChatProvider, ChatHelperProvider } from './provider';

@Module({
  providers: [ChatHelperProvider, ChatProvider],
  exports: [ChatProvider],
})
export class ChatCoreModule {}
