import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Machine } from './entities/machine.entity';
import { SuppliersService } from 'src/suppliers/suppliers.service';

@Injectable()
export class MachinesService {
  constructor(@InjectModel('Machine') private readonly MachinesModel: Model<Machine>,
              @Inject(SuppliersService) private readonly SuppliersService: SuppliersService ) {
  }

  async create(createMachineDto: CreateMachineDto) : Promise<Machine> {
    const { supplierId, ...machinesData } = createMachineDto;
    const supplier = await this.SuppliersService.findOne(supplierId);

    const existingMachines = await this.MachinesModel.findOne({
      supplierId: { $ne: supplier._id }, // $ne prevents from finding an existing machines with the same supplierId
      ...machinesData,
    }).exec();
  
    if (existingMachines) {
      throw new Error(`Machine already assigned to another supplier`);
    }

    const isAlreadyAssigned = supplier.machinesList.some(
      machinesId => machinesId.toString() === existingMachines._id.toString()
    );
  
    if (isAlreadyAssigned) {
      throw new Error(`Machine already assigned to the current supplier`);
    }

    const newMachines = await this.MachinesModel.create({
      ...machinesData,
      supplierId : supplier._id,
    });

    supplier.machinesList.push(newMachines._id);
    //await supplier.save();
    
    
    return await newMachines.save();
  }

  async findAll() : Promise<Machine[]> {
    const findAllMachineries = await this.MachinesModel.find().exec();
    if(!findAllMachineries || findAllMachineries.length === 0){
      throw new NotFoundException('No machineries found')
    } 
    return findAllMachineries;
  }

  async findOne(MachinesId: string) : Promise<Machine> {
    const existingMachines = await this.MachinesModel.findById(MachinesId).exec();
   if (!existingMachines) {
    throw new NotFoundException(`Machine #${MachinesId} not found`);
   }
   return existingMachines;
  }

  async update(MachinesId: string, updateMachinesDto: UpdateMachineDto) : Promise<Machine> {
    const existingMachines = await this.MachinesModel.findByIdAndUpdate(
      MachinesId, updateMachinesDto, { new: true }
    );
   if (!existingMachines) {
     throw new NotFoundException(`Machine #${MachinesId} not found`);
   }
   return existingMachines;
  }

  async remove(MachinesId: string) : Promise<Machine> {
    const deletedMachines = await this.MachinesModel.findByIdAndDelete(MachinesId);
    if (!deletedMachines) {
      throw new NotFoundException(`Machine #${MachinesId} not found`);
    }
    return deletedMachines;
  }
}
