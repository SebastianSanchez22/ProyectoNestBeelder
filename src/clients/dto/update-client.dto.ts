import { IsInt, IsNotEmpty, IsString, IsAlpha, MinLength, IsPositive} from '@nestjs/class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {

    @MinLength(2, {
        message: 'Name is too short. Minimal length is 2 characters',
      })
    @IsString()
    @IsAlpha()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The name of the client'
    })
    name?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The address of the client'
    })
    address?: string;


    @MinLength(7, {
        message: 'Phone number is too short. Minimal length is 7 characters',
      })
    @IsPositive({
        message: 'Phone number must be positive'
    })
    @IsInt()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: 'The phone of the client'
    })
    phone?: number;
}
