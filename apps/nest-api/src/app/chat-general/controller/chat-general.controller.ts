import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ChatGeneralService } from '../service/chat-general.service';

@ApiTags('chat')
@Controller('chat')
export class ChatGeneralController {
  constructor(private chatGeneralService: ChatGeneralService) {}

  @Post('question')
  @ApiBody({
    schema: { type: 'object', properties: { question: { type: 'string' } } },
  })
  askQuestion(@Body('question') question: string) {
    return this.chatGeneralService.askQuestionLlama3(question);
  }
}
