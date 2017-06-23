/**
 * Created by eliot on 6/24/15.
 */


/**
 * Created by eliot on 6/24/15.
 */

'use strict';
var should = require('should');
var Q = require('q'),
    ModelTools = require("../lib/ModelTools"),
    _ = require('lodash')
    , swagger = require("./fixtures/Swagger")
    ;


describe('Schema Tests', function () {
    var simpleConfig = {
        models: {
            "Book": {
                id: "Book",
                description: "",
                strict: false,
                properties: {
                    name: {type: "string", required: true},
                    pages: {type: "integer", default: 220},
                    primaryAuthor: {type: "Author", required: true},
                    authors: {type: "List", "items": {type: "Author"}}
                }
            },
            "Author": {
                id: "Author",
                description: "",
                properties: {
                    first_name: {type: "string"},
                    last_name: {type: "string"},
                    alive: {type: "boolean", default: true}
                }
            }
        }
    };
    var mainConfig = swagger.carts;


    //it.skip('should create new Schemas', function (done) {
    //    var cfg = _.extend({}, simpleConfig);
    //
    //    var schemas = new ModelTools.SchemaModels(cfg);
    //    var exampleData = {};
    //    var types = schemas.getInstanceTypes(ModelTools.SchemaModels.INSTANCE_TYPE_KEYS.BOTH);
    //    var c = schemas.getInstance('Book', {
    //        name: "cool",
    //        color: "blue",
    //        primaryAuthor: {first_name: 'jon', 'last_name': 'do', alive: false},
    //        authors: [{first_name: 'jon', 'last_name': 'do', alive: false}, {
    //            first_name: 'tom',
    //            'last_name': 'cool',
    //            alive: true
    //        }]
    //    });
    //    c.should.have.property('color', 'blue');
    //    c.should.have.property('authors');
    //    c.should.have.property('primaryAuthor');
    //    c.primaryAuthor.should.be.instanceof(types.Author);
    //    c.should.have.property('pages', cfg.models.Book.properties.pages.default);
    //    done();
    //});

    it('should work with swagger', function (done) {
        var cfg = _.extend({}, mainConfig);

        var schemas = new ModelTools.SchemaModels(cfg);
        var exampleData = {};
        var sampleCart = {
            "cart": {
                "phone_number": null,
                "shipping_address_line2": null,
                "shipping_cost": 0,
                "shipping_address_line1": null,
                "currency": "USD",
                "city": null,
                "first_name": "Eliot",
                "cart_id": 720,
                "postal_state_id": null,
                "error_message": "",
                "iso2": null,
                "grand_total": null,
                "zip": null,
                "state_code": null,
                "status": "active",
                "sub_total_after_discounts": null,
                "sub_total": null,
                "country_id": null,
                "error_code": 0,
                "system_sub_total": null,
                "discount_total": 0,
                "country": null,
                "tax": 0,
                "order_notes": null,
                "email": "foo@goo.com",
                "owner_id": null,
                "last_name": null,
                "postal_state": null
            },
            "discounts": [],
            "items": [],
            "shipping": []
        };

        var cartResult = schemas.getInstance('CartGetResponse', sampleCart);
        cartResult.should.have.property('cart');
        (schemas.isA(cartResult.cart, 'CartTotalAndShippingVIEW')).should.be.true;
        cartResult.cart.should.have.property('status', 'active');
        cartResult.cart.should.have.property('first_name', 'Eliot');
        done();
    })
});
