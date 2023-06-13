import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Machinery {

    public static schema_name: string = 'Machinery';

    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    name: string;
  
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




