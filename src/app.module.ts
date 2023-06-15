import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule} from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { ProvidersModule } from './providers/providers.module';
import { MachineryModule } from './machinery/machinery.module';
import { ClientsModule } from './clients/clients.module';
/* import { DefaultAdminModule } from 'nestjs-admin'
import { AdminModule } from 'nestjs-admin';
import { Provider, ProviderSchema } from './providers/entities/provider.entity';
import { Order, OrderSchema } from './orders/entities/order.entity';
import { Client, ClientSchema } from './clients/entities/client.entity';
import { Machinery, MachinerySchema } from './machinery/entities/machinery.entity';
*/

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
