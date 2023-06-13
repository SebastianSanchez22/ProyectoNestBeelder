import { Injectable } from '@nestjs/common';
import { CreateMachineryDto } from './dto/create-machinery.dto';
import { UpdateMachineryDto } from './dto/update-machinery.dto';

@Injectable()
export class MachineryService {
  create(createMachineryDto: CreateMachineryDto) {
    return 'This action adds a new machinery';
  }

  findAll() {
    return `This action returns all machinery`;
  }

  findOne(id: number) {
    return `This action returns a #${id} machinery`;
  }

  update(id: number, updateMachineryDto: UpdateMachineryDto) {
    return `This action updates a #${id} machinery`;
  }

  remove(id: number) {
    return `This action removes a #${id} machinery`;
  }
}
