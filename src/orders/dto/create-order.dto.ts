import { IsDateString, IsNotEmpty, IsArray, IsString, IsNumber, ValidateNested} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'The machinery id of the order item'
    })
    machineryId: String;

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

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'The name of the seller'
    })
    seller: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'The client id of the order'
    })
    clientId: String;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'The NIT of the client'
    })
    NIT: String;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'The name of the buyer'
    })
    buyer: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'The phone number of the buyer'
    })
    buyerPhone: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'The name of the payment coordinator'
    })
    paymentCoordinator: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: Number,
        description: 'The phone number of the payment coordinator'
    })
    paymentCoordinatorPhone: number;

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

    

    
}
