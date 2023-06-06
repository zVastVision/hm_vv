// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Warehouse, Organization, KitPart, Item, Product, ExtraDetail } = initSchema(schema);

export {
  Warehouse,
  Organization,
  KitPart,
  Item,
  Product,
  ExtraDetail
};