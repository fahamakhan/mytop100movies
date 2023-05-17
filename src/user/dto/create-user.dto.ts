import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'James',
    description: 'The name of the user',
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    example: 'jamesbond@example.com',
    description: 'The email address of the user',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: 'user',
    description: 'The role of the user',
  })
  @IsNotEmpty()
  @IsString()
  role: string;

}

