import { Test, TestingModule } from '@nestjs/testing';
import { ChatGeneralService } from './chat-general.service';

describe('ChatGeneralService', () => {
  let service: ChatGeneralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGeneralService],
    }).compile();

    service = module.get<ChatGeneralService>(ChatGeneralService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
