import { Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller('professores')
export class ProfessoresController {

    @Get()
    getProfessores() {
        return 'professores'
    }
    @Post()
    postProfessores() {
        return 'post professores'
    }
    @Put()
    putProfessores() {
        return 'put professores'
    }
    @Get(':id')
    getProfessor(@Param('id') id: number)  {
        return 'get professor id: '+id;
    }
}
