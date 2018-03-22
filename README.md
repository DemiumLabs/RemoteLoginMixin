# RemoteLoginMixin

  
**Requeriments npm packages**

  

	object-encrypter

	geerate-password

  

**How to**

  

1) copy mixin file to mixins directory /common/mixin in your loopback project

  
2) add this config in json model definition into mixins section to activate mixin in model

	
	    "mixins": {
		    ...,
		    "RemoteLogin": {
			    "findOrCreate": true,
			    "secret": "yourOwnSecretPassphrase"
		    }
	    }

  
  
**token building in remote Model example**

  

	module.exports = function(Shipper) {
		var encrypter = require('object-encrypter');
		var engine = encrypter('yourOwnSecretPassphrase', {ttl: true});

	  

			Shipper.prototype.remoteToken = function(cb){
					let data = {
						"username":this.bussinessName, //mandatory
						"email": this.email, //mandatory
						"externalId":this.id //mandatory
						"companyName":this.bussinesName, // example
						"contactName":this.contactName, // example
						"phoneNumber":this.phoneNumber // example
					};

					let token = engine.encrypt(data, 36000000000); // generated string will live in mili seconds

					cb(null,token);
			}
	}