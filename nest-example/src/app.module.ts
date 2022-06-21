import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunosController } from './alunos/alunos.controller';
import { ProfessoresController } from './professores/professores.controller';

@Module({
  imports: [],
  controllers: [AppController, AlunosController, ProfessoresController],
  providers: [AppService],
})
export class AppModule {}
