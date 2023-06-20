import { Module } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { MachinesController } from './machines.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Machine, MachineSchema } from './entities/machine.entity';
import { SuppliersModule } from 'src/suppliers/suppliers.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Machine.schema_name,
        schema: MachineSchema
      }
    ]),
    SuppliersModule
  ],
  controllers: [MachinesController],
  providers: [MachinesService]
})
export class MachinesModule {}
