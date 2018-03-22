# RemoteLoginMixin

Requeriments npm packages

    object-encrypter
    geerate-password

How to

1)  copy mixin file to mixins directory /common/mixin in your loopback project

2)  add this config in json model definition into mixins section to activate mixin in model
´´´
  "mixins": {
    ...,  
    "RemoteLogin": {
      "findOrCreate": true,
      "secret": "yourOwnSecretPassphrase"
    }
  }
´´´