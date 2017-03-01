/*
 /!**
 * Created by user on 25/01/17.
 *!/
 'use strict';

 var app = angular.module('facilitation', ['ngResource', 'cloudinary']);

 app.factory('album', ['$rootScope', '$resource', 'cloudinary',
 function($rootScope, $resource, cloudinary){
 // instead of maintaining the list of images, we rely on the 'myphotoalbum' tag
 // and simply retrieve a list of all images with that tag.
 var url = cloudinary.url('myphotoalbum', {format: 'json', type: 'list'});
 //cache bust
 url = url + "?" + Math.ceil(new Date().getTime()/1000);
 return $resource(url, {}, {
 photos: {method:'GET', isArray:false}
 });
 }]);*/
