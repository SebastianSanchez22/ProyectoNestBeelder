import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Supplier, SupplierSchema } from './entities/supplier.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Supplier.schema_name,
        schema: SupplierSchema
      }
    ])],
  controllers: [SuppliersController],
  providers: [SuppliersService],
  exports: [SuppliersService], // export SuppliersService to be used in other modules
})
export class SuppliersModule {}
