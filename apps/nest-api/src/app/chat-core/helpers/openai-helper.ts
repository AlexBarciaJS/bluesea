import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { CHAT_GPT_MINI_MODEL, GENERIC_ROLE } from '../../common/constants';
import { ChatBase } from '../provider';

export class OpenaiHelper extends ChatBase {
  model: ChatOpenAI;

  constructor() {
    super();
    this.model = new ChatOpenAI({
      model: CHAT_GPT_MINI_MODEL,
      maxTokens: 300,
      temperature: 0,
    });
  }

  async askQuestionWithContext(
    question: string,
    humanMessage: HumanMessage | HumanMessage[],
  ) {
    const systemMessage = new SystemMessage(GENERIC_ROLE);
    const questionMessage = new HumanMessage(question);

    const messages = Array.isArray(humanMessage)
      ? humanMessage
      : [humanMessage];

    return await this.model.invoke([
      systemMessage,
      ...messages,
      questionMessage,
    ]);
  }
}
