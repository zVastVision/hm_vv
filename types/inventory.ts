export interface Inventory {
    id?: string
    name: string
    description: string
    quantity: number
    trackThreshold: boolean | null
    threshold: number | null
    extraDetails: Record<string, string>[]
    isKit?: boolean
    items?: InventoryItem[]
    warehouseID: string
    createdAt?: Date
    updatedAt?: Date
}

export interface InventoryItem {
    id: string,
    productID: string
    isTagged: boolean
    isActive: boolean
    location: Location
    lastActive: number;
    createdAt?: string | null;
    updatedAt?: string | null;
}

export interface Location {
    x: number,
    y: number
}
