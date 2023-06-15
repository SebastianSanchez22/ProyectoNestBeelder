import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from 'mongoose';
import { CreateProviderDto } from "src/providers/dto/create-provider.dto";

@Schema()
export class Machinery extends Document {

    public static schema_name: string = 'Machinery';

    @Prop({
        type: String,
        required: true,
        unique: true,
        index: true
    })
    machineryId: string;

    @Prop({
        type: String,
        required: true,
    })
    name: string;

    @Prop({
        type: Array<CreateProviderDto>, 
    })
    provider: Array<CreateProviderDto>;

    @Prop({
        type: String,
        required: true,
    })
    category: string;
  
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




