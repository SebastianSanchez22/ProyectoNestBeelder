import { Injectable, NotFoundException} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderItem } from './entities/order.entity';
import * as moment from 'moment';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private readonly OrderModel: Model<Order>) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = new this.OrderModel();
  
    // Asignar las propiedades directamente del DTO
    order.orderDate = moment(createOrderDto.orderDate).utc().toDate();
    order.seller = createOrderDto.seller;
    order.clientId = createOrderDto.clientId;
    order.NIT = createOrderDto.NIT;
    order.buyer = createOrderDto.buyer;
    order.buyerPhone = createOrderDto.buyerPhone;
    order.paymentCoordinator = createOrderDto.paymentCoordinator;
    order.paymentCoordinatorPhone = createOrderDto.paymentCoordinatorPhone;
  
    // Convertir las fechas de cada OrderItem a UTC utilizando Moment.js
    const orderItems = createOrderDto.orderItems.map((item) => {
      const utcInitialDate = moment(item.rentInitialDate).utc().toDate();
      const utcFinalDate = moment(item.rentFinalDate).utc().toDate();
  
      const orderItem = new OrderItem();
      orderItem.machineryId = item.machineryId;
      orderItem.quantity = item.quantity;
      orderItem.rentInitialDate = utcInitialDate;
      orderItem.rentFinalDate = utcFinalDate;
      orderItem.unitPrice = item.unitPrice;
      orderItem.unitPriceTimeUnit = item.unitPriceTimeUnit;
      orderItem.unitCost = item.unitCost;
      orderItem.pricePerHour = item.pricePerHour;
      orderItem.totalPrice = item.totalPrice;
  
      return orderItem;
    });
  
    // Asignar los OrderItems al pedido
    order.OrderItems = orderItems;
  
    return await order.save();
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
