import { IsDateString, IsNotEmpty, IsArray, IsString, IsNumber, ValidateNested} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';
import { CreateMachineryDto } from 'src/machinery/dto/create-machinery.dto';

export class CreateOrderItemDto {
    @IsNotEmpty()
    @ApiProperty({
        type: CreateMachineryDto,
        description: 'The machinery of the order item'
    })
    machinery: CreateMachineryDto;

    @IsNumber()
    @ApiProperty({ 
        type: Number,
        description: 'Machinery quantity'
    })
    quantity: number;

    @IsDateString({
        message: 'The initial rent date of the machinery must be a date string'
    }) // Valida si sigue el formato ISO 8601, por ejemplo: YYYY-MM-DD.
    @IsNotEmpty()
    @ApiProperty({
        type: Date,
        description: 'The initial rent date of the machinery'
    })
    InitialRentDate: Date;

    @IsDateString({
        message: 'The final rent date of the machinery must be a date string'
    })	// Alias for @IsISO8601().
    @IsNotEmpty()
    @ApiProperty({
        type: Date,
        description: 'The final rent date of the machinery'
    })
    FinalRentDate: Date;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The price time unit of the machinery'
    })
    priceTimeUnit: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: 'The price per hour of the machinery'
    })
    pricePerHour: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: 'The total price of the machinery'
    })
    totalPrice: number;
}

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
    @ValidateNested({ each: true })
    @ApiProperty({
        type: CreateOrderItemDto,
        description: 'The machinery list of the order'
    })
    orderItems: Array<CreateOrderItemDto>;

    @IsNotEmpty()
    @ValidateNested()
    @ApiProperty({
        type: CreateClientDto,
        description: 'The client of the order'
    })
    client: CreateClientDto;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'The name of the seller'
    })
    seller: string;
}
