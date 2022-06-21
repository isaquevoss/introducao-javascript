import { Test, TestingModule } from '@nestjs/testing';
import { ProfessoresController } from './professores.controller';

describe('ProfessoresController', () => {
  let controller: ProfessoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessoresController],
    }).compile();

    controller = module.get<ProfessoresController>(ProfessoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
