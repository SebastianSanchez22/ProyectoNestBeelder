import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';

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
        type: [{ type: Types.ObjectId, ref: 'Machinery' }] 
    })
    machineryList: Types.ObjectId[];

    @Prop({
        type: [{ type: Types.ObjectId, ref: 'Client' }]
    })
    client: Types.ObjectId;
  
    @Prop({
        type: Date,
        required: true,
        default: Date.now
    })
    initialDate: Date;
  
    @Prop({
        type: Date,
        required: true
    })
    finalDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
