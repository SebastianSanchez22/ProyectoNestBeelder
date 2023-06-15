import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProvidersService {
  constructor(@InjectModel('Provider') private readonly ProviderModel: Model<Provider>) {}

  async create(createProviderDto: CreateProviderDto) : Promise<Provider> {
    const newProvider = new this.ProviderModel(createProviderDto);
    return await newProvider.save();
  }

  async findAll() : Promise<Provider[]> {
    const findAllProviders = await this.ProviderModel.find().exec();
    return findAllProviders;
  }

  async findOne(ProviderId: string) : Promise<Provider> {
    const existingProvider = await this.ProviderModel.findById(ProviderId).exec();
   if (!existingProvider) {
    throw new NotFoundException(`Provider #${ProviderId} not found`);
   }
   return existingProvider;
  }

  async update(ProviderId: string, updateProviderDto: UpdateProviderDto) : Promise<Provider> {
    const existingProvider = await this.ProviderModel.findByIdAndUpdate(
      ProviderId, updateProviderDto, { new: true }
    );
   if (!existingProvider) {
     throw new NotFoundException(`Provider #${ProviderId} not found`);
   }
   return existingProvider;
  }

  async remove(ProviderId: string) : Promise<Provider> {
    const deletedProvider = await this.ProviderModel.findByIdAndDelete(ProviderId);
    if (!deletedProvider) {
      throw new NotFoundException(`Provider #${ProviderId} not found`);
    }
    return deletedProvider;
  }
}
