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

  async findAll() : Promise<Supplier[]> {
    return await this.SupplierModel.find();
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

  async update(supplierId: string, updateSupplierDto: UpdateSupplierDto) : Promise<Supplier> {
    const existingSupplier = await this.SupplierModel.findByIdAndUpdate(
      supplierId, updateSupplierDto, { new: true }
    );
   if (!existingSupplier) {
     throw new NotFoundException(`Supplier #${supplierId} not found`);
   }
   return existingSupplier;
  }

  async addMachine(supplierId: string, newMachineId: String): Promise<Supplier> {
  const existingSupplier = await this.SupplierModel.findOne({
    supplierId: supplierId,
  });
  if (!existingSupplier) {
    throw new NotFoundException(`Supplier #${supplierId} not found`);
  }

  existingSupplier.machinesList = existingSupplier.machinesList.concat(newMachineId); // Concatenar la nueva máquina a la lista existente

  const updatedSupplier = await existingSupplier.save();
  return updatedSupplier;
}

  async remove(supplierId: string) : Promise<Supplier> {
    const deletedSupplier = await this.SupplierModel.findByIdAndDelete(supplierId);
    if (!deletedSupplier) {
      throw new NotFoundException(`Supplier #${supplierId} not found`);
    }
    return deletedSupplier;
  }
}
