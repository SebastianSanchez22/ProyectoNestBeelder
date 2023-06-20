import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from 'mongoose';
import { CreateSupplierDto } from "src/suppliers/dto/create-supplier.dto";

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
        type: Array<CreateSupplierDto>, 
    })
    provider: Array<CreateSupplierDto>;

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
}

export const MachinerySchema = SchemaFactory.createForClass(Machinery);




