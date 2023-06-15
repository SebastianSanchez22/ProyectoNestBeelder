import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Client extends Document {

    public static schema_name: string = 'Client';

    @Prop({
        type: String,
        required: true,
        unique: true,
        index: true
    })
    clientId: string;
    
    @Prop({
        type: String,
        required: true,
    })
    name: string;

    @Prop({
        type: String,
        required: true,
    })
    address: string;

    @Prop({
        type: Number,
        required: true,
    })
    phone: number;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
