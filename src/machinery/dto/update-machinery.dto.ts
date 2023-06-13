import { PartialType } from '@nestjs/mapped-types';
import { CreateMachineryDto } from './create-machinery.dto';
import { IsString, IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMachineryDto extends PartialType(CreateMachineryDto) {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The name of the machinery'
    })
    readonly name?: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ 
        type: Number,
        description: 'The cost of the machinery'
    })
    readonly cost?: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: 'The selling price of the machinery'
    })
    readonly sellingPrice?: number;


    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: 'The beelder price of the machinery'
    })
    readonly beelderPrice?: number;
}
