import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Machinery } from "src/machinery/entities/machinery.entity";

export class Order {

    public static schema_name: string = 'Order';

    @Prop({
        type: Array<Machinery>,
        required: true 
    })
    orderItems: Array<Machinery>;
  
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
