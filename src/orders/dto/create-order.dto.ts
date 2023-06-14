import { IsDateString, IsNotEmpty, IsArray} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';
import { CreateMachineryDto } from 'src/machinery/dto/create-machinery.dto';
import { CreateProviderDto } from 'src/providers/dto/create-provider.dto';

export class CreateOrderDto {

    @IsNotEmpty()
    @ApiProperty({
        type: CreateProviderDto,
        description: 'The provider of the order'
    })
    provider: CreateProviderDto;

    @IsArray({
        message: 'The order items must be an array'
    })
    @IsNotEmpty()
    @ApiProperty({
        type: CreateMachineryDto,
        description: 'The machinery list of the order'
    })
    orderItems: CreateMachineryDto[];

    @IsNotEmpty()
    @ApiProperty({
        type: CreateClientDto,
        description: 'The client of the order'
    })
    client: CreateClientDto;

    @IsDateString({
        message: 'The initial date of the order must be a date string'
    }) // Valida si sigue el formato ISO 8601, por ejemplo: YYYY-MM-DD.
    @IsNotEmpty()
    @ApiProperty({
        type: Date,
        description: 'The initial date of the order'
    })
    initialDate: Date;

    @IsDateString({
        message: 'The final date of the order must be a date string'
    })	// Alias for @IsISO8601().
    @IsNotEmpty()
    @ApiProperty({
        type: Date,
        description: 'The final date of the order'
    })
    finalDate: Date;
}
