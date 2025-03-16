import { Test, TestingModule } from '@nestjs/testing';
import { ChatGeneralController } from './chat-general.controller';

describe('ChatGeneralController', () => {
  let controller: ChatGeneralController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatGeneralController],
    }).compile();

    controller = module.get<ChatGeneralController>(ChatGeneralController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
