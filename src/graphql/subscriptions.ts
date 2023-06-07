/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateWarehouse = /* GraphQL */ `
  subscription OnCreateWarehouse(
    $filter: ModelSubscriptionWarehouseFilterInput
  ) {
    onCreateWarehouse(filter: $filter) {
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
export const onUpdateWarehouse = /* GraphQL */ `
  subscription OnUpdateWarehouse(
    $filter: ModelSubscriptionWarehouseFilterInput
  ) {
    onUpdateWarehouse(filter: $filter) {
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
export const onDeleteWarehouse = /* GraphQL */ `
  subscription OnDeleteWarehouse(
    $filter: ModelSubscriptionWarehouseFilterInput
  ) {
    onDeleteWarehouse(filter: $filter) {
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
export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onCreateOrganization(filter: $filter) {
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
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onUpdateOrganization(filter: $filter) {
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
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onDeleteOrganization(filter: $filter) {
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
export const onCreateKitPart = /* GraphQL */ `
  subscription OnCreateKitPart($filter: ModelSubscriptionKitPartFilterInput) {
    onCreateKitPart(filter: $filter) {
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
export const onUpdateKitPart = /* GraphQL */ `
  subscription OnUpdateKitPart($filter: ModelSubscriptionKitPartFilterInput) {
    onUpdateKitPart(filter: $filter) {
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
export const onDeleteKitPart = /* GraphQL */ `
  subscription OnDeleteKitPart($filter: ModelSubscriptionKitPartFilterInput) {
    onDeleteKitPart(filter: $filter) {
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
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem($filter: ModelSubscriptionItemFilterInput) {
    onCreateItem(filter: $filter) {
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
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem($filter: ModelSubscriptionItemFilterInput) {
    onUpdateItem(filter: $filter) {
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
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem($filter: ModelSubscriptionItemFilterInput) {
    onDeleteItem(filter: $filter) {
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
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
    onCreateProduct(filter: $filter) {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
    onUpdateProduct(filter: $filter) {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
    onDeleteProduct(filter: $filter) {
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
export const onCreateEmployee = /* GraphQL */ `
  subscription OnCreateEmployee($filter: ModelSubscriptionEmployeeFilterInput) {
    onCreateEmployee(filter: $filter) {
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
export const onUpdateEmployee = /* GraphQL */ `
  subscription OnUpdateEmployee($filter: ModelSubscriptionEmployeeFilterInput) {
    onUpdateEmployee(filter: $filter) {
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
export const onDeleteEmployee = /* GraphQL */ `
  subscription OnDeleteEmployee($filter: ModelSubscriptionEmployeeFilterInput) {
    onDeleteEmployee(filter: $filter) {
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
export const onCreateEquipment = /* GraphQL */ `
  subscription OnCreateEquipment(
    $filter: ModelSubscriptionEquipmentFilterInput
  ) {
    onCreateEquipment(filter: $filter) {
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
export const onUpdateEquipment = /* GraphQL */ `
  subscription OnUpdateEquipment(
    $filter: ModelSubscriptionEquipmentFilterInput
  ) {
    onUpdateEquipment(filter: $filter) {
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
export const onDeleteEquipment = /* GraphQL */ `
  subscription OnDeleteEquipment(
    $filter: ModelSubscriptionEquipmentFilterInput
  ) {
    onDeleteEquipment(filter: $filter) {
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
