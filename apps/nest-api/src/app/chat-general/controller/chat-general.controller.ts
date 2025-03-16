import { Body, Controller, Post } from '@nestjs/common';
import { ChatGeneralService } from '../service/chat-general.service';

@Controller('chat')
export class ChatGeneralController {
  constructor(private chatGeneralService: ChatGeneralService) {}

  @Post('question')
  askQuestion(@Body('question') question: string) {
    return this.chatGeneralService.askQuestionLlama3(question);
  }
}
