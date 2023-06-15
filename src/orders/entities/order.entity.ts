import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CreateClientDto } from "src/clients/dto/create-client.dto";
import { CreateMachineryDto } from "src/machinery/dto/create-machinery.dto";

@Schema()
export class OrderItem {
    @Prop({ 
        type: CreateMachineryDto,
        required: true
    })
    machinery: CreateMachineryDto;

    @Prop({
        type: Number,
        required: true
    })
    quantity: number;

    @Prop({ type: Date, required: true })
    rentInitialDate: Date;

    @Prop({ type: Date, required: true })
    rentFinalDate: Date;

    @Prop({ type: String, required: true })
    priceTimeUnit: string;

    @Prop({ type: Number, required: true})
    pricePerHour: number;

    @Prop({ type: Number, required: true })
    totalPrice: number;
}

@Schema()
export class Order {

    public static schema_name: string = 'Order';

    @Prop({
        type: String,
        required: true,
        unique: true,
        index: true
    })
    OrderId: string;

    @Prop({
        type: Date,
        required: true,
    })
    orderDate: Date;

    @Prop({ 
        type: Array<OrderItem>, 
        required: true
    })
    OrderItems: Array<OrderItem>;

    @Prop({
        type: CreateClientDto,
    })
    client: CreateClientDto;

    @Prop({
        type: String,
        required: true,
    })
    seller: string;
  
}

export const OrderSchema = SchemaFactory.createForClass(Order);
