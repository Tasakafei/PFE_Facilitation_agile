/**
 * Created by user on 24/11/16.
 */

var chai = require('chai');
var expect = chai.expect;

var config = require('../configurations/database');

describe('This is an empty test suite', function(){
    describe('This is an empty section test',function(){
        it('should be ok because it is empty',function(){
            console.log(config.db);
            if(process.env.NODE_ENV === "test") console.log("TEST ENV DEFINED");
            else console.log("PRODUCTION ENV DEFINED");
            expect(true).to.be.true;
        });
    });
});