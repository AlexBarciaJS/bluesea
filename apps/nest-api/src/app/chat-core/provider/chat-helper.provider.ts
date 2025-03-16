import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenaiHelper } from '../helpers/openai-helper';
import Llama3Helper from '../helpers/llama3-helper';
import { ChatModel } from '../../enums/chat-model';

export const ChatHelperProvider: Provider = {
  provide: 'ChatHelper',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const model = configService.get<ChatModel>('CHAT_MODEL'); // Get model from .env
    console.log('model', model);
    return model === ChatModel.LLAMA3 ? new Llama3Helper() : new OpenaiHelper();
  },
};
