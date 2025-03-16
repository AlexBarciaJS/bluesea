import Llama3Helper from '../helpers/llama3-helper';
import { OpenaiHelper } from '../helpers/openai-helper';
import { Inject, Injectable } from '@nestjs/common';
import { HumanMessage } from '@langchain/core/messages';
import { ChatModel } from '../../enums/chat-model';

@Injectable()
export class ChatProvider {
  constructor(
    @Inject('ChatHelper') private chatHelper: OpenaiHelper | Llama3Helper,
  ) {}

  async askQuestion(
    question: string,
    humanMessage?: HumanMessage | HumanMessage[],
  ) {
    return this.chatHelper.askQuestionWithContext(question, humanMessage || []);
  }

  async askQuestionByModel(
    question: string,
    model: ChatModel,
    humanMessage?: HumanMessage | HumanMessage[],
  ) {
    if (model === ChatModel.LLAMA3) {
      const llama3Helper = new Llama3Helper();
      return llama3Helper.askQuestionWithContext(question, humanMessage || []);
    }

    const openaiHelper = new OpenaiHelper();
    return openaiHelper.askQuestionWithContext(question, humanMessage || []);
  }
}
