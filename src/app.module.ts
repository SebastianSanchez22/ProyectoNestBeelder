import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule} from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { ProvidersModule } from './providers/providers.module';
import { MachineryModule } from './machinery/machinery.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OrdersModule, ProvidersModule, MachineryModule, ClientsModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

