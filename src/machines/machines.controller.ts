import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';

@Controller('machine')
export class MachinesController {
  constructor(private readonly machineService: MachinesService) {}

  @Post()
  async create(@Body() createMachineDto: CreateMachineDto) {
    return this.machineService.create(createMachineDto);
  }

  @Get()
  async findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.machineService.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.machineService.findByMachineId(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMachineDto: UpdateMachineDto) {
    return this.machineService.update(id, updateMachineDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.machineService.remove(id);
  }
}
