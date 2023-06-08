import Papa from 'papaparse';
import { DataStore, Predicates } from "aws-amplify"
import { Product as ProductModel, Item as ItemModel, Employee as EmployeeModel, Equipment as EquipmentModel, LazyProduct, LazyItem, LazyEmployee, LazyEquipment, KitPart as KitPartModel, Product, Employee, Equipment } from '~/src/models'
import { Inventory, InventoryItem, InventoryStoreState, KitPart, Paging } from "~/types"

export const useInventoryStore = defineStore('inventory', {
    state: (): InventoryStoreState => ({
        inventoryList: [],
        employeeList: [],
        equipmentList: [],
        itemsData: [],
        activeitemsData: [],
        inventorySearch: [],
        employeeSearch: [],
        equipmentSearch: [],
        inventoryData: null,
        employeeData: null,
        equipmentData: null,
        inventoryItems: [],
    }),
    actions: {
        async subFunc(): Promise<void> {
            DataStore.observe(ItemModel).subscribe(msg => {
              console.log("SOMETHING")
              this.getInventoryItems({})
              this.getEmployeeItems({})
              this.getEquipmentItems({})
            });

        },

        async subItemFunc(): Promise<void> {
            DataStore.observe(ItemModel).subscribe(msg => {
              console.log("SOMETHING ELSE")
              //this.getItems({})
              this.getActiveItems({})
            });

        },

        async createInventoryInstance(input: Inventory): Promise<void> {
            await this.createItem(input);
            // TODO: handle this properly
        },

        async createEmployeeInstance(input: Employee): Promise<void> {
            await this.createEmployee(input);
            // TODO: handle this properly
        },

        async createEquipmentInstance(input: Equipment): Promise<void> {
            await this.createEquipment(input);
            // TODO: handle this properly
        },

        async createBulkInventoryInstance(input: Inventory[]): Promise<void> {
            console.log(input)
            const items: unknown[] = []
            input.forEach(item => {
                items.push(this.createItem(item))
            })
            console.log(items)
            await Promise.allSettled(items)
        },

        async createItem(input: Inventory) {
            const product: ProductModel = await DataStore.save(new ProductModel({
                name: input.name,
                isKit: false,
                description: input.description,
                threshold: input.threshold,
                trackThreshold: input.trackThreshold,
                extraDetails: input.extraDetails,
                warehouseID: input.warehouseID
            }));

            const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
            const items = [];
            for (let i = 0; i < (input.quantity || 0); i++) {
                items.push(
                    DataStore.save(new ItemModel({
                        productID: product.id,
                        isTagged: false,
                        isActive: false,
                        isEmployee: false,
                        isEquipment: false,
                        EPC_id: genRanHex(24).toUpperCase()
                    })
                    )
                );
            }

            const res = await Promise.allSettled(items);
            return res;
        },

        async createEmployee(input: Employee) {
            const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
            const item: itemModel = await DataStore.save(new ItemModel({
                isTagged: false,
                isActive: false,
                isEmployee: true,
                isEquipment: false,
                EPC_id: genRanHex(24).toUpperCase()
            })
            )

            const employee: EmployeeModel = await DataStore.save(new EmployeeModel({
                name: input.name,
                title: input.title,
                email: input.email,
                phone: input.phone,
                extraDetails: input.extraDetails,
                items: item
            }));

            return employee;
        },

        async createEquipment(input: Equipment) {
            const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
            const item: itemModel = await DataStore.save(new ItemModel({
                isTagged: false,
                isActive: false,
                isEmployee: false,
                isEquipment: true,
                EPC_id: genRanHex(24).toUpperCase()
            })
            )

            const equipment: EquipmentModel = await DataStore.save(new EquipmentModel({
                name: input.name,
                part_id: input.part_id,
                description: input.description,
                extraDetails: input.extraDetails,
                items: item
            }));

            return equipment;
        },

        async getItems(pagination: Paging): Promise<void> {

            const allItems = await DataStore.query(ItemModel, Predicates.ALL, {
                page: pagination.page,
                limit: pagination.size
            })

            //console.log("Getting Regular Items...")

            this.itemsData = await this.mapItems(allItems)
        },

        async getActiveItems(pagination: Paging): Promise<void> {

            const allItems = await DataStore.query(ItemModel, Predicates.ALL, {
                page: pagination.page,
                limit: pagination.size
            })

            //console.log("Getting Regular Items...")

            this.activeitemsData = await this.mapActiveItems(allItems)
        },

        async getInventoryItems(pagination: Paging): Promise<void> {

            const inventoryItems = await DataStore.query(ProductModel, Predicates.ALL, {
                page: pagination.page,
                limit: pagination.size
            })

            this.inventoryList = await this.mapInventory(inventoryItems)
        },

        async getEmployeeItems(pagination: Paging): Promise<void> {

            const employeeItems = await DataStore.query(EmployeeModel, Predicates.ALL, {
                page: pagination.page,
                limit: pagination.size
            })

            this.employeeList = await this.mapEmployees(employeeItems)
        },

        async getEquipmentItems(pagination: Paging): Promise<void> {

            console.log("Calling Equip Function")
            const equipmentItems = await DataStore.query(EquipmentModel, Predicates.ALL, {
                page: pagination.page,
                limit: pagination.size
            })

            console.log(equipmentItems)

            this.equipmentList = await this.mapEquipment(equipmentItems)
        },

        async searchInventoryItem(query: string, paging: Paging): Promise<void> {
            //const inventoryItems = await DataStore.query(ProductModel, p => p.name.contains(query), {
            const inventoryItems = await DataStore.query(ProductModel, Predicates.ALL, {
                page: paging.page,
                limit: paging.size
            })
              
            //this.inventorySearch = await this.mapInventory(inventoryItems)
            this.inventorySearch = await this.mapSearchInventory(query, inventoryItems)
        },

        async searchEmployeeItem(query: string, paging: Paging): Promise<void> {
            //const inventoryItems = await DataStore.query(ProductModel, p => p.name.contains(query), {
            const employeeItems = await DataStore.query(EmployeeModel, Predicates.ALL, {
                page: paging.page,
                limit: paging.size
            })

            //this.inventorySearch = await this.mapInventory(inventoryItems)
            this.employeeSearch = await this.mapSearchEmployees(query, employeeItems)
        },

        async searchEquipmentItem(query: string, paging: Paging): Promise<void> {
            //const inventoryItems = await DataStore.query(ProductModel, p => p.name.contains(query), {
            const equipmentItems = await DataStore.query(EquipmentModel, Predicates.ALL, {
                page: paging.page,
                limit: paging.size
            })

            //this.inventorySearch = await this.mapInventory(inventoryItems)
            this.equipmentSearch = await this.mapSearchEquipment(query, equipmentItems)
        },

        async mapItems(allItems: LazyItem[]): Promise<InventoryItem[]> {
            const itemData = []
            for await (const item of allItems) {
                const singleItem: InventoryItem = {
                   productID: item.productID,
                   isTagged: item.isTagged,
                   isActive: item.isActive,
                   location: item.location || "",
                   EPC_id: item.EPC_id
                }
                itemData.push(singleItem)
            }
            return itemData
        },

        async mapActiveItems(allItems: LazyItem[]): Promise<InventoryItem[]> {
            const itemData = []
            for await (const item of allItems) {
                const singleItem: InventoryItem = {
                   productID: item.productID,
                   isTagged: item.isTagged,
                   isActive: item.isActive,
                   location: item.location || "",
                   EPC_id: item.EPC_id
                }
                if(item.isActive == true){
                   itemData.push(singleItem)
                }
            }
            return itemData
        },

        async mapInventory(inventoryItems: LazyProduct[]): Promise<Inventory[]> {
            const inventoryList = []
            //console.log("OG OG Inventory List")
            //console.log(inventoryItems)
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
                    quantity: (await product.items.toArray()).length || 0,
                    liveTags: (await product.items.toArray()).filter((x,i) => { return x.isActive; }).length || 0
                }
                inventoryList.push(inventoryItem)
            }
            return inventoryList
        },

        async mapSearchInventory(query: string, inventoryItems: LazyProduct[]): Promise<Inventory[]> {
            const inventoryList = []
            //console.log("Inventory List")
            //console.log(inventoryItems)
            for await (const product of inventoryItems) {
                const prod_name = product.name.split(" ")
                let search_bool = false
                for (let h = 0; h < prod_name.length; h++) {
                    if(prod_name[h].replace(/["'()]/g,"").toLowerCase().startsWith(query.toLowerCase())){
                        search_bool = true
                        break
                    }
                }
                if(search_bool == true){
                    const inventoryItem: Inventory = {
                        id: product.id,
                        name: product.name,
                        description: product.description as string,
                        threshold: product.threshold || 0,
                        warehouseID: product.warehouseID,
                        trackThreshold: product.trackThreshold,
                        extraDetails: product.extraDetails as Record<string, string>[],
                        isKit: product.isKit,
                        quantity: (await product.items.toArray()).length || 0,
                        liveTags: (await product.items.toArray()).filter((x,i) => { return x.isActive; }).length || 0
                    }
                    inventoryList.push(inventoryItem)
                }
            }
            return inventoryList
        },

        async mapEmployees(employeeItems: LazyEmployee[]): Promise<Employee[]> {
            const employeeList = []
            console.log("Employee List")
            console.log(employeeItems)
            for await (const product of employeeItems) {
                const employeeItem: Employee = {
                    id: product.id,
                    name: product.name,
                    title: product.title,
                    email: product.email,
                    phone: product.phone,
                    extraDetails: product.extraDetails as Record<string, string>[]
                }
                employeeList.push(employeeItem)
            }
            return employeeList
        },

        async mapSearchEmployees(query: string, employeeItems: LazyEmployee[]): Promise<Employee[]> {
            const employeeList = []
            console.log("Employee List")
            console.log(employeeItems)
            for await (const product of employeeItems) {
                const prod_name = product.name.split(" ")
                let search_bool = false
                for (let h = 0; h < prod_name.length; h++) {
                    if(prod_name[h].replace(/["'()]/g,"").toLowerCase().startsWith(query.toLowerCase())){
                        search_bool = true
                        break
                    }
                }
                if(search_bool == true){
                    const employeeItem: Employee = {
                        id: product.id,
                        name: product.name,
                        title: product.title,
                        email: product.email,
                        phone: product.phone,
                        extraDetails: product.extraDetails as Record<string, string>[]
                    }
                    employeeList.push(employeeItem)
                }
            }
            return employeeList
        },

        async mapEquipment(equipmentItems: LazyEquipment[]): Promise<Equipment[]> {
            const equipmentList = []
            console.log("Equipment List")
            console.log(equipmentItems)
            for await (const product of equipmentItems) {
                const equipmentItem: Equipment = {
                    id: product.id,
                    name: product.name,
                    description: product.description as string,
                    part_id: product.part_id,
                    extraDetails: product.extraDetails as Record<string, string>[]
                }
                equipmentList.push(equipmentItem)
            }
            return equipmentList
        },

        async mapSearchEquipment(query: string, equipmentItems: LazyEquipment[]): Promise<Equipment[]> {
            const equipmentList = []
            //console.log("Employee List")
            //console.log(employeeItems)
            for await (const product of equipmentItems) {
                const prod_name = product.name.split(" ")
                let search_bool = false
                for (let h = 0; h < prod_name.length; h++) {
                    if(prod_name[h].replace(/["'()]/g,"").toLowerCase().startsWith(query.toLowerCase())){
                        search_bool = true
                        break
                    }
                }
                if(search_bool == true){
                    const equipmentItem: Equipment = {
                        id: product.id,
                        name: product.name,
                        description: product.description as string,
                        part_id: product.part_id,
                        extraDetails: product.extraDetails as Record<string, string>[]
                    }
                    equipmentList.push(equipmentItem)
                }
            }
            return equipmentList
        },

        async createKit(input: Inventory, parts: KitPart[]) {
            const product: ProductModel = await DataStore.save(new ProductModel({
                name: input.name,
                isKit: true,
                description: input.description,
                threshold: input.threshold,
                trackThreshold: input.trackThreshold,
                warehouseID: input.warehouseID,
                extraDetails: input.extraDetails
            }))

            const kitParts = parts.map(part => {
                return DataStore.save(new KitPartModel({
                    kitID: product.id,
                    partID: part.partId,
                    quantity: part.quantity
                }))
            })

            const items = []
            for (let i = 0; i < (input.quantity || 0); i++) {
                items.push(
                    DataStore.save(new ItemModel({
                        productID: product.id,
                        isTagged: false,
                        isActive: false,
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

        async encItem(item: Inventory[]): Promise<string[]> {
            //const epcs = []
            const epcs = {}
            for (let i = 0; i < item[0].length; i++) {
              const original = await DataStore.query(ItemModel, (c) => c.and(c => [
                                                       c.productID.eq(item[0][i].id as string),
                                                       c.isTagged.eq(false)
              ]))

              if (original) {
                const sub_epcs = []

                for (let j = 0; j < item[0][i].quantity; j++) {
                  await DataStore.save(
                    ItemModel.copyOf(original[j], updated => {
                        updated.isTagged = true
                    })
                  );
                  sub_epcs.push(original[j].EPC_id)
                }
                //epcs.push(sub_epcs)
                epcs[item[0][i].name] = [item[0][i].description,[sub_epcs]]
              }
            }

            return epcs
        },

        async encEmp(emp: Employee[]): Promise<string[]> {
            const epcs = []
            for (let i = 0; i < emp[0].length; i++) {
              const original = await DataStore.query(ItemModel, (c) => c.and(c => [
                                                       c.productID.eq(item[0][i].id as string),
                                                       c.isTagged.eq(false)
              ]))

              if (original) {
                const sub_epcs = []

                for (let j = 0; j < item[0][i].quantity; j++) {
                  await DataStore.save(
                    ItemModel.copyOf(original[j], updated => {
                        updated.isTagged = true
                    })
                  );
                  sub_epcs.push(original[j].EPC_id)
                }
                epcs.push(sub_epcs)
              }
            }

            return epcs
        },

        async editInventoryItem(item: Inventory) {
            //console.log(item)
            //console.log(item)
            //console.log(original)
            const original = await DataStore.query(ProductModel, item.id as string)
            console.log(item)
            console.log(original)
            if( item.quantity > original.quantity) {
              print("NEED TO ADD")
            }
            if( item.quantity < original.quantity) {
              print("NEED TO SUB")
            }
            if (original) {
                await DataStore.save(
                    ProductModel.copyOf(original, updated => {
                        updated.name = item.name
                        updated.description = item.description
                        updated.threshold = item.threshold
                        updated.extraDetails = item.extraDetails
                        updated.trackThreshold = item.trackThreshold as boolean
                        updated.extraDetails = item.extraDetails
                    })
                );
            }

        },

        async editEmployeeItem(employee: Employee) {
            const original = await DataStore.query(EmployeeModel, employee.id as string)
            if (original) {
                await DataStore.save(
                    EmployeeModel.copyOf(original, updated => {
                        updated.name = employee.name
                        updated.title = employee.title
                        updated.email = employee.email
                        updated.extraDetails = employee.extraDetails
                        updated.phone = employee.phone
                    })
                );
            }

        },

        async editEquipmentItem(equipment: Equipment) {
            const original = await DataStore.query(EquipmentModel, equipment.id as string)
            if (original) {
                await DataStore.save(
                    EquipmentModel.copyOf(original, updated => {
                        updated.name = equipment.name
                        updated.description = equipment.description
                        updated.part_id = equipment.part_id
                        updated.extraDetails = equipment.extraDetails
                    })
                );
            }

        },

        async deleteItems(ids: string[]) {
            const items = ids.map(id => DataStore.delete(ProductModel, product => product.id.eq(id)))
            await Promise.allSettled(items)
        },

        async deleteEmployees(ids: string[]) {
            const items = ids.map(id => DataStore.delete(EmployeeModel, employee => employee.id.eq(id)))
            await Promise.allSettled(items)
        },
 
        async deleteEquipment(ids: string[]) {
            const items = ids.map(id => DataStore.delete(EquipmentModel, equipment => equipment.id.eq(id)))
            await Promise.allSettled(items)
        },

        async getInventoryItemById(id: string) {
            const product = (await DataStore.query(Product, id))
            if (product) {
                this.inventoryItems = await product.items.toArray() as InventoryItem[]
                const inventory: Inventory = {
                    /*id: product.id,
                    name: product.name,
                    description: product.description || "",
                    warehouseID: product?.warehouseID,
                    trackThreshold: product.trackThreshold,
                    extraDetails: product.extraDetails as Record<string, string>[],
                    threshold: product.threshold || null,
                    //quantity: this.inventoryItems.length
                    quantity: (await product.items.toArray()).length || 0*/


                    id: product.id,
                    name: product.name,
                    description: product.description as string,
                    threshold: product.threshold || 0,
                    warehouseID: product.warehouseID,
                    trackThreshold: product.trackThreshold,
                    extraDetails: product.extraDetails as Record<string, string>[],
                    isKit: product.isKit,
                    quantity: (await product.items.toArray()).length || 0,
                    liveTags: (await product.items.toArray()).filter((x,i) => { return x.isActive; }).length || 0
                }
                this.inventoryData = inventory
            }
        },

        async getEmployeeItemById(id: string) {
            const q_employee = (await DataStore.query(Employee, id))
            if (q_employee) {
                //console.log("employee exists!!!!!!!!!")
                //this.employeeItems = await employee.items.toArray() as InventoryItem[]
                const employee: Employee = {
                    id: q_employee.id,
                    name: q_employee.name,
                    title: q_employee.title,
                    email: q_employee.email,
                    phone: q_employee.phone,
                    extraDetails: q_employee.extraDetails as Record<string, string>[]
                }
                //console.log(employee)
                this.employeeData = employee
            }
        },

        async getEquipmentItemById(id: string) {
            const q_equipment = (await DataStore.query(Equipment, id))
            if (q_equipment) {
                console.log("equipment exists!!!!!!!!!")
                const equipment: Equipment = {
                    id: q_equipment.id,
                    name: q_equipment.name,
                    description: q_equipment.description,
                    part_id: q_equipment.part_id,
                    extraDetails: q_equipment.extraDetails as Record<string, string>[]
                }
                //console.log(employee)
                this.equipmentData = equipment
            }
        }
    }
})

