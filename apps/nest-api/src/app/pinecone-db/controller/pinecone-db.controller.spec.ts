import { Test, TestingModule } from '@nestjs/testing';
import { PineconeDbController } from './pinecone-db.controller';

describe('PineconeDbController', () => {
  let controller: PineconeDbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PineconeDbController],
    }).compile();

    controller = module.get<PineconeDbController>(PineconeDbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
