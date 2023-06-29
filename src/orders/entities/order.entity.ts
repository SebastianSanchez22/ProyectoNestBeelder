import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { OrderItem } from "./orderItem.entity";

@Schema()
export class Order {

    public static schema_name: string = 'Order';

    @Prop({
        type: String,
        required: true,
        unique: true,
        index: true
    })
    orderId: string;

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
        type: String,
    })
    clientId: string;

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
        type: Array<OrderItem>(), 
        required: true
    })
    orderItems: Array<OrderItem>;
  
}

export const OrderSchema = SchemaFactory.createForClass(Order).set('timestamps', true);
