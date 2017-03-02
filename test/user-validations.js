var request = require('supertest');
var expect = require('chai').expect;
var bcrypt = require("bcryptjs");
var db = require('../db');
var users = require("../data/users");

var passwordHashed = bcrypt.hashSync("thisisapassword");

var EventEmitter = require("events").EventEmitter;
function prepareFakeDB(onRequest) {
    db.setFakeFactory(function fakeDBFactory() {
        var fake = new EventEmitter();
        process.nextTick(function() {
            fake.emit("connect");
        });
        fake.execSql = function(req) {
            onRequest(req);
        };
        return fake;
    });
}


describe('validating username and password', function(){
    it("should return ok if username and password match", function(done) {
        prepareFakeDB(function(req) {
            req.callback(null, 1);
            req.emit("row", {pwd:{value: passwordHashed}});
        });

        users.checkUsernameAndPassword("abc", "thisisapassword", function(err, result) {
            expect(err).to.be.null;
            expect(result).to.be.true;
            done();
        });
    });
    it("should return false if username not found", function(done) {
        prepareFakeDB(function(req) {
            req.callback(null, 0);
        });

        users.checkUsernameAndPassword("abc", "thisisapassword", function(err, result) {
            expect(err).to.be.null;
            expect(result).to.be.false;
            done();
        });
    });
    it("should return false if password is wrong", function(done) {
        prepareFakeDB(function(req) {
            req.callback(null, 1);
            req.emit("row", {pwd:{value: "nottherighthash"}});
        });

        users.checkUsernameAndPassword("abc", "thisisapassword", function(err, result) {
            expect(err).to.be.null;
            expect(result).to.be.false;
            done();
        });
    });
    it("should error if DB query errors", function(done) {
        prepareFakeDB(function(req) {
            req.callback(new Error("I don't like your face"));
        });

        users.checkUsernameAndPassword("abc", "thisisapassword", function(err, result) {
            expect(err).to.be.an("error");
            done();
        });
    });
});
