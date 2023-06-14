import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class Provider {

    public static schema_name: string = 'Provider';
    /*
    @Prop({
        type: Number,
        required: true,
        unique: true,
        index: true
    })
    providerId: number;
*/
    @Prop({
        type: String,
        required: true,
    })
    name: string;

    @Prop({
        type: [{ type: Types.ObjectId, ref: 'Machinery' }] 
    })
    machineryList: Types.ObjectId[];
  
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
