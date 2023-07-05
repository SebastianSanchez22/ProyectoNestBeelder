import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Machine } from './entities/machine.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { SuppliersService } from 'src/suppliers/suppliers.service';

@Injectable()
export class MachinesService {
  constructor(@InjectModel('Machine') private readonly MachinesModel: Model<Machine>,
              @Inject(SuppliersService) private readonly SuppliersService: SuppliersService ) {
  }

  async create(createMachineDto: CreateMachineDto) : Promise<Machine> {
    const { supplierId, ...machinesData } = createMachineDto;

    const supplier = await this.SuppliersService.findBySupplierId(supplierId);

    if(!supplier){
      throw new NotFoundException(`Supplier #${supplierId} not found`);
    } 

    const existingMachine = await this.MachinesModel.findOne({
      name: machinesData.name,
      supplierId: supplierId,
    });

    if (existingMachine) {
      throw new Error(
        `Machine with name '${machinesData.name}' already exists for Supplier #${supplierId}`,
      );
    }
    
    return await (new this.MachinesModel(createMachineDto)).save();
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Machine[]> {
    const skip = (page - 1) * limit;
  
    return await this.MachinesModel.find().skip(skip).limit(limit);
  }

  async findByMachineId(machineId: string) : Promise<Machine> {
    const existingMachine = await this.MachinesModel.findOne({machineId: machineId});
    if (!existingMachine) {
      throw new NotFoundException(`Machine #${machineId} not found`);
    }
    return existingMachine;
  }

  async findOne(machineId: string) : Promise<Machine> {
    const existingMachine = await this.MachinesModel.findById(machineId).exec();
   if (!existingMachine) {
    throw new NotFoundException(`Machine #${machineId} not found`);
   }
   return existingMachine;
  }

  async update(machineId: string, updateMachinesDto: UpdateMachineDto) : Promise<Machine> {
    const existingMachines = await this.MachinesModel.findByIdAndUpdate(
      machineId, updateMachinesDto, { new: true }
    );
   if (!existingMachines) {
     throw new NotFoundException(`Machine #${machineId} not found`);
   }
   return existingMachines;
  }

  async remove(machineId: string) : Promise<Machine> {
    const deletedMachines = await this.MachinesModel.findByIdAndDelete(machineId);
    if (!deletedMachines) {
      throw new NotFoundException(`Machine #${machineId} not found`);
    }
    return deletedMachines;
  }
}
