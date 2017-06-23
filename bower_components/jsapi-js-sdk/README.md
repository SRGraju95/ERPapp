# JSAPI NodeJS SDK #

## Usage

### Configuration

    var jsapi = require('jsapi-js-sdk');

    jsapi.setConfig({
        "url": "http://localhost:8080",
        "clientId":  "test",
        "clientSecret": "test"
    });
                
### Acquire Authorization Token

    jsapi.auth.userAuth(username, password).done(function(token){
        // Get a Client tied to this token
   
        var client = jsapi.client(token);
    
        client.Services.User.getInfo().done(function(userInfo){
        console.log("USER INFO: " , userInfo);
    })
    
#### Create a cart while adding an item
    
    var CartService = client.Services.Cart;
    CartService.createAndAddItem({catalog_sku_id: 1, quantity: 1, catalog_id: 1}).done(function(result){
        result.should.be.type('object');
        result.should.have.property('guid');
        // Cart object has a .guid
        // Cart object can be passed to cart functions
        CartService.checkout(result).then(function(invoice){
            invoice.should.be.type('object');
        })
        }, function(err) {});
    });

## Testing
 To run the test suite you will need a working JSAPI and valid credentials that can do password and client_credentials grant types
 
`JSAPI_URL="http://some.jsapiurl.com:8080" JSAPI_CLIENT="yourclient" JSAPI_SECRET="yourSecret" mocha test/*.spec.js`

    TEST_USERID=110 //The userId(s) with a registered phone number in jsapi and the twilio account
    TWILIO_NUMBER="Some number" //If text.out_number is set, No need to set the configuration. Otherwise, set it to the from number associated to the twilio account.


## Contributing

- Commit your changes to `master`
- Tag your release, `npm tag vX.X.X`
- Push your tags: `git push origin master --tags`
- Publish your release: `npm publish`