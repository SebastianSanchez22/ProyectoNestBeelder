import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(@InjectModel('Supplier') private readonly SupplierModel: Model<Supplier>) {}

  async create(createSupplierDto: CreateSupplierDto) : Promise<Supplier> {
    return await (new this.SupplierModel(createSupplierDto)).save();
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Supplier[]> {
    const skip = (page - 1) * limit;
  
    return await this.SupplierModel.find().skip(skip).limit(limit);
  }

  async findBySupplierId(supplierId: string) : Promise<Supplier> {
    const existingSupplier = await this.SupplierModel.findOne({supplierId: supplierId});
    if (!existingSupplier) {
      throw new NotFoundException(`Supplier #${supplierId} not found`);
    }
    return existingSupplier;
  }

  async findOne(supplierId: string) : Promise<Supplier> {
    const existingSupplier = await this.SupplierModel.findById(supplierId);
   if (!existingSupplier) {
    throw new NotFoundException(`Supplier #${supplierId} not found`);
   }
   return existingSupplier;
  }

  async update(supplierId: string, updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    const existingSupplier = await this.findBySupplierId(supplierId);
  
    existingSupplier.name = updateSupplierDto.name;
    existingSupplier.timezone = updateSupplierDto.timezone;
    existingSupplier.country = updateSupplierDto.country;

    await existingSupplier.save();
  
    return existingSupplier;
  }

  async remove(supplierId: string) : Promise<Supplier> {
    const deletedSupplier = await this.SupplierModel.findByIdAndDelete(supplierId);
    if (!deletedSupplier) {
      throw new NotFoundException(`Supplier #${supplierId} not found`);
    }
    return deletedSupplier;
  }
}
