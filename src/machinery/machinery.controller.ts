import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MachineryService } from './machinery.service';
import { CreateMachineryDto } from './dto/create-machinery.dto';
import { UpdateMachineryDto } from './dto/update-machinery.dto';

@Controller('machinery')
export class MachineryController {
  constructor(private readonly machineryService: MachineryService) {}

  @Post()
  create(@Body() createMachineryDto: CreateMachineryDto) {
    return this.machineryService.create(createMachineryDto);
  }

  @Get()
  findAll() {
    return this.machineryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.machineryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMachineryDto: UpdateMachineryDto) {
    return this.machineryService.update(+id, updateMachineryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.machineryService.remove(+id);
  }
}
