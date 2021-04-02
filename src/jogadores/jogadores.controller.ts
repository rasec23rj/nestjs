import { Jogador } from './interfaces/jogador.interface';

import { Body, Controller, Delete, ForbiddenException, Get, Post, Query, UseFilters, UsePipes, ValidationPipe, HttpStatus, Res, HttpCode } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { Error } from 'mongoose';


@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(20)
  @UseFilters(new HttpExceptionFilter())
  async creiarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    
    const result  = this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
    result.then(
      (value) => {
         value
      }
    ).catch(
      (Error) => {
        
        
        throw new ForbiddenException();
     

      }
    );
    
  }
  @Get()
  async listaJogador(
    @Query('email') email: string,
  ): Promise<Jogador[] | Jogador> {
    if (email) {
      return await this.jogadoresService.consultaJogadoresEmail(email);
    } else {
      return await this.jogadoresService.consultaTodosJogadores();
    }
  }
  @Delete()
  async deletarJogador(@Query('email') email: string): Promise<any> {
    this.jogadoresService.deletarJogador(email);
  }
}
