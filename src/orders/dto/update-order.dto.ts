import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsDate, IsNotEmpty, IsArray, IsDateString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProviderDto } from 'src/providers/dto/create-provider.dto';
import { CreateMachineryDto } from 'src/machinery/dto/create-machinery.dto';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {

    @IsNotEmpty()
    @ApiProperty({
        type: CreateProviderDto,
        description: 'The provider of the order'
    })
    readonly provider?: CreateProviderDto;

    @IsArray({
        message: 'The order items must be an array'
    })
    @IsNotEmpty()
    @ApiProperty({
        type: CreateMachineryDto,
        description: 'Machinery items of the order'
    })
    orderItems?: CreateMachineryDto[];

    @IsNotEmpty()
    @ApiProperty({
        type: CreateClientDto,
        description: 'The client of the order'
    })
    readonly client?: CreateClientDto;

    @IsDateString({
        message: 'The initial date of the order must be a date string'
    }) // Valida si sigue el formato ISO 8601, por ejemplo: YYYY-MM-DD.
    @IsNotEmpty()
    @ApiProperty({
        type: Date,
        description: 'The initial date of the order'
    })
    initialDate?: Date;

    @IsDateString({
        message: 'The final date of the order must be a date string'
    })	// Alias for @IsISO8601().
    @IsNotEmpty()
    @ApiProperty({
        type: Date,
        description: 'The final date of the order'
    })
    finalDate?: Date;
}
