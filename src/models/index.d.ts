import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier, CustomIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";



type EagerExtraDetail = {
  readonly name?: string | null;
  readonly value?: string | null;
}

type LazyExtraDetail = {
  readonly name?: string | null;
  readonly value?: string | null;
}

export declare type ExtraDetail = LazyLoading extends LazyLoadingDisabled ? EagerExtraDetail : LazyExtraDetail

export declare const ExtraDetail: (new (init: ModelInit<ExtraDetail>) => ExtraDetail)

type EagerWarehouse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Warehouse, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly group: string;
  readonly organizationID: string;
  readonly Organization?: Organization | null;
  readonly name?: string | null;
  readonly location?: string | null;
  readonly Products?: (Product | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWarehouse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Warehouse, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly group: string;
  readonly organizationID: string;
  readonly Organization: AsyncItem<Organization | undefined>;
  readonly name?: string | null;
  readonly location?: string | null;
  readonly Products: AsyncCollection<Product>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Warehouse = LazyLoading extends LazyLoadingDisabled ? EagerWarehouse : LazyWarehouse

export declare const Warehouse: (new (init: ModelInit<Warehouse>) => Warehouse) & {
  copyOf(source: Warehouse, mutator: (draft: MutableModel<Warehouse>) => MutableModel<Warehouse> | void): Warehouse;
}

type EagerOrganization = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<Organization, 'groupID'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly group: string;
  readonly Warehouses?: (Warehouse | null)[] | null;
  readonly name?: string | null;
  readonly groupID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrganization = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<Organization, 'groupID'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly group: string;
  readonly Warehouses: AsyncCollection<Warehouse>;
  readonly name?: string | null;
  readonly groupID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Organization = LazyLoading extends LazyLoadingDisabled ? EagerOrganization : LazyOrganization

export declare const Organization: (new (init: ModelInit<Organization>) => Organization) & {
  copyOf(source: Organization, mutator: (draft: MutableModel<Organization>) => MutableModel<Organization> | void): Organization;
}

type EagerKitPart = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<KitPart, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly group: string;
  readonly quantity?: number | null;
  readonly kitID: string;
  readonly Kit?: Product | null;
  readonly part?: Product | null;
  readonly partID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyKitPart = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<KitPart, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly group: string;
  readonly quantity?: number | null;
  readonly kitID: string;
  readonly Kit: AsyncItem<Product | undefined>;
  readonly part: AsyncItem<Product | undefined>;
  readonly partID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type KitPart = LazyLoading extends LazyLoadingDisabled ? EagerKitPart : LazyKitPart

export declare const KitPart: (new (init: ModelInit<KitPart>) => KitPart) & {
  copyOf(source: KitPart, mutator: (draft: MutableModel<KitPart>) => MutableModel<KitPart> | void): KitPart;
}

type EagerItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Item, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly group: string;
  readonly productID: string;
  readonly isTagged?: boolean | null;
  readonly isActive?: boolean | null;
  readonly location?: string | null;
  readonly product?: Product | null;
  readonly lastActive?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Item, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly group: string;
  readonly productID: string;
  readonly isTagged?: boolean | null;
  readonly isActive?: boolean | null;
  readonly location?: string | null;
  readonly product: AsyncItem<Product | undefined>;
  readonly lastActive?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Item = LazyLoading extends LazyLoadingDisabled ? EagerItem : LazyItem

export declare const Item: (new (init: ModelInit<Item>) => Item) & {
  copyOf(source: Item, mutator: (draft: MutableModel<Item>) => MutableModel<Item> | void): Item;
}

type EagerProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly group: string;
  readonly name: string;
  readonly isKit: boolean;
  readonly items?: (Item | null)[] | null;
  readonly kitParts?: (KitPart | null)[] | null;
  readonly description?: string | null;
  readonly trackThreshold: boolean;
  readonly threshold?: number | null;
  readonly Warehouse?: Warehouse | null;
  readonly extraDetails?: (ExtraDetail | null)[] | null;
  readonly warehouseID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly group: string;
  readonly name: string;
  readonly isKit: boolean;
  readonly items: AsyncCollection<Item>;
  readonly kitParts: AsyncCollection<KitPart>;
  readonly description?: string | null;
  readonly trackThreshold: boolean;
  readonly threshold?: number | null;
  readonly Warehouse: AsyncItem<Warehouse | undefined>;
  readonly extraDetails?: (ExtraDetail | null)[] | null;
  readonly warehouseID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}