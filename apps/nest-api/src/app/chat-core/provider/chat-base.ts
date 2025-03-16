import { AIMessageChunk, HumanMessage } from '@langchain/core/messages';

export abstract class ChatBase {
  abstract askQuestionWithContext(
    question: string,
    humanMessage?: HumanMessage | HumanMessage[],
  ): Promise<AIMessageChunk>;
}
