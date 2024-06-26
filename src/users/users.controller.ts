import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';  //Estos son decoradores y utilidades que se usan para definir controladores y manejar las rutas y solicitudes HTTP.
import { UsersService } from './users.service'; //contiene la lógica de negocio
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/api/users')   // se define ruta base para manejar todas las rutas
export class UsersController {
  constructor(private readonly usersService: UsersService) {} //define un constructor que inyecta una instancia de UsersServicea

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll(); //this hace referencia al objeto  (usersServicio)
  }

  @Get(':id')
  findOne(@Param('id') id: string) { //@param recibe un parametro id y todo el body
    return this.usersService.findOne(+id); // +id convierte cadena en número
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {  
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id); 
  }
}
