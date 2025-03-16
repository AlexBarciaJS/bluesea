import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PineconeDbModule } from './pinecone-db/pinecone-db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PineconeDbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
