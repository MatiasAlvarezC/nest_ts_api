import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() //maneja las entradas y salidas de peticiones http
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello(); // Define un método llamado getHello que devuelve una cadena de texto
  }
}
