import type { ClientsInterface } from './clients';
import type { MachineryInterface } from './machinery';
import type { OrdersInterface } from './orders';
import type { ProvidersInterface } from './providers';

import Mongoose from 'mongoose';

import { clientsSchema } from './clients';
import { machinerySchema } from './machinery';
import { ordersSchema } from './orders';
import { providersSchema } from './providers';

const connection = Mongoose.createConnection(process.env.DATABASE_URL);

export const clients = connection.model<ClientsInterface>('clients', clientsSchema, 'clients');
export const machinery = connection.model<MachineryInterface>('machinery', machinerySchema, 'machinery');
export const orders = connection.model<OrdersInterface>('orders', ordersSchema, 'orders');
export const providers = connection.model<ProvidersInterface>('providers', providersSchema, 'providers');

export default connection;
