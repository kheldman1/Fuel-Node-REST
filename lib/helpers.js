'use strict';

var url = require( 'url' );

module.exports = {
	check401header: function( res ) {
		var is401                 = res.statusCode === 401;
		var isFailureFromBadToken = /^Bearer\s.+?invalid_token/.test( res.headers[ 'www-authenticate' ] );

		return is401 && isFailureFromBadToken;
	}
	, deliverResponse: function( type, data, callback, errorFrom ) {

		// if it's an error and we have where it occured, let's tack it on
		if( type === 'error' ) {

			if( !!errorFrom ) {
				data.errorPropagatedFrom = errorFrom;
			}

			callback( data, null );

		} else if( type === 'response' ) {

			callback( null, data );

		}
	}
	, resolveUri: function( origin, uri ) {
		if( !/^http/.test( uri ) ) {
			uri = url.resolve( origin, uri );
		}
		return uri;
	}
};
