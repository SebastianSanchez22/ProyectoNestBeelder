import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Supplier, SupplierSchema } from './entities/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(@InjectModel('Supplier') private readonly SupplierModel: Model<Supplier>) {}

  async create(createSupplierDto: CreateSupplierDto) : Promise<Supplier> {
    const newSupplier = new this.SupplierModel(createSupplierDto);
    return await newSupplier.save();
  }

  async findAll() : Promise<Supplier[]> {
    const findAllSuppliers = await this.SupplierModel.find().exec();
    return findAllSuppliers;
  }

  async findOne(SupplierId: string) : Promise<Supplier> {
    const existingSupplier = await this.SupplierModel.findById(SupplierId).exec();
   if (!existingSupplier) {
    throw new NotFoundException(`Supplier #${SupplierId} not found`);
   }
   return existingSupplier;
  }

  async update(SupplierId: string, updateSupplierDto: UpdateSupplierDto) : Promise<Supplier> {
    const existingSupplier = await this.SupplierModel.findByIdAndUpdate(
      SupplierId, updateSupplierDto, { new: true }
    );
   if (!existingSupplier) {
     throw new NotFoundException(`Supplier #${SupplierId} not found`);
   }
   return existingSupplier;
  }

  async remove(SupplierId: string) : Promise<Supplier> {
    const deletedSupplier = await this.SupplierModel.findByIdAndDelete(SupplierId);
    if (!deletedSupplier) {
      throw new NotFoundException(`Supplier #${SupplierId} not found`);
    }
    return deletedSupplier;
  }
}
