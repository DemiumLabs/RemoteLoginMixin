// Copyright DemiumLabs.
// Author: @davidpestana
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';

module.exports = function(Model, options) {
    let encrypter = require('object-encrypter');
    let engine = encrypter(options.secret, {ttl: true});
    let generator = require('generate-password');


    Model.remoteLogin = function(token,cb){
        let data = engine.decrypt(decodeURIComponent(token));
             if(data){
                 if(options.findOrCreate){
                    //@Todo data y where
                    let promise = Model.findOrCreate()
                 }else{
                    let promise = Model.find({where: {username: data.username}, limit: 1})
                 }

                 promise.then((instances)=>{
                     if(instances.length){
                         let instance = instances[0];
                         instance.createAccessToken().then((accessToken => cb(null,accessToken)));
                     }else{
                        let err = new Error('user not valid');
                        err.statusCode = 402;
                        cb(err);
                     }
                 })
            }else{
                let err = new Error('token not valid');
                err.statusCode = 401;
                cb(err);
            }    
    }

    Model.remoteMethod('remoteLogin', {
        isStatic: true,
        http: {path: '/remoteLogin', verb: 'post'},
        accepts: [{arg: 'token', type:'string'}],
        returns: {arg: 'accessToken', type: 'AccessToken'},
        description: "return accessToken"
    });


};