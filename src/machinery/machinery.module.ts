import { Module } from '@nestjs/common';
import { MachineryService } from './machinery.service';
import { MachineryController } from './machinery.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Machinery, MachinerySchema } from './entities/machinery.entity';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Machinery.schema_name,
        schema: MachinerySchema
      }
    ])],
  controllers: [MachineryController],
  providers: [MachineryService]
})
export class MachineryModule {}
