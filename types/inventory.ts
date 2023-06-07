export interface Inventory {
    id?: string
    name: string
    description: string
    quantity: number
    liveTags?: number
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
    isEmployee: boolean
    isEquipment: boolean
    location: Location
    lastActive: number;
    createdAt?: string | null;
    updatedAt?: string | null;
}

export interface Employee {
    id: string,
    name: string
    title: string
    email?: string
    phone?: string
    extraDetails: Record<string, string>[]
    createdAt?: Date
    updatedAt?: Date
}

export interface Equipment {
    id: string,
    name: string
    description?: string
    part_id?: string
    extraDetails: Record<string, string>[]
    createdAt?: Date
    updatedAt?: Date
}

export interface Location {
    x: number,
    y: number
}
