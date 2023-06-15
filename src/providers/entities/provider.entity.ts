import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export class Provider extends Document {

    public static schema_name: string = 'Provider';

    @Prop({
        type: String,
        required: true,
        unique: true,
        index: true
    })
    providerId: string;

    @Prop({
        type: String,
        required: true,
    })
    name: string;

    @Prop({
        type: [{ type: Types.ObjectId, ref: 'Machinery' }],
        default: []
    })
    machineryList: Types.ObjectId[];
  
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
