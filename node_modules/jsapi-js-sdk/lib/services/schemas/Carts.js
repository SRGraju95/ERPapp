/**
 * Created by eliot on 6/25/15.
 */

var _ = require("lodash"),
    CartGetResponse = require("../models/Cart")
;
var schema = {
    "apiVersion": "1.0",
    "swaggerVersion": "1.2",
    "basePath": "/rest",
    "resourcePath": "/services/latest/carts",
    "produces": ["*/*"],
    "consumes": ["application/json"],
    "apis": [{
        "path": "/services/latest/carts",
        "description": "getCart",
        "operations": [{
            "method": "POST",
            "summary": "Creates a new cart from scratch",
            "notes": "You don't have to have a user to create a cart but the API requires authentication to checkout",
            "nickname": "getCart",
            "produces": ["*/*"],
            "consumes": ["application/json"],
            "parameters": [],
            "responseMessages": [{
                "code": 200,
                "message": "the cart has been created, use the returned GUID to manage the cart",
                "responseModel": "string"
            }, {
                "code": 201,
                "message": "Created"
            }, {
                "code": 401,
                "message": "Unauthorized"
            }, {
                "code": 403,
                "message": "Forbidden"
            }, {
                "code": 404,
                "message": "Not Found"
            }],
            "deprecated": "false",
            "type": "string"
        }]
    }, {
        "path": "/services/latest/carts/skus",
        "description": "createSkus",
        "operations": [{
            "method": "POST",
            "summary": "Generates and save a new SKU based on the given prefix",
            "notes": "createSkus",
            "nickname": "createSkus",
            "produces": ["*/*"],
            "consumes": ["application/json"],
            "parameters": [{
                "allowMultiple": false,
                "defaultValue": "",
                "description": "sku",
                "name": "body",
                "paramType": "body",
                "type": "NewSKURequest",
                "required": false
            }],
            "responseMessages": [{
                "code": 200,
                "message": null,
                "responseModel": "CreateSkusResponse"
            }, {
                "code": 201,
                "message": "Created"
            }, {
                "code": 401,
                "message": "Unauthorized"
            }, {
                "code": 403,
                "message": "Forbidden"
            }, {
                "code": 404,
                "message": "Not Found"
            }],
            "deprecated": "false",
            "type": "CreateSkusResponse"
        }]
    }, {
        "path": "/services/latest/carts/{cartGUID}",
        "description": "modifyStatus",
        "operations": [{
            "method": "PUT",
            "summary": "Changes the status of a cart",
            "notes": "modifyStatus",
            "nickname": "modifyStatus",
            "produces": ["*/*"],
            "consumes": ["application/json"],
            "parameters": [{
                "allowMultiple": false,
                "defaultValue": "",
                "description": "cartGUID",
                "name": "cartGUID",
                "paramType": "path",
                "type": "string",
                "required": true
            }, {
                "allowMultiple": false,
                "defaultValue": "",
                "description": "request",
                "name": "body",
                "paramType": "body",
                "type": "CartItemRequest",
                "required": false
            }],
            "responseMessages": [{
                "code": 200,
                "message": null
            }, {
                "code": 201,
                "message": "Created"
            }, {
                "code": 401,
                "message": "Unauthorized"
            }, {
                "code": 403,
                "message": "Forbidden"
            }, {
                "code": 404,
                "message": "Not Found"
            }],
            "deprecated": "false",
            "type": "void"
        }]
    }, {
        "path": "/services/latest/carts/{cartGUID}",
        "description": "getCart",
        "operations": [{
            "method": "GET",
            "summary": "Returns the cart with the given GUID",
            "notes": "getCart",
            "nickname": "getCart",
            "produces": ["*/*"],
            "consumes": ["application/json"],
            "parameters": [{
                "allowMultiple": false,
                "defaultValue": "",
                "description": "cartGUID",
                "name": "cartGUID",
                "paramType": "path",
                "type": "string",
                "required": true
            }, {
                "allowMultiple": false,
                "defaultValue": "",
                "description": "auth",
                "name": "body",
                "paramType": "body",
                "type": "Authentication",
                "required": false
            }],
            "responseMessages": [{
                "code": 200,
                "message": "OK",
                "responseModel": "CartGetResponse"
            }, {
                "code": 401,
                "message": "Unauthorized"
            }, {
                "code": 403,
                "message": "Forbidden"
            }, {
                "code": 404,
                "message": "Not Found"
            }],
            "deprecated": "false",
            "type": "CartGetResponse"
        }]
    }, {
        "path": "/services/latest/carts/{cartGUID}/checkout",
        "description": "checkout",
        "operations": [{
            "method": "POST",
            "summary": "Closes a cart and generates an invoice",
            "notes": "checkout",
            "nickname": "checkout",
            "produces": ["*/*"],
            "consumes": ["application/json"],
            "parameters": [{
                "allowMultiple": false,
                "defaultValue": "",
                "description": "cartGUID",
                "name": "cartGUID",
                "paramType": "path",
                "type": "string",
                "required": true
            }],
            "responseMessages": [{
                "code": 200,
                "message": null,
                "responseModel": "InvoiceGetResponse"
            }, {
                "code": 201,
                "message": "Created"
            }, {
                "code": 401,
                "message": "Unauthorized"
            }, {
                "code": 403,
                "message": "Forbidden"
            }, {
                "code": 404,
                "message": "Not Found"
            }],
            "deprecated": "false",
            "type": "InvoiceGetResponse"
        }]
    }, {
        "path": "/services/latest/carts/{cartGUID}/countries",
        "description": "getCountries",
        "operations": [{
            "method": "GET",
            "summary": "Get the list of available shipping countries per vendor",
            "notes": "Since a cart can have multiple vendors with different shipping options, the countries are broken down by vendors",
            "nickname": "getCountries",
            "produces": ["*/*"],
            "consumes": ["application/json"],
            "parameters": [{
                "allowMultiple": false,
                "defaultValue": "",
                "description": "cartGUID",
                "name": "cartGUID",
                "paramType": "path",
                "type": "string",
                "required": true
            }],
            "responseMessages": [{
                "code": 200,
                "message": "OK",
                "responseModel": "List"
            }, {
                "code": 401,
                "message": "Unauthorized"
            }, {
                "code": 403,
                "message": "Forbidden"
            }, {
                "code": 404,
                "message": "Not Found"
            }],
            "deprecated": "false",
            "type": "List[Entry«int,Collection«DeprecatedCountry»»]"
        }]
    }, {
        "path": "/services/latest/carts/{cartGUID}/discounts",
        "description": "addDiscount",
        "operations": [{
            "method": "POST",
            "summary": "Adds a coupon to the cart identified by GUID",
            "notes": "addDiscount",
            "nickname": "addDiscount",
            "produces": ["*/*"],
            "consumes": ["application/json"],
            "parameters": [{
                "allowMultiple": false,
                "defaultValue": "",
                "description": "cartGUID",
                "name": "cartGUID",
                "paramType": "path",
                "type": "string",
                "required": true
            }, {
                "allowMultiple": false,
                "defaultValue": "",
                "description": "coupons",
                "name": "body",
                "paramType": "body",
                "type": "SkuRequest",
                "required": false
            }],
            "responseMessages": [{
                "code": 200,
                "message": null
            }, {
                "code": 201,
                "message": "Created"
            }, {
                "code": 401,
                "message": "Unauthorized"
            }, {
                "code": 403,
                "message": "Forbidden"
            }, {
                "code": 404,
                "message": "Not Found"
            }],
            "deprecated": "false",
            "type": "void"
        }]
    }, {
        "path": "/services/latest/carts/{cartGUID}/items",
        "description": "modifyCartItem",
        "operations": [{
            "method": "PUT",
            "summary": "Changes the quantity of an item already in the cart",
            "notes": "A quantity of zero will essentially remove the item from the cart altoghether.",
            "nickname": "modifyCartItem",
            "produces": ["*/*"],
            "consumes": ["application/json"],
            "parameters": [{
                "allowMultiple": false,
                "defaultValue": "",
                "description": "cartGUID",
                "name": "cartGUID",
                "paramType": "path",
                "type": "string",
                "required": true
            }, {
                "allowMultiple": false,
                "defaultValue": "",
                "description": "request",
                "name": "body",
                "paramType": "body",
                "type": "CartItemRequest",
                "required": false
            }],
            "responseMessages": [{
                "code": 200,
                "message": null
            }, {
                "code": 201,
                "message": "Created"
            }, {
                "code": 401,
                "message": "Unauthorized"
            }, {
                "code": 403,
                "message": "Forbidden"
            }, {
                "code": 404,
                "message": "Not Found"
            }],
            "deprecated": "false",
            "type": "void"
        }]
    }, {
        "path": "/services/latest/carts/{cartGUID}/items",
        "description": "addToCart",
        "operations": [{
            "method": "POST",
            "summary": "Adds an item to the cart identified by GUID",
            "notes": "Items are added to carts using SKUs. Currently, carts cannot contain virtual and real currency items at the same time. Furthermore, the API only support a single virtual item at the moment",
            "nickname": "addToCart",
            "produces": ["*/*"],
            "consumes": ["application/json"],
            "parameters": [{
                "allowMultiple": false,
                "defaultValue": "",
                "description": "cartGUID",
                "name": "cartGUID",
                "paramType": "path",
                "type": "string",
                "required": true
            }, {
                "allowMultiple": false,
                "defaultValue": "",
                "description": "request",
                "name": "body",
                "paramType": "body",
                "type": "CartItemRequest",
                "required": false
            }],
            "responseMessages": [{
                "code": 200,
                "message": null
            }, {
                "code": 201,
                "message": "Created"
            }, {
                "code": 401,
                "message": "Unauthorized"
            }, {
                "code": 403,
                "message": "Forbidden"
            }, {
                "code": 404,
                "message": "Not Found"
            }],
            "deprecated": "false",
            "type": "void"
        }]
    }, {
        "path": "/services/latest/carts/{cartGUID}/shippable",
        "description": "checkShippable",
        "operations": [{
            "method": "GET",
            "summary": "Returns whether a cart requires shipping",
            "notes": "checkShippable",
            "nickname": "checkShippable",
            "produces": ["*/*"],
            "consumes": ["application/json"],
            "parameters": [{
                "allowMultiple": false,
                "defaultValue": "",
                "description": "cartGUID",
                "name": "cartGUID",
                "paramType": "path",
                "type": "string",
                "required": true
            }],
            "responseMessages": [{
                "code": 200,
                "message": "OK",
                "responseModel": "CartShippableResponse"
            }, {
                "code": 401,
                "message": "Unauthorized"
            }, {
                "code": 403,
                "message": "Forbidden"
            }, {
                "code": 404,
                "message": "Not Found"
            }],
            "deprecated": "false",
            "type": "CartShippableResponse"
        }]
    }, {
        "path": "/services/latest/carts/{cartGUID}/shipping-address",
        "description": "modifyShippingAddress",
        "operations": [{
            "method": "PUT",
            "summary": "Modifies or sets the order shipping address",
            "notes": "modifyShippingAddress",
            "nickname": "modifyShippingAddress",
            "produces": ["*/*"],
            "consumes": ["application/json"],
            "parameters": [{
                "allowMultiple": false,
                "defaultValue": "",
                "description": "cartGUID",
                "name": "cartGUID",
                "paramType": "path",
                "type": "string",
                "required": true
            }, {
                "allowMultiple": false,
                "defaultValue": "",
                "description": "request",
                "name": "body",
                "paramType": "body",
                "type": "CartShippingAddressRequest",
                "required": false
            }],
            "responseMessages": [{
                "code": 200,
                "message": null
            }, {
                "code": 201,
                "message": "Created"
            }, {
                "code": 401,
                "message": "Unauthorized"
            }, {
                "code": 403,
                "message": "Forbidden"
            }, {
                "code": 404,
                "message": "Not Found"
            }],
            "deprecated": "false",
            "type": "void"
        }]
    }],
    "models": {
        "Void": {
            "description": "",
            "id": "Void",
            "properties": {}
        },
        "CartItemRequest": {
            "description": "",
            "id": "CartItemRequest",
            "properties": {
                "affiliate_key": {
                    "required": false,
                    "type": "string"
                },
                "quantity": {
                    "required": false,
                    "format": "int32",
                    "type": "integer",
                    "default": 1
                },
                "status": {
                    "required": false,
                    "type": "string"
                },
                "affiliateKey": {
                    "required": false,
                    "type": "string"
                },
                "catalog_sku_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "catalog_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                }
            }
        },
        "CartShippingAddressRequest": {
            "description": "",
            "id": "CartShippingAddressRequest",
            "properties": {
                "city": {
                    "required": false,
                    "type": "string"
                },
                "zip": {
                    "required": false,
                    "type": "string"
                },
                "email": {
                    "required": false,
                    "type": "string"
                },
                "country_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "order_notes": {
                    "required": false,
                    "type": "string"
                },
                "postal_state_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "first_name": {
                    "required": false,
                    "type": "string"
                },
                "last_name": {
                    "required": false,
                    "type": "string"
                },
                "shipping_address_line1": {
                    "required": false,
                    "type": "string"
                },
                "shipping_address_line2": {
                    "required": false,
                    "type": "string"
                },
                "name_prefix": {
                    "required": false,
                    "type": "string"
                },
                "phone_number": {
                    "required": false,
                    "type": "string"
                }
            }
        },
        "SkuRequest": {
            "description": "",
            "id": "SkuRequest",
            "properties": {
                "sku": {
                    "required": false,
                    "type": "string"
                }
            }
        },
        "DeprecatedCountry": {
            "description": "",
            "id": "DeprecatedCountry",
            "properties": {
                "crudData": {
                    "required": false,
                    "type": "object"
                },
                "id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "deleted": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "iso2": {
                    "required": false,
                    "type": "string"
                },
                "iso3": {
                    "required": false,
                    "type": "string"
                },
                "name": {
                    "required": false,
                    "type": "string"
                },
                "deleted_at": {
                    "required": false,
                    "type": "Timestamp"
                }
            }
        },
        "Timestamp": {
            "description": "",
            "id": "Timestamp",
            "properties": {
                "nanos": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "time": {
                    "required": false,
                    "format": "int64",
                    "type": "integer"
                },
                "year": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "month": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "date": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "day": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "hours": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "minutes": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "seconds": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "timezoneOffset": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                }
            }
        },
        "CreateSkusResponse": {
            "description": "",
            "id": "CreateSkusResponse",
            "properties": {
                "skus": {
                    "required": false,
                    "type": "string"
                }
            }
        },
        "NewSKURequest": {
            "description": "",
            "id": "NewSKURequest",
            "properties": {
                "quantity": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "prefix": {
                    "required": false,
                    "type": "string"
                }
            }
        },
        "InvoiceItemVIEW": {
            "description": "",
            "id": "InvoiceItemVIEW",
            "properties": {
                "crudData": {
                    "required": false,
                    "type": "object"
                },
                "id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "deleted": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "sku": {
                    "required": false,
                    "type": "string"
                },
                "qty": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "thumbnail": {
                    "required": false,
                    "type": "string"
                },
                "type_hint": {
                    "required": false,
                    "type": "string"
                },
                "sku_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "invoice_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "item_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "sku_description": {
                    "required": false,
                    "type": "string"
                },
                "system_price": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                },
                "total_price": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                },
                "unit_price": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                },
                "item_name": {
                    "required": false,
                    "type": "string"
                },
                "affiliate_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                }
            }
        },
        "InvoiceGetResponse": {
            "description": "",
            "id": "InvoiceGetResponse",
            "properties": {
                "invoices": {
                    "items": {
                        "type": "InvoiceVIEW"
                    },
                    "required": false,
                    "type": "List"
                },
                "discounts": {
                    "items": {
                        "type": "InvoiceItemVIEW"
                    },
                    "required": false,
                    "type": "List"
                },
                "items": {
                    "items": {
                        "type": "InvoiceItemVIEW"
                    },
                    "required": false,
                    "type": "List"
                }
            }
        },
        "InvoiceVIEW": {
            "description": "",
            "id": "InvoiceVIEW",
            "properties": {
                "crudData": {
                    "required": false,
                    "type": "object"
                },
                "id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "deleted": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "email": {
                    "required": false,
                    "type": "string"
                },
                "shipping": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                },
                "subtotal": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                },
                "discount": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                },
                "phone": {
                    "required": false,
                    "type": "string"
                },
                "address1": {
                    "required": false,
                    "type": "string"
                },
                "address2": {
                    "required": false,
                    "type": "string"
                },
                "currency": {
                    "required": false,
                    "type": "string"
                },
                "user_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "vendor_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "current_status": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "fed_tax": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                },
                "state_tax": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                },
                "grand_total": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                },
                "order_notes": {
                    "required": false,
                    "type": "string"
                },
                "cart_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "current_status_name": {
                    "required": false,
                    "type": "string"
                },
                "current_status_description": {
                    "required": false,
                    "type": "string"
                },
                "parent_invoice_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "city_name": {
                    "required": false,
                    "type": "string"
                },
                "country_name": {
                    "required": false,
                    "type": "string"
                },
                "postal_code": {
                    "required": false,
                    "type": "string"
                },
                "billing_address1": {
                    "required": false,
                    "type": "string"
                },
                "billing_city_name": {
                    "required": false,
                    "type": "string"
                },
                "billing_country_name": {
                    "required": false,
                    "type": "string"
                },
                "billing_state_name": {
                    "required": false,
                    "type": "string"
                },
                "billing_address2": {
                    "required": false,
                    "type": "string"
                },
                "billing_postal_code": {
                    "required": false,
                    "type": "string"
                },
                "current_fulfillment_status": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "name_prefix": {
                    "required": false,
                    "type": "string"
                },
                "state_name": {
                    "required": false,
                    "type": "string"
                },
                "phone_number": {
                    "required": false,
                    "type": "string"
                },
                "create_date": {
                    "required": false,
                    "type": "Timestamp"
                },
                "update_date": {
                    "required": false,
                    "type": "Timestamp"
                },
                "current_fulfillment_status_name": {
                    "required": false,
                    "type": "string"
                },
                "current_fulfillment_status_description": {
                    "required": false,
                    "type": "string"
                },
                "full_name": {
                    "required": false,
                    "type": "string"
                }
            }
        },
        "CartShippableResponse": {
            "description": "",
            "id": "CartShippableResponse",
            "properties": {
                "cartId": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "shippable": {
                    "required": false,
                    "type": "boolean"
                }
            }
        },
        "CartDiscountVIEW": {
            "description": "",
            "id": "CartDiscountVIEW",
            "properties": {
                "crudData": {
                    "required": false,
                    "type": "object"
                },
                "message": {
                    "required": false,
                    "type": "string"
                },
                "name": {
                    "required": false,
                    "type": "string"
                },
                "value": {
                    "required": false,
                    "type": "string"
                },
                "discount_type": {
                    "required": false,
                    "type": "string"
                },
                "is_applied": {
                    "required": false,
                    "type": "string"
                }
            }
        },
        "CartTotalAndShippingVIEW": {
            "description": "",
            "id": "CartTotalAndShippingVIEW",
            "properties": {
                "crudData": {
                    "required": false,
                    "type": "object"
                },
                "country": {
                    "required": false,
                    "type": "string"
                },
                "email": {
                    "required": false,
                    "type": "string"
                },
                "city": {
                    "required": false,
                    "type": "string"
                },
                "zip": {
                    "required": false,
                    "type": "string"
                },
                "iso2": {
                    "required": false,
                    "type": "string"
                },
                "tax": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                },
                "currency": {
                    "required": false,
                    "type": "string"
                },
                "status": {
                    "required": false,
                    "type": "string"
                },
                "error_code": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "country_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "grand_total": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                },
                "order_notes": {
                    "required": false,
                    "type": "string"
                },
                "cart_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "postal_state_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "first_name": {
                    "required": false,
                    "type": "string"
                },
                "last_name": {
                    "required": false,
                    "type": "string"
                },
                "shipping_address_line1": {
                    "required": false,
                    "type": "string"
                },
                "shipping_address_line2": {
                    "required": false,
                    "type": "string"
                },
                "error_message": {
                    "required": false,
                    "type": "string"
                },
                "system_sub_total": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                },
                "owner_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "discount_total": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                },
                "shipping_cost": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                },
                "postal_state": {
                    "required": false,
                    "type": "string"
                },
                "sub_total": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                },
                "phone_number": {
                    "required": false,
                    "type": "string"
                },
                "sub_total_after_discounts": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                },
                "state_code": {
                    "required": false,
                    "type": "string"
                }
            }
        },
        "CartGetResponse": {
            "description": "",
            "id": "CartGetResponse",
            "properties": {
                "cart": {
                    "required": false,
                    "type": "CartTotalAndShippingVIEW"
                },
                "discounts": {
                    "items": {
                        "type": "CartDiscountVIEW"
                    },
                    "required": false,
                    "type": "List"
                },
                "items": {
                    "items": {
                        "type": "CartItemVIEW"
                    },
                    "required": false,
                    "type": "List"
                },
                "shipping": {
                    "items": {
                        "type": "CartShippingOptionsVIEW"
                    },
                    "required": false,
                    "type": "List"
                }
            }
        },
        "CartShippingOptionsVIEW": {
            "description": "",
            "id": "CartShippingOptionsVIEW",
            "properties": {
                "crudData": {
                    "required": false,
                    "type": "object"
                },
                "price": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                },
                "selected": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "vendor_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "catalog_sku_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "catalog_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "cart_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "shipping_item_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "local_price": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                }
            }
        },
        "CartItemVIEW": {
            "description": "",
            "id": "CartItemVIEW",
            "properties": {
                "crudData": {
                    "required": false,
                    "type": "object"
                },
                "sku": {
                    "required": false,
                    "type": "string"
                },
                "qty": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "inventory": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "thumbnail": {
                    "required": false,
                    "type": "string"
                },
                "name": {
                    "required": false,
                    "type": "string"
                },
                "error_code": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "type_hint": {
                    "required": false,
                    "type": "string"
                },
                "vendor_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "sku_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "sku_description": {
                    "required": false,
                    "type": "string"
                },
                "catalog_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "system_price": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                },
                "total_price": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                },
                "unit_price": {
                    "required": false,
                    "format": "double",
                    "type": "number"
                },
                "cart_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "error_message": {
                    "required": false,
                    "type": "string"
                },
                "store_item_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "cart_item_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "affiliate_id": {
                    "required": false,
                    "format": "int32",
                    "type": "integer"
                },
                "item_url": {
                    "required": false,
                    "type": "string"
                },
                "stock_status": {
                    "required": false,
                    "type": "string"
                }
            }
        }
    }
};

schema.models.CartGetResponse.instanceType = CartGetResponse;
schema.models.CartGetResponse.strict = false;

module.exports = schema;