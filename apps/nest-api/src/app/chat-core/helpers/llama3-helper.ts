import { ChatOllama } from '@langchain/ollama';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { GENERIC_ROLE, LLAMA3_MODEL } from '../../common/constants';
import { ChatBase } from '../provider';

export default class Llama3Helper extends ChatBase {
  ollama: ChatOllama;

  constructor() {
    super();
    this.ollama = new ChatOllama({
      baseUrl: 'http://127.0.0.1:11434',
      model: LLAMA3_MODEL,
      temperature: 0,
      maxRetries: 2,
    });
  }

  async askQuestion(question: string) {
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', GENERIC_ROLE],
      ['human', '{input}'],
    ]);

    const chain = prompt.pipe(this.ollama);

    return await chain.invoke({
      input: question,
    });
  }

  async askQuestionWithContext(
    question: string,
    humanMessage: HumanMessage | HumanMessage[],
    role: string = GENERIC_ROLE,
  ) {
    const systemMessage = new SystemMessage(role);
    const questionMessage = new HumanMessage(question);

    const messages = Array.isArray(humanMessage)
      ? humanMessage
      : [humanMessage];

    const prompt = ChatPromptTemplate.fromMessages([
      systemMessage,
      ...messages,
      questionMessage,
    ]);

    const chain = prompt.pipe(this.ollama);

    return await chain.invoke({
      input: question,
    });
  }
}
