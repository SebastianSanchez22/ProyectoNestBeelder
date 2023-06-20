import { IsString, IsNotEmpty, IsArray} from '@nestjs/class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './create-supplier.dto';
import { CreateMachineryDto } from 'src/machinery/dto/create-machinery.dto';

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

    @IsArray({
        message: 'The machinery list of the supplier must be an array'
    })
    @IsNotEmpty()
    @ApiProperty({
        type: CreateMachineryDto,
        description: 'The machinery list of the supplier'
    })
    machineryList?: CreateMachineryDto[];

}
