import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {

  constructor(@InjectModel('Client') private readonly clientModel: Model<Client>) {}

  async create(createClientDto: CreateClientDto) : Promise<Client> {
    return await (new this.clientModel(createClientDto)).save();
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Client[]> {
    const skip = (page - 1) * limit;
  
    return await this.clientModel.find().skip(skip).limit(limit);
  }

  async findByClientId(clientId: string) : Promise<Client> {
    const existingClient = await this.clientModel.findOne({clientId: clientId});
    if (!existingClient) {
      throw new NotFoundException(`Client #${clientId} not found`);
    }
    return existingClient;
  }

  async findOne(clientId: string) : Promise<Client> {
    const existingClient = await this.clientModel.findById(clientId);
   if (!existingClient) {
    throw new NotFoundException(`Client #${clientId} not found`);
   }
   return existingClient;
  }

  async update(clientId: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const existingClient = await this.findByClientId(clientId);
  
    existingClient.name = updateClientDto.name;
    existingClient.address = updateClientDto.address;
    existingClient.phone = updateClientDto.phone;

    await existingClient.save();
  
    return existingClient;
  }

  async remove(clientId: string) : Promise<Client> {
    const deletedClient = await this.clientModel.findByIdAndDelete(clientId);
    if (!deletedClient) {
      throw new NotFoundException(`Client #${clientId} not found`);
    }
    return deletedClient;
  }
}
