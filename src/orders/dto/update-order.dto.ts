import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsDateString, IsNotEmpty, IsArray, IsString, ValidateNested} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';
import { CreateOrderItemDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The id of the order'
    })
    orderId?: string;

    @IsDateString({
        message: 'The date of the order must be a date string'
    }) // Valida si sigue el formato ISO 8601, por ejemplo: YYYY-MM-DD.
    @IsNotEmpty()
    @ApiProperty({
        type: Date,
        description: 'The date of the order'
    })
    orderDate?: Date;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'The name of the seller'
    })
    seller?: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'The client id of the order'
    })
    clientId?: String;

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
    buyer?: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'The phone number of the buyer'
    })
    buyerPhone?: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'The name of the payment coordinator'
    })
    paymentCoordinator?: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: Number,
        description: 'The phone number of the payment coordinator'
    })
    paymentCoordinatorPhone?: number;

    @IsArray({
        message: 'The order items must be an array'
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @ApiProperty({
        type: CreateOrderItemDto,
        description: 'The machinery list of the order'
    })
    orderItems?: Array<CreateOrderItemDto>;
}
