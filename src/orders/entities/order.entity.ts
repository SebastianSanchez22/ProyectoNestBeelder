import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CreateClientDto } from "src/clients/dto/create-client.dto";

@Schema()
export class OrderItem {
    @Prop({ 
        type: String,
        required: true
    })
    machineryId: String;

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
        type: String,
        required: true,
    })
    seller: string;

    @Prop({
        type: CreateClientDto,
    })
    client: CreateClientDto;

    @Prop({
        type: String,
        required: true,
    })
    NIT: string;

    @Prop({
        type: String,
        required: true,
    })
    buyer: string;

    @Prop({
        type: Number,
        required: true,
    })
    buyerPhone: number;

    @Prop({
        type: String,
        required: true,
    })
    paymentCoordinator: string;

    @Prop({
        type: Number,
        required: true,
    })
    paymentCoordinatorPhone: number;

    @Prop({ 
        type: Array<OrderItem>, 
        required: true
    })
    OrderItems: Array<OrderItem>;
  
}

export const OrderSchema = SchemaFactory.createForClass(Order);
