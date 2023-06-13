import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsDate, IsNotEmpty, IsArray} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Machinery } from 'src/machinery/entities/machinery.entity';


export class UpdateOrderDto extends PartialType(CreateOrderDto) {

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({
        type: Array<Machinery>,
        description: 'Machinery items of the order'
    })
    readonly orderItems?: Array<Machinery>;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({
        type: Date,
        description: 'The initial date of the order'
    })
    readonly initialDate?: Date;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({
        type: Date,
        description: 'The final date of the order'
    })
    readonly finalDate?: Date;
}
