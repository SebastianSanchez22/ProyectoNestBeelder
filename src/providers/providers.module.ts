import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Provider, ProviderSchema } from './entities/provider.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Provider.schema_name,
        schema: ProviderSchema
      }
    ])],
  controllers: [ProvidersController],
  providers: [ProvidersService],
  exports: [ProvidersService], // export ProvidersService to be used in other modules
})
export class ProvidersModule {}
