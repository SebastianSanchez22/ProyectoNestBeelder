import { OrderItemInterface } from "./models/orders";

/* eslint-disable */
export type Schema = {
  'clients': { 
    plain: {
      'clientId': string;
      'name': string;
      'address': string;
      'phone': number;
      '_id': string;
    };
    nested: {};
    flat: {};
  };
  'machinery': {
    plain: {
      '_id': string;
    };
    nested: {};
    flat: {};
  };
  'orders': {
    plain: {
      'orderId': string;
      'orderDate': string;
      'seller': string;
      'clientId': string;
      'NIT': string;
      'buyer': string;
      'buyerPhone': string;
      'paymentCoordinator': string;
      'paymentCoordinatorPhone': number;
      'orderItems': Array<OrderItemInterface>;
      '_id': string;
    };
    nested: {};
    flat: {};
  };
  'providers': {
    plain: {
      '_id': string;
    };
    nested: {};
    flat: {};
  };
};
