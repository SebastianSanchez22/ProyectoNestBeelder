import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from 'mongoose';

@Schema()
export class Machine extends Document {
    public static schema_name: string = 'Machine';

    @Prop({
        type: String,
        required: true,
        unique: true,
        index: true
    })
    machineId: string;

    @Prop({
        type: String,
        required: true,
    })
    name: string;

    @Prop({
        type: String,
        required: true,
    })
    category: string;
  
    @Prop({
        type: Number,
        required: true
    })
    totalQuantity: number;

    @Prop({
        type: String, 
    })
    supplierId: string;
}

export const MachineSchema = SchemaFactory.createForClass(Machine).index(
    {name: 1, supplierId: 1}, {unique: true} 
).set('timestamps', true);




