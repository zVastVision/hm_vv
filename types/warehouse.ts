import { string } from "zod"
import { Organization } from "~/src/models"

export interface Warehouse {
    id: string
    name: string
    location?: string
}

export interface Organization {
    id: string
    name: string
}