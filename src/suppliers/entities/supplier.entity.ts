import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Supplier extends Document {

    public static schema_name: string = 'Supplier';

    @Prop({
        type: String,
        required: true,
        unique: true,
        index: true
    })
    supplierId: string;

    @Prop({
        type: String,
        required: true,
    })
    name: string;

    @Prop({
        type: String,
        required: true,
    })
    timezone: string;

    @Prop({
        type: String,
        required: true,
    })
    country: string;

    // Almaceno solo los id de las maquinas
    @Prop({
        type: [String],
    })
    machinesList:String[];
  
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier).set('timestamps', true);
