import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatCoreModule } from './chat-core/chat-core.module';
import { ConfigModule } from '@nestjs/config';
import { ChatGeneralModule } from './chat-general/chat-general.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ChatCoreModule,
    ChatGeneralModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
