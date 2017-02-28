/**
 * Created by user on 24/11/16.
 */

var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
var config = require('../configurations/database');
mongoose.connect(config.db);

require('../model/account/schemas/user');
require('../model/instances/schemas/workshop-instance.schema');
require('../model/catalogue/schemas/workshop');
var catalogueController = require("../controllers/catalogue");
var catalogue = require("../model/catalogue/catalogue.js");

describe('Test catalogue ', function(){
    describe('In an empty database',function(){
        afterEach(function () {
            mongoose.model("Workshop").collection.drop();
        });

        it('should get no workshop and return an empty list',function(){
            return catalogue.getWorkshops().then(function (result) {
                expect(result).not.to.be.undefined;
                expect(result).to.be.empty;
            },function (error) {
                expect.fail();
            });
        });

        it('should get not workshop by id and return an error',function(){
            return catalogue.getWorkshop("unknownId").then(function (result) {
                expect.fail();
            },function (error) {
                expect(error).not.to.be.undefined;
            });
        });

        it('should saves and then contains the workshop with the title "TestWorkshop"', function () {
            var workshop = {title:"TestWorkshop"};
            return catalogue.saveWorkshop(workshop).then(function (result) {
                expect(result).not.to.be.undefined;
                expect(result.title).to.equal(workshop.title);
            },function (error) {
                expect.fail();
            });
        });

        it('should not delete any workshop and return an error', function () {
            return catalogue.deleteWorkshop("unknownId").then(function (result) {
                expect.fail();
            },function (error) {
                expect(error).not.to.be.undefined;
            });
        });
    });
});