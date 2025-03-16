import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PineconeDbService } from '../service/pinecone-db.service';
import { ChatModel } from '../../enums/chat-model';

interface CustomBody {
  question: string;
  index: string;
  model: ChatModel;
}

@ApiTags('pinecone')
@Controller('pinecone')
export class PineconeDbController {
  constructor(private readonly pineconeDbService: PineconeDbService) {}

  @Post('question')
  @ApiOperation({ summary: 'Ask a question to Pinecone DB' })
  @ApiBody({
    schema: { type: 'object', properties: { question: { type: 'string' } } },
  })
  @ApiResponse({ status: 200, description: 'Successful response' })
  askToPineconeDb(@Body('question') question: string) {
    return this.pineconeDbService.askToPineconeDb(question);
  }

  @Post('custom')
  @ApiOperation({ summary: 'Ask a question to Pinecone DB by index' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        question: { type: 'string' },
        index: { type: 'string' },
        model: { type: 'string', enum: Object.values(ChatModel) },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Successful response' })
  askToPineconeByIndex(@Body() customBody: CustomBody) {
    return this.pineconeDbService.askToPineconeDb(
      customBody.question,
      customBody.index,
      customBody.model,
    );
  }

  @Get('indexes')
  @ApiOperation({ summary: 'Get Pinecone indexes' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  pineconeIndexes() {
    return this.pineconeDbService.pineconeIndexes();
  }
}
