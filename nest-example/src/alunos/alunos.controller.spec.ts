import { Test, TestingModule } from '@nestjs/testing';
import { AlunosController } from './alunos.controller';

describe('AlunosController', () => {
  let controller: AlunosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlunosController],
    }).compile();

    controller = module.get<AlunosController>(AlunosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
