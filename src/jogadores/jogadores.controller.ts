import { Jogador } from './interfaces/jogador.interface';

import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async creiarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
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
