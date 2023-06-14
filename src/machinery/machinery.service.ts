import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMachineryDto } from './dto/create-machinery.dto';
import { UpdateMachineryDto } from './dto/update-machinery.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Machinery } from './entities/machinery.entity';

@Injectable()
export class MachineryService {
  constructor(@InjectModel('Machinery') private readonly MachineryModel: Model<Machinery>) {}

  async create(createMachineryDto: CreateMachineryDto) : Promise<Machinery> {
    const newMachinery = new this.MachineryModel(createMachineryDto);
    return await newMachinery.save();
  }

  async findAll() : Promise<Machinery[]> {
    const findAllMachineries = await this.MachineryModel.find().exec();
    if(!findAllMachineries || findAllMachineries.length === 0){
      throw new NotFoundException('No machineries found')
    } 
    return findAllMachineries;
  }

  async findOne(MachineryId: string) : Promise<Machinery> {
    const existingMachinery = await this.MachineryModel.findById(MachineryId).exec();
   if (!existingMachinery) {
    throw new NotFoundException(`Machinery #${MachineryId} not found`);
   }
   return existingMachinery;
  }

  async update(MachineryId: string, updateMachineryDto: UpdateMachineryDto) : Promise<Machinery> {
    const existingMachinery = await this.MachineryModel.findByIdAndUpdate(
      MachineryId, updateMachineryDto, { new: true }
    );
   if (!existingMachinery) {
     throw new NotFoundException(`Machinery #${MachineryId} not found`);
   }
   return existingMachinery;
  }

  async remove(MachineryId: string) : Promise<Machinery> {
    const deletedMachinery = await this.MachineryModel.findByIdAndDelete(MachineryId);
    if (!deletedMachinery) {
      throw new NotFoundException(`Machinery #${MachineryId} not found`);
    }
    return deletedMachinery;
  }
}
