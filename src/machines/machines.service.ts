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

  async create(createMachineDto: CreateMachineDto) : Promise<{newMachine: Machine, updatedSupplier: Supplier}> {
    const { supplierId, ...machinesData } = createMachineDto;

    const supplier = await this.SuppliersService.findBySupplierId(supplierId);

    if(!supplier){
      throw new NotFoundException(`Supplier #${supplierId} not found`);
    } 

    // Listado del nombre de las máquinas por proveedor en donde el machine.name sea igual 
    // a machinesData.name con un agreggation function
    // if len == 0, OK
    // if len > 0, ya existe esa maquina para ese proveedor, sacar error
    const existingMachine = await this.MachinesModel.findOne({
      name: machinesData.name
    });

    if (existingMachine) {
      throw new Error(`Machine with name ${machinesData.name} is already assigned to another supplier`);
    }

    const newMachine = await (new this.MachinesModel(createMachineDto)).save();
    const updatedSupplier = await this.SuppliersService.addMachine(supplierId, machinesData.machineId);
    
    return {newMachine ,updatedSupplier};
  }

  async findAll() : Promise<Machine[]> {
    return await this.MachinesModel.find();
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
