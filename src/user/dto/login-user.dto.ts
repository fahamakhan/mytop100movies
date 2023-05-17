import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({
        example: 'jamesbond@example.com',
        description: 'The email of the user',
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

}