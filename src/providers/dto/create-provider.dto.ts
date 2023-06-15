import { IsString, IsNotEmpty, IsArray} from '@nestjs/class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { CreateMachineryDto } from 'src/machinery/dto/create-machinery.dto';

export class CreateProviderDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The id of the provider'
    })
    providerId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The name of the provider'
    })
    name: string;
}
