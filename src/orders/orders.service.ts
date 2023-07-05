import { Injectable, NotFoundException} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';
import * as moment from 'moment';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private readonly OrderModel: Model<Order>) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order: Order = {
      orderDate: moment(createOrderDto.orderDate).utc().toDate(), 
      orderItems: createOrderDto.orderItems.map((item) => {
        return { 
          rentInitialDate: moment(item.rentInitialDate).utc().toDate(),
          rentFinalDate: moment(item.rentFinalDate).utc().toDate(),
          ...item
         }
      }),
      ...createOrderDto
    }

    return await (new this.OrderModel(order)).save();
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Order[]> {
    const skip = (page - 1) * limit;
  
    return await this.OrderModel.find().skip(skip).limit(limit);
  }

  async findByOrderId(orderId: string) : Promise<Order> {
    const existingOrder = await this.OrderModel.findOne({orderId: orderId});
    if (!existingOrder) {
      throw new NotFoundException(`Order #${orderId} not found`);
    }
    return existingOrder;
  }

  async findOne(orderId: string) : Promise<Order> {
    const existingOrder = await this.OrderModel.findById(orderId).exec();
   if (!existingOrder) {
    throw new NotFoundException(`Order #${orderId} not found`);
   }
   return existingOrder;
  }

  async update(orderId: string, updateOrderDto: UpdateOrderDto) : Promise<Order> {
    const existingOrder = await this.OrderModel.findByIdAndUpdate(
      orderId, updateOrderDto, { new: true }
    );
   if (!existingOrder) {
     throw new NotFoundException(`Order #${orderId} not found`);
   }
   return existingOrder;
  }

  async remove(orderId: string) : Promise<Order> {
    const deletedOrder = await this.OrderModel.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      throw new NotFoundException(`Order #${orderId} not found`);
    }
    return deletedOrder;
  }
}
