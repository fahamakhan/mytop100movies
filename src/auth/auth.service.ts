import { sign } from 'jsonwebtoken';
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { IAuthenticate } from './interfaces/user.interface';



@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async signUp(createUserDto: CreateUserDto): Promise<{ token: string, user: UserEntity }> {
    try {
      const { password } = createUserDto;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
      await this.userRepository.save(user);


      delete user.password;
      const token = sign({ ...user }, process.env.JWT_SECRET);

      return { token, user };
    } catch (e) {
      console.error(e.message)
      throw new BadRequestException('Something went wrong!')
    }
  }


  async login(loginUserDto: LoginUserDto): Promise<IAuthenticate> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid email or not verified');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    delete user.password;
    const token = sign({ ...user }, process.env.JWT_SECRET);

    return { token, user };
  }

}
