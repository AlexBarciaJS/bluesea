import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatCoreModule } from './chat-core/chat-core.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ChatCoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
