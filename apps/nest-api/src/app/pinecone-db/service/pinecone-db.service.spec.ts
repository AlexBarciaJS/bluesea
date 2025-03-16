import { Test, TestingModule } from '@nestjs/testing';
import { PineconeDbService } from './pinecone-db.service';

describe('PineconeDbService', () => {
  let service: PineconeDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PineconeDbService],
    }).compile();

    service = module.get<PineconeDbService>(PineconeDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
