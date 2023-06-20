import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMachineryDto } from './dto/create-machinery.dto';
import { UpdateMachineryDto } from './dto/update-machinery.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Machinery } from './entities/machinery.entity';
import { SuppliersService } from 'src/suppliers/suppliers.service';

@Injectable()
export class MachineryService {
  constructor(@InjectModel('Machinery') private readonly MachineryModel: Model<Machinery>,
              @Inject(SuppliersService) private readonly SuppliersService: SuppliersService ) {
  }

  async create(createMachineryDto: CreateMachineryDto) : Promise<Machinery> {
    const { providerId, ...machineryData } = createMachineryDto;
    const provider = await this.SuppliersService.findOne(providerId);

    const existingMachinery = await this.MachineryModel.findOne({
      providerId: { $ne: provider._id }, // $ne prevents from finding an existing machinery with the same providerId
      ...machineryData,
    }).exec();
  
    if (existingMachinery) {
      throw new Error(`Machinery already assigned to another provider`);
    }

    const isAlreadyAssigned = provider.machineryList.some(
      machineryId => machineryId.toString() === existingMachinery._id.toString()
    );
  
    if (isAlreadyAssigned) {
      throw new Error(`Machinery already assigned to the current provider`);
    }

    const newMachinery = await this.MachineryModel.create({
      ...machineryData,
      providerId : provider._id,
    });

    provider.machineryList.push(newMachinery._id);
    //await provider.save();
    
    
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
