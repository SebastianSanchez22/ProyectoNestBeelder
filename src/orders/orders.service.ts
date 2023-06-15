import { Injectable, NotFoundException} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private readonly OrderModel: Model<Order>) {}

  async create(createOrderDto: CreateOrderDto) : Promise<Order> {
    const newOrder = new this.OrderModel(createOrderDto);
    return await newOrder.save();
  }

  async findAll() : Promise<Order[]> {
    const findAllOrders = await this.OrderModel.find().exec(); 
    return findAllOrders;
  }

  async findOne(OrderId: string) : Promise<Order> {
    const existingOrder = await this.OrderModel.findById(OrderId).exec();
   if (!existingOrder) {
    throw new NotFoundException(`Order #${OrderId} not found`);
   }
   return existingOrder;
  }

  async update(OrderId: string, updateOrderDto: UpdateOrderDto) : Promise<Order> {
    const existingOrder = await this.OrderModel.findByIdAndUpdate(
      OrderId, updateOrderDto, { new: true }
    );
   if (!existingOrder) {
     throw new NotFoundException(`Order #${OrderId} not found`);
   }
   return existingOrder;
  }

  async remove(OrderId: string) : Promise<Order> {
    const deletedOrder = await this.OrderModel.findByIdAndDelete(OrderId);
    if (!deletedOrder) {
      throw new NotFoundException(`Order #${OrderId} not found`);
    }
    return deletedOrder;
  }
}
