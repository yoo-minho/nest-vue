import { Test, TestingModule } from '@nestjs/testing';
import { OpenGraphTagService } from './open-graph-tag.service';

describe('OpenGraphTagService', () => {
  let service: OpenGraphTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenGraphTagService],
    }).compile();

    service = module.get<OpenGraphTagService>(OpenGraphTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
