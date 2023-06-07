/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWarehouse = /* GraphQL */ `
  query GetWarehouse($id: ID!) {
    getWarehouse(id: $id) {
      id
      group
      organizationID
      Organization {
        group
        Warehouses {
          nextToken
          startedAt
        }
        name
        groupID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      name
      location
      Products {
        items {
          id
          group
          name
          isKit
          description
          trackThreshold
          threshold
          warehouseID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listWarehouses = /* GraphQL */ `
  query ListWarehouses(
    $filter: ModelWarehouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWarehouses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        group
        organizationID
        Organization {
          group
          name
          groupID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        name
        location
        Products {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncWarehouses = /* GraphQL */ `
  query SyncWarehouses(
    $filter: ModelWarehouseFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWarehouses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        group
        organizationID
        Organization {
          group
          name
          groupID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        name
        location
        Products {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const warehousesByOrganizationID = /* GraphQL */ `
  query WarehousesByOrganizationID(
    $organizationID: String!
    $sortDirection: ModelSortDirection
    $filter: ModelWarehouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    warehousesByOrganizationID(
      organizationID: $organizationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        group
        organizationID
        Organization {
          group
          name
          groupID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        name
        location
        Products {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getOrganization = /* GraphQL */ `
  query GetOrganization($groupID: String!) {
    getOrganization(groupID: $groupID) {
      group
      Warehouses {
        items {
          id
          group
          organizationID
          name
          location
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      name
      groupID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listOrganizations = /* GraphQL */ `
  query ListOrganizations(
    $groupID: String
    $filter: ModelOrganizationFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listOrganizations(
      groupID: $groupID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        group
        Warehouses {
          nextToken
          startedAt
        }
        name
        groupID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncOrganizations = /* GraphQL */ `
  query SyncOrganizations(
    $filter: ModelOrganizationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrganizations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        group
        Warehouses {
          nextToken
          startedAt
        }
        name
        groupID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getKitPart = /* GraphQL */ `
  query GetKitPart($id: ID!) {
    getKitPart(id: $id) {
      id
      group
      quantity
      kitID
      Kit {
        id
        group
        name
        isKit
        items {
          nextToken
          startedAt
        }
        kitParts {
          nextToken
          startedAt
        }
        description
        trackThreshold
        threshold
        Warehouse {
          id
          group
          organizationID
          name
          location
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        extraDetails {
          name
          value
        }
        warehouseID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      part {
        id
        group
        name
        isKit
        items {
          nextToken
          startedAt
        }
        kitParts {
          nextToken
          startedAt
        }
        description
        trackThreshold
        threshold
        Warehouse {
          id
          group
          organizationID
          name
          location
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        extraDetails {
          name
          value
        }
        warehouseID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      partID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listKitParts = /* GraphQL */ `
  query ListKitParts(
    $filter: ModelKitPartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listKitParts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        group
        quantity
        kitID
        Kit {
          id
          group
          name
          isKit
          description
          trackThreshold
          threshold
          warehouseID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        part {
          id
          group
          name
          isKit
          description
          trackThreshold
          threshold
          warehouseID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        partID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncKitParts = /* GraphQL */ `
  query SyncKitParts(
    $filter: ModelKitPartFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncKitParts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        group
        quantity
        kitID
        Kit {
          id
          group
          name
          isKit
          description
          trackThreshold
          threshold
          warehouseID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        part {
          id
          group
          name
          isKit
          description
          trackThreshold
          threshold
          warehouseID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        partID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const kitPartsByKitID = /* GraphQL */ `
  query KitPartsByKitID(
    $kitID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelKitPartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    kitPartsByKitID(
      kitID: $kitID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        group
        quantity
        kitID
        Kit {
          id
          group
          name
          isKit
          description
          trackThreshold
          threshold
          warehouseID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        part {
          id
          group
          name
          isKit
          description
          trackThreshold
          threshold
          warehouseID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        partID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      group
      productID
      isTagged
      isActive
      isEmployee
      isEquipment
      location
      product {
        id
        group
        name
        isKit
        items {
          nextToken
          startedAt
        }
        kitParts {
          nextToken
          startedAt
        }
        description
        trackThreshold
        threshold
        Warehouse {
          id
          group
          organizationID
          name
          location
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        extraDetails {
          name
          value
        }
        warehouseID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      lastActive
      EPC_id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        group
        productID
        isTagged
        isActive
        isEmployee
        isEquipment
        location
        product {
          id
          group
          name
          isKit
          description
          trackThreshold
          threshold
          warehouseID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        lastActive
        EPC_id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncItems = /* GraphQL */ `
  query SyncItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        group
        productID
        isTagged
        isActive
        isEmployee
        isEquipment
        location
        product {
          id
          group
          name
          isKit
          description
          trackThreshold
          threshold
          warehouseID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        lastActive
        EPC_id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const itemsByProductID = /* GraphQL */ `
  query ItemsByProductID(
    $productID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    itemsByProductID(
      productID: $productID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        group
        productID
        isTagged
        isActive
        isEmployee
        isEquipment
        location
        product {
          id
          group
          name
          isKit
          description
          trackThreshold
          threshold
          warehouseID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        lastActive
        EPC_id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      group
      name
      isKit
      items {
        items {
          id
          group
          productID
          isTagged
          isActive
          isEmployee
          isEquipment
          location
          lastActive
          EPC_id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      kitParts {
        items {
          id
          group
          quantity
          kitID
          partID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      description
      trackThreshold
      threshold
      Warehouse {
        id
        group
        organizationID
        Organization {
          group
          name
          groupID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        name
        location
        Products {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      extraDetails {
        name
        value
      }
      warehouseID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        group
        name
        isKit
        items {
          nextToken
          startedAt
        }
        kitParts {
          nextToken
          startedAt
        }
        description
        trackThreshold
        threshold
        Warehouse {
          id
          group
          organizationID
          name
          location
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        extraDetails {
          name
          value
        }
        warehouseID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncProducts = /* GraphQL */ `
  query SyncProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProducts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        group
        name
        isKit
        items {
          nextToken
          startedAt
        }
        kitParts {
          nextToken
          startedAt
        }
        description
        trackThreshold
        threshold
        Warehouse {
          id
          group
          organizationID
          name
          location
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        extraDetails {
          name
          value
        }
        warehouseID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const productsByWarehouseID = /* GraphQL */ `
  query ProductsByWarehouseID(
    $warehouseID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByWarehouseID(
      warehouseID: $warehouseID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        group
        name
        isKit
        items {
          nextToken
          startedAt
        }
        kitParts {
          nextToken
          startedAt
        }
        description
        trackThreshold
        threshold
        Warehouse {
          id
          group
          organizationID
          name
          location
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        extraDetails {
          name
          value
        }
        warehouseID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getEmployee = /* GraphQL */ `
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
      id
      group
      name
      items {
        id
        group
        productID
        isTagged
        isActive
        isEmployee
        isEquipment
        location
        product {
          id
          group
          name
          isKit
          description
          trackThreshold
          threshold
          warehouseID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        lastActive
        EPC_id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      title
      email
      phone
      extraDetails {
        name
        value
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      employeeItemsId
    }
  }
`;
export const listEmployees = /* GraphQL */ `
  query ListEmployees(
    $filter: ModelEmployeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        group
        name
        items {
          id
          group
          productID
          isTagged
          isActive
          isEmployee
          isEquipment
          location
          lastActive
          EPC_id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        title
        email
        phone
        extraDetails {
          name
          value
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        employeeItemsId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncEmployees = /* GraphQL */ `
  query SyncEmployees(
    $filter: ModelEmployeeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEmployees(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        group
        name
        items {
          id
          group
          productID
          isTagged
          isActive
          isEmployee
          isEquipment
          location
          lastActive
          EPC_id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        title
        email
        phone
        extraDetails {
          name
          value
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        employeeItemsId
      }
      nextToken
      startedAt
    }
  }
`;
export const getEquipment = /* GraphQL */ `
  query GetEquipment($id: ID!) {
    getEquipment(id: $id) {
      id
      group
      name
      items {
        id
        group
        productID
        isTagged
        isActive
        isEmployee
        isEquipment
        location
        product {
          id
          group
          name
          isKit
          description
          trackThreshold
          threshold
          warehouseID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        lastActive
        EPC_id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      description
      part_id
      extraDetails {
        name
        value
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      equipmentItemsId
    }
  }
`;
export const listEquipment = /* GraphQL */ `
  query ListEquipment(
    $filter: ModelEquipmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEquipment(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        group
        name
        items {
          id
          group
          productID
          isTagged
          isActive
          isEmployee
          isEquipment
          location
          lastActive
          EPC_id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        description
        part_id
        extraDetails {
          name
          value
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        equipmentItemsId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncEquipment = /* GraphQL */ `
  query SyncEquipment(
    $filter: ModelEquipmentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEquipment(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        group
        name
        items {
          id
          group
          productID
          isTagged
          isActive
          isEmployee
          isEquipment
          location
          lastActive
          EPC_id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        description
        part_id
        extraDetails {
          name
          value
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        equipmentItemsId
      }
      nextToken
      startedAt
    }
  }
`;
