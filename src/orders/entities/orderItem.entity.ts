import { Prop, Schema } from "@nestjs/mongoose";
import { UnitPriceTimeUnits } from "../common/unit-price-time-units";

@Schema()
export class OrderItem {
    @Prop({ 
        type: String,
        required: true
    })
    machineryId: String;

    @Prop({
        type: Number,
        required: true
    })
    quantity: number;

    @Prop({ type: Date, required: true })
    rentInitialDate: Date;

    @Prop({ type: Date, required: true })
    rentFinalDate: Date;

    @Prop({ type: Number, required: true })
    unitPrice: number;

    @Prop({
        type: String, 
        enum: Object.values(UnitPriceTimeUnits), 
        required: true })
    unitPriceTimeUnit: string; // enum (hour, day, week, month)

    @Prop({ type: Number, required: true })
    unitCost: number;

    @Prop({ type: Number, required: true})
    pricePerHour: number;

    @Prop({ type: Number, required: true })
    totalPrice: number;
}