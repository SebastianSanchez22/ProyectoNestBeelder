import { IsString, IsNotEmpty, IsArray} from '@nestjs/class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateSupplierDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The id of the supplier'
    })
    supplierId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The name of the supplier'
    })
    name: string;
}
