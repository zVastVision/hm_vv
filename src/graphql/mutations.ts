/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createWarehouse = /* GraphQL */ `
  mutation CreateWarehouse(
    $input: CreateWarehouseInput!
    $condition: ModelWarehouseConditionInput
  ) {
    createWarehouse(input: $input, condition: $condition) {
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
export const updateWarehouse = /* GraphQL */ `
  mutation UpdateWarehouse(
    $input: UpdateWarehouseInput!
    $condition: ModelWarehouseConditionInput
  ) {
    updateWarehouse(input: $input, condition: $condition) {
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
export const deleteWarehouse = /* GraphQL */ `
  mutation DeleteWarehouse(
    $input: DeleteWarehouseInput!
    $condition: ModelWarehouseConditionInput
  ) {
    deleteWarehouse(input: $input, condition: $condition) {
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
export const createOrganization = /* GraphQL */ `
  mutation CreateOrganization(
    $input: CreateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    createOrganization(input: $input, condition: $condition) {
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
export const updateOrganization = /* GraphQL */ `
  mutation UpdateOrganization(
    $input: UpdateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    updateOrganization(input: $input, condition: $condition) {
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
export const deleteOrganization = /* GraphQL */ `
  mutation DeleteOrganization(
    $input: DeleteOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    deleteOrganization(input: $input, condition: $condition) {
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
export const createKitPart = /* GraphQL */ `
  mutation CreateKitPart(
    $input: CreateKitPartInput!
    $condition: ModelKitPartConditionInput
  ) {
    createKitPart(input: $input, condition: $condition) {
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
export const updateKitPart = /* GraphQL */ `
  mutation UpdateKitPart(
    $input: UpdateKitPartInput!
    $condition: ModelKitPartConditionInput
  ) {
    updateKitPart(input: $input, condition: $condition) {
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
export const deleteKitPart = /* GraphQL */ `
  mutation DeleteKitPart(
    $input: DeleteKitPartInput!
    $condition: ModelKitPartConditionInput
  ) {
    deleteKitPart(input: $input, condition: $condition) {
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
export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $input: CreateItemInput!
    $condition: ModelItemConditionInput
  ) {
    createItem(input: $input, condition: $condition) {
      id
      group
      productID
      isTagged
      isActive
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
      id
      group
      productID
      isTagged
      isActive
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $input: DeleteItemInput!
    $condition: ModelItemConditionInput
  ) {
    deleteItem(input: $input, condition: $condition) {
      id
      group
      productID
      isTagged
      isActive
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
          location
          lastActive
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
          location
          lastActive
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
          location
          lastActive
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
