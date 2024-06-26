import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()  // para ser inyectada en controller(para que se pueda usar, le da propiedades)
export class UsersService {

  @InjectRepository(User) //user, la entidad creada en entity
  private userRepository: Repository<User>;
//los metodos son publicos porque necesitan ser accesibles para otros componentes
  public async create(createUserDto: CreateUserDto) { //Declara una función pública y asíncrona llamada create que recibe un parámetro createUserDto del tipo CreateUserDto
    const saltRounds = 10; //numero de rondas que va a tener salt
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.pass, saltRounds); //utiliza bcrypt para hashear el pass
      const newUser = this.userRepository.create({    // se crea objeto con user y pass hasheado //this para acceder a una propiedad de create
        user: createUserDto.user,
        pass: hashedPassword,
      });
      await this.userRepository.save(newUser);  //await: espera la promesa 
      return {
        statusCode: 200,
        msg: 'Se realizó con éxito la inserción.',
      };
    } catch (error) {   //catch:manejo de errores
      throw new BadRequestException('Error al crear el usuario', error.message);  // throw lanza la excepción
    }
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);    ///auth/login
  }

  public async findAll() {
    try {
      const resultado = await this.userRepository.find();  //espera a que el repo encuentre todos los datos
      return resultado; //retorna todos los registros
    } catch (error) { //si existe error de conexion a la bd tira este error
      throw new BadRequestException('Error al obtener los usuarios', error.message);
    }
  }

  public async findOne(id: number) { //busca por id, cuando le damos un id.
    try {
      const resultado = await this.userRepository.findOne({ where: { id } });
      return resultado;
    } catch (error) {
      throw new BadRequestException('Error al obtener el usuario', error.message);
    }
  }

  public async update(id: number, updateUserDto: UpdateUserDto) { //cuando actualizamos hace las rondas de sal tambien
    try {
      if (updateUserDto.pass) {
        const saltRounds = 10;
        updateUserDto.pass = await bcrypt.hash(updateUserDto.pass, saltRounds);
      }
      await this.userRepository.update(id, updateUserDto);
      return {
        statusCode: 200,
        msg: 'Se realizó con éxito la modificación.',
      };
    } catch (error) {
      throw new BadRequestException('Error al actualizar el usuario', error.message);
    }
  }

  public async remove(id: number) {
    try {
      await this.userRepository.delete(id);
      return {
        statusCode: 200,
        msg: 'Se realizó con éxito la eliminación.',
      };
    } catch (error) {
      throw new BadRequestException('Error al eliminar el usuario', error.message);
    }
  }
}
