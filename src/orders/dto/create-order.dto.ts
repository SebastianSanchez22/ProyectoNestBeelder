import { IsDateString, IsNotEmpty, IsArray, IsString, IsNumber, ValidateNested} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderOrderItemDto } from './create-order-orderItem.dto';

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
    }) // Valida si sigue el formato ISO 8601, por ejemplo: YYYY-MM-DD HH-MM-SS.
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
    clientId: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'The NIT of the client'
    })
    NIT: string;

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
        type: Number,
        description: 'The phone number of the buyer'
    })
    buyerPhone: number;

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
        type: [CreateOrderOrderItemDto],
        description: 'The machines list of the order'
    })
    orderItems: CreateOrderOrderItemDto[];
}
