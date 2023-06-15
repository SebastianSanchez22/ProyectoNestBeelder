import { IsDateString, IsNotEmpty, IsArray, IsString} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';
import { CreateMachineryDto } from 'src/machinery/dto/create-machinery.dto';
import { CreateProviderDto } from 'src/providers/dto/create-provider.dto';

export class CreateOrderDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The id of the order'
    })
    orderId: string;

    @IsDateString({
        message: 'The date of the order must be a date string'
    }) // Valida si sigue el formato ISO 8601, por ejemplo: YYYY-MM-DD.
    @IsNotEmpty()
    @ApiProperty({
        type: Date,
        description: 'The date of the order'
    })
    orderDate: Date;

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
        message: 'The initial rent date of the order must be a date string'
    }) // Valida si sigue el formato ISO 8601, por ejemplo: YYYY-MM-DD.
    @IsNotEmpty()
    @ApiProperty({
        type: Date,
        description: 'The initial rent date of the order'
    })
    InitialRentDate: Date;

    @IsDateString({
        message: 'The final rent date of the order must be a date string'
    })	// Alias for @IsISO8601().
    @IsNotEmpty()
    @ApiProperty({
        type: Date,
        description: 'The final rent date of the order'
    })
    FinalRentDate: Date;
}
