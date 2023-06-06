import { DataStore, Auth, Hub, API } from "aws-amplify"
import { Warehouse as WarehouseModel, Organization as OrganizationModel } from "~/src/models"
import { Warehouse, Organization } from "~/types"
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import * as mutations from '../src/graphql/mutations'

export const useWarehouseStore = defineStore('warehouse', {
    state: () => <{ warehouse: Warehouse | null, warehouseList: Warehouse[], organization: Organization | null }>({
        warehouse: null,
        warehouseList: [],
        organization: null
    }),
    actions: {
        async findById(id: string) {
            
            const warehouse = (await DataStore.query(WarehouseModel, id)) as Warehouse
            this.warehouse = {name: warehouse.name, location: warehouse.location, id: warehouse.id}
        },

        async getOrganization() {
            const groupList = await useGetUserGroups()
            let res = await DataStore.query(OrganizationModel, groupList[0])
            if (res === undefined) {
                Hub.listen("datastore", async (data) => {
                    const {payload} = data
                    if (payload.event === "ready") {
                        res = await DataStore.query(OrganizationModel, groupList[0])
                        this.organization = { name: res?.name as string, id: res?.groupID as string }
                        this.warehouseList = await res?.Warehouses.toArray() as Warehouse[]
                    }
                })
            }
            this.organization = { name: res?.name as string, id: res?.groupID as string }
            this.warehouseList = await res?.Warehouses.toArray() as Warehouse[]
        },

        async createWarehouse(name: string, location: string, organizationId: string) {
            // await API.graphql({
            //     query: mutations.createWarehouse,
            //     variables: {
            //         input: {
            //             name: name,
            //             location: location,
            //             organizationID: organizationId,
            //             group: 'vast-vision'
            //         }
            //     },
            //     authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            // })
            await DataStore.save(new WarehouseModel({
                name: name,
                location: location,
                organizationID: organizationId,
                group: organizationId
            }))
        } 
    }
})

