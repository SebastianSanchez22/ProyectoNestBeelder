import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export class Client {

    public static schema_name: string = 'Client';

    /*
    @Prop({
        type: Number,
        required: true,
        unique: true,
        index: true
    })
    clientId: number;*/

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

    @Prop({
        type: String,
        required: true,
    })
    email: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
