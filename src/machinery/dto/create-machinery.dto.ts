import { IsString, IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMachineryDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The id of the machinery'
    })
    machineryId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The name of the machinery'
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The category of the machinery'
    })
    category: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: 'The total quantity'
    })
    totalQuantity: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The provider id of the machinery'
    })
    providerId: string;
}
