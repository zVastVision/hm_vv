import Papa from 'papaparse';
import { API, DataStore } from "aws-amplify"
import { Product as ProductModel, Item as ItemModel, LazyProduct, KitPart as KitPartModel, Product } from '~/src/models'
import { Inventory, InventoryItem, InventoryStoreState, KitPart, Paging } from "~/types"
import { defineStore } from 'pinia'
import * as mutations from '../src/graphql/mutations'

export const useInventoryStore = defineStore('inventory', {
    state: (): InventoryStoreState => ({
        inventoryList: [],
        inventorySearch: [],
        inventoryData: null,
        inventoryItems: []
    }),
    actions: {
        async createInventoryInstance(input: Inventory): Promise<void> {
            await this.createItem(input);
        },

        async createBulkInventoryInstance(input: Inventory[]): Promise<void> {
            const items: unknown[] = []
            console.log(input)
            input.forEach(item => {
                items.push(this.createItem(JSON.parse(JSON.stringify(item))))
            })
            try {
                const res = await Promise.allSettled(items)
                console.log(res)
            } catch (error) {
                console.log(error)
                throw error
            }
        },

        async createItem(input: Inventory) {
            debugger
            const groupList = await useGetUserGroups()

            const product: ProductModel = await DataStore.save(new ProductModel({
                name: input.name,
                isKit: false,
                description: input.description,
                threshold: input.threshold,
                trackThreshold: input.trackThreshold || false,
                extraDetails: input.extraDetails,
                warehouseID: input.warehouseID,
                group: groupList[0]
            }));

            const items = [];
            for (let i = 0; i < (input.quantity || 0); i++) {
                items.push(
                    DataStore.save(new ItemModel({
                        productID: product.id,
                        isTagged: false,
                        isActive: false,
                        group: groupList[0]
                    })
                    )
                );
            }

            const res = await Promise.allSettled(items);
            return res;
        },

        async getInventoryItems(warehouseId: string, pagination: Paging): Promise<void> {

            const inventoryItems = await DataStore.query(ProductModel, p => p.warehouseID.eq(warehouseId), {
                page: pagination.page,
                limit: pagination.size
            })

            this.inventoryList = await this.mapInventory(inventoryItems)
        },

        async searchInventoryItem(query: string, warehouseId: string, paging: Paging): Promise<void> {
            const inventoryItems = await DataStore.query(ProductModel, 
                p => p.and(
                    p => [p.name.contains(query), p.warehouseID.eq(warehouseId)]
            ), {
                page: paging.page,
                limit: paging.size
            })

            this.inventorySearch = await this.mapInventory(inventoryItems)
        },

        async mapInventory(inventoryItems: LazyProduct[]): Promise<Inventory[]> {
            const inventoryList = []
            for await (const product of inventoryItems) {
                const inventoryItem: Inventory = {
                    id: product.id,
                    name: product.name,
                    description: product.description as string,
                    threshold: product.threshold || 0,
                    warehouseID: product.warehouseID,
                    trackThreshold: product.trackThreshold,
                    extraDetails: product.extraDetails as Record<string, string>[],
                    isKit: product.isKit,
                    quantity: (await product.items.toArray()).length || 0
                }
                inventoryList.push(inventoryItem)
            }
            return inventoryList
        },

        async createKit(input: Inventory, parts: KitPart[]) {
            const groupList = await useGetUserGroups()

            const product: ProductModel = await DataStore.save(new ProductModel({
                name: input.name,
                isKit: true,
                description: input.description,
                threshold: input.threshold,
                trackThreshold: input.trackThreshold || false,
                warehouseID: input.warehouseID,
                extraDetails: input.extraDetails,
                group: groupList[0]
            }))

            const kitParts = parts.map(part => {
                return DataStore.save(new KitPartModel({
                    kitID: product.id,
                    partID: part.partId,
                    quantity: part.quantity,
                    group: groupList[0]
                }))
            })

            const items = []
            for (let i = 0; i < (input.quantity || 0); i++) {
                items.push(
                    DataStore.save(new ItemModel({
                        productID: product.id,
                        isTagged: false,
                        isActive: false,
                        group: groupList[0]
                    })
                    )
                )
            }
            await Promise.allSettled([...kitParts, ...items])
        },

        async loadCsvFile(file: File) {
            Papa.parse<Inventory>(file, {
                header: true,
                complete: (results) => {
                    results.data.forEach(i => {
                        this.inventoryList.push(i)
                    })
                }
            })
        },

        async editInventoryItem(item: Inventory) {
            const original = await DataStore.query(ProductModel, item.id as string)
            if (original) {
                await DataStore.save(
                    ProductModel.copyOf(original, updated => {
                        updated.name = item.name
                        updated.description = item.description
                        updated.threshold = item.threshold
                        updated.extraDetails = item.extraDetails
                        updated.trackThreshold = item.trackThreshold as boolean
                    })
                );
            }

        },

        async deleteItems(ids: string[]) {
            const items = ids.map(id => DataStore.delete(ProductModel, product => product.id.eq(id)))
            await Promise.allSettled(items)
        },

        async getInventoryItemById(id: string) {
            const product = (await DataStore.query(Product, id))
            if (product) {
                this.inventoryItems = await product.items.toArray() as InventoryItem[]
                const inventory: Inventory = {
                    id: product.id,
                    name: product.name,
                    description: product.description || "",
                    warehouseID: product?.warehouseID,
                    trackThreshold: product.trackThreshold,
                    extraDetails: product.extraDetails as Record<string, string>[],
                    threshold: product.threshold || null,
                    isKit: product.isKit || false,
                    quantity: this.inventoryItems.length
                }
                const res = await product.kitParts.toArray();
                const partRequests = res.map(i => DataStore.query(ProductModel, i.partID))
                const kitParts = await Promise.allSettled(partRequests)
                // this.inventoryList = kitParts.
                this.inventoryList = kitParts.map((i, index) => ({ ...i.value, quantity: res[index].quantity }))
                this.inventoryData = inventory
            }
        }
    }
})

