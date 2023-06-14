import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';

@Schema()
export class Machinery {

    public static schema_name: string = 'Machinery';

    @Prop({
        type: Number,
        required: true,
        unique: true,
        index: true
    })
    machineryId: number;

    @Prop({
        type: String,
        required: true,
    })
    name: string;

    @Prop({
        type: [{ type: Types.ObjectId, ref: 'Provider' }] 
    })
    providerList: Types.ObjectId[];
  
    @Prop({
        type: Number,
        required: true
    })
    cost: number;
  
    @Prop({
        type: Number,
        required: true
    })
    sellingPrice: number;
  
    @Prop({
        type: Number,
        required: true
    })
    beelderPrice: number;
}

export const MachinerySchema = SchemaFactory.createForClass(Machinery);




