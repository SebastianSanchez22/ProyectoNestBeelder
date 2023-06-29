import { IsDateString, IsNotEmpty, IsString, IsNumber} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateOrderOrderItemDto {
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
    rentInitialDate: Date;

    @IsDateString({
        message: 'The final rent date of the machinery must be a date string'
    })	// Alias for @IsISO8601().
    @IsNotEmpty()
    @ApiProperty({
        type: Date,
        description: 'The final rent date of the machinery'
    })
    rentFinalDate: Date;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: 'The unit price of the machinery'
    })
    unitPrice: number;

    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'The price time unit of the machinery (hour, day, week, month)'
    })
    unitPriceTimeUnit: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: 'The unit cost of the machinery'
    })
    unitCost: number;

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