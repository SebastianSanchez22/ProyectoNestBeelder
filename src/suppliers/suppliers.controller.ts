import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly SuppliersService: SuppliersService) {}

  @Post()
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.SuppliersService.create(createSupplierDto);
  }

  @Get()
  async findAll() {
    return this.SuppliersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.SuppliersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.SuppliersService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.SuppliersService.remove(id);
  }
}
