import { IsString, IsNotEmpty, IsArray} from '@nestjs/class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './create-supplier.dto';
import { CreateMachineDto } from 'src/machines/dto/create-machine.dto';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The id of the supplier'
    })
    supplierId?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The name of the supplier'
    })
    name?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The timezone of the supplier'
    })
    timezone?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The country of the supplier'
    })
    country?: string;

    @IsArray({
        message: 'The machinery list of the supplier must be an array'
    })
    @IsNotEmpty()
    @ApiProperty({
        type: CreateMachineDto,
        description: 'The machinery list of the supplier'
    })
    machinesList?: String[];

}
