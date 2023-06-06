import { Inventory, InventoryItem } from "./inventory"

export interface InventoryStoreState {
    inventoryList: Inventory[],
    inventorySearch: Inventory[],
    inventoryData: Inventory | null,
    inventoryItems: InventoryItem[]
}