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
      'machineryId': string;
      'name': string;
      'category': string;
      'totalQuantity': number;
      'providerId': string;
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
      'orderItems': Array<any>;
      '_id': string;
    };
    nested: {};
    flat: {};
  };
  'providers': {
    plain: {
      'providerId': string;
      'name': string;
      '_id': string;
    };
    nested: {};
    flat: {};
  };
};
