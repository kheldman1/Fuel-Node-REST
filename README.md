Fuel REST Client (for Node.js) [![Build Status](https://travis-ci.org/ExactTarget/Fuel-Node-REST.svg?branch=master)](https://travis-ci.org/ExactTarget/Fuel-Node-REST)
=============

This library allows users access to ExactTarget's REST API at a low level.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)


```
npm install fuel-rest --save
```

## Initialization

**new FuelRest( options )** - Initialization

* `options.auth`
    * Required: yes
    * Type: `Object` or [FuelAuth Instance][1]
    * properties need to match [FuelAuth][1]
* `options.origin` or `options.restEndpoint`
    * Required: no
    * Type: `String`
    * Default: https://www.exacttargetapis.com
* `options.headers`
    * Required: no
    * Type: `Object`
    * set headers that apply to all REST requests (not auth requests)

## API

* **apiRequest( options, callback )**
    * `options` - [see request modules options][3]
    * `options.auth` - will be passed into [getAccessToken][4] inside Fuel Auth
    * `options.uri` - can either be a full url or a path that is appended to `options.origin` used at initialization ([url.resolve][2])
    * `options.retry` - boolean value representing whether or not to retry request (and request new token) on 401 invalid token response. `default: false`
    * `callback` - executed after task is completed. **required**
* **get | post | put | patch | delete( options, callback )**
    * `options` - see apiRequest options
    * `options.retry` - see above for description. `default: true`
    * `callback` - see apiRequest options
    * Request method will be overwritten by these methods. It will be set to same value as the name of the method used

## Setting up the client

```js
var FuelRest = require( 'fuel-rest' );
var options  = {
    auth: {
        // options you want passed when Fuel Auth is initialized
        clientId: 'clientId'
        , clientSecret: 'clientSecret'
    }
    , origin: 'https://alternate.rest.endpoint.com' // default --> https://www.exacttargetapis.com
};

var RestClient = new FuelRest( options );
```


## Examples

```js
var options = {
    uri: '/platform/v1/endpoints',
    headers: {}
    // other request options
};

RestClient.get( options, function( err, response ) {
    if( err ) {
        // error here
        console.log( err );
    }

    // will be delivered with 200, 400, 401, 500, etc status codes
    // response.body === payload from response
    // response.res === full response from request client
    console.log( response );
});
```

## Contributors

* Alex Vernacchia (author) - [twitter](https://twitter.com/vernacchia), [github](https://github.com/vernak2539)
* Kelly Andrews - [twitter](https://twitter.com/kellyjandrews), [github](https://github.com/kellyjandrews)
* David Brainer-Banker - [twitter](https://twitter.com/TweetTypography), [github](https://github.com/tweettypography)

## Contributing

We welcome all contributions and issues! There's only one way to make this better, and that's by using it. If you would like to contribute, please checkout our [guidelines](https://github.com/ExactTarget/Fuel-Node-REST/wiki/Contributing)!

## ChangeLog

* **See tags/release page for release notes after 0.7.2**
* **0.7.2** - 2014-10-16 - account for content-type header not being present on API response
* **0.7.1** - 2014-09-09 - removed unneeded "!!"
* **0.7.0** - 2014-08-29 (public release, 1st npm version)
    * request retry on 401 invalid token response
    * created helpers file for certain functions
    * updated error delivering/throwing
* **0.6.0** - 2014-08-26 - added patch method
* **0.5.0** - 2014-08-26 - API overhaul (apiRequest + all http methods) - *breaking*
* **0.4.0** - 2014-08-25 - changed object initialization - *breaking*
* **0.3.0** - 2014-08-20
    * added ability to use initialized fuel auth
    * updated travis ci config
    * added license
* **0.2.0** - 2014-08-09 - removed event emitter - *breaking*
* **0.1.0** - 2014-08-07
    * initial module
    * initial unit tests

[1]: https://github.com/ExactTarget/Fuel-Node-Auth#initialization
[2]: http://nodejs.org/api/url.html#url_url_resolve_from_to
[3]: https://github.com/mikeal/request#requestoptions-callback
[4]: https://github.com/ExactTarget/Fuel-Node-Auth#api
