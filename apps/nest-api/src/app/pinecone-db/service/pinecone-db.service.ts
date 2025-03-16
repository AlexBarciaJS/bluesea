import { Injectable } from '@nestjs/common';
import { Pinecone as PineconeClient } from '@pinecone-database/pinecone';
import { PineconeStore } from '@langchain/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';
import { DocumentInterface } from '@langchain/core/documents';
import { HumanMessage } from '@langchain/core/messages';
import { ChatProvider } from '../../chat-core/provider';
import { ChatModel } from '../../enums/chat-model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PineconeDbService {
  private readonly CHAT_GPT_EMBEDDING_MODEL: string;
  private readonly PINECONE_INDEX: string;

  constructor(
    private configService: ConfigService,
    private chatProvider: ChatProvider,
  ) {
    this.CHAT_GPT_EMBEDDING_MODEL =
      this.configService.get<string>('CHAT_GPT_EMBEDDING_MODEL') ||
      'default_model';

    this.PINECONE_INDEX =
      this.configService.get<string>('PINECONE_INDEX') || 'default_index';
  }

  async askToPineconeDb(
    question: string,
    customIndex?: string,
    model?: ChatModel,
  ) {
    const embeddings = new OpenAIEmbeddings({
      model: this.CHAT_GPT_EMBEDDING_MODEL,
    });

    const pinecone = new PineconeClient();
    const index = pinecone.Index(customIndex || this.PINECONE_INDEX);

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      maxConcurrency: 5,
    });

    //query
    const documents = await vectorStore.similaritySearch(question, 2);
    // retorna solamente las 100 primeras palabras de cada documento
    console.log(
      'docuemnts',
      documents.map((doc) => doc.pageContent.slice(0, 100)),
    );
    return this.getExactlyAnswer(documents, question, model);
  }

  async pineconeIndexes() {
    const pinecone = new PineconeClient();
    const indexes = await pinecone.listIndexes();
    return indexes.indexes;
  }

  getExactlyAnswer(
    documents: DocumentInterface[],
    question: string,
    model?: ChatModel,
  ) {
    const humanMessages: HumanMessage[] = [];
    for (const document of documents) {
      const message = new HumanMessage({
        content: [
          {
            type: 'text',
            text: document.pageContent,
          },
        ],
      });

      humanMessages.push(message);
    }

    if (model) {
      return this.chatProvider.askQuestionByModel(
        question,
        model,
        humanMessages,
      );
    }

    return this.chatProvider.askQuestion(question, humanMessages);
  }
}
