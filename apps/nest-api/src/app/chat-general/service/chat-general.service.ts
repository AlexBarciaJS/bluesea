import { Injectable } from '@nestjs/common';
import { AIMessageChunk } from '@langchain/core/messages';
import Llama3Helper from '../../chat-core/helpers/llama3-helper';

@Injectable()
export class ChatGeneralService {
  llama3Helper: Llama3Helper;

  constructor() {
    this.llama3Helper = new Llama3Helper();
  }

  async askQuestionLlama3(question: string): Promise<AIMessageChunk> {
    return this.llama3Helper.askQuestion(question);
  }
}
