import { Test, TestingModule } from '@nestjs/testing';
import { OpenGraphTagController } from './open-graph-tag.controller';
import { OpenGraphTagService } from './open-graph-tag.service';

describe('OpenGraphTagController', () => {
  let controller: OpenGraphTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenGraphTagController],
      providers: [OpenGraphTagService],
    }).compile();

    controller = module.get<OpenGraphTagController>(OpenGraphTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
