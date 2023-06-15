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
    const newClient = new this.clientModel(createClientDto);
    return await newClient.save();
  }

  async findAll() : Promise<Client[]> {
    const findAllClients = await this.clientModel.find().exec();
    return findAllClients;
  }

  async findOne(clientId: string) : Promise<Client> {
    const existingClient = await this.clientModel.findById(clientId).exec();
   if (!existingClient) {
    throw new NotFoundException(`Client #${clientId} not found`);
   }
   return existingClient;
  }

  async update(clientId: string, updateClientDto: UpdateClientDto) : Promise<Client> {
    const existingClient = await this.clientModel.findByIdAndUpdate(
      clientId, updateClientDto, { new: true }
    );
   if (!existingClient) {
     throw new NotFoundException(`Client #${clientId} not found`);
   }
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
