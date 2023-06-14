import { IsString, IsNotEmpty, IsArray} from '@nestjs/class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { CreateMachineryDto } from 'src/machinery/dto/create-machinery.dto';

export class CreateProviderDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The name of the provider'
    })
    name: string;

    @IsArray({
        message: 'The machinery list of the provider must be an array'
    })
    @IsNotEmpty()
    @ApiProperty({
        type: CreateMachineryDto,
        description: 'The machinery list of the provider'
    })
    machineryList: CreateMachineryDto[];
}
