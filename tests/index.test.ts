//https://www.npmjs.com/package/chai-http

import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from "../src/server/index";
import { sequelize } from "../src/server/database";
import { IXWingUser, xWingUser } from '../src/models/xWingUser.model'
process.env['testOrProdEnv'] = 'testing';

// Configure chai
chai.use(chaiHttp);
chai.should();

const requester = chai.request(server).keepOpen()

before(async function() {
    
    sequelize
    console.log("DATABASE INITIALISED")

});


describe("Base server", function() {
    it("should return hello", function (done) {
        chai.request(server)
        .get('/')
        .end(function (err,res) {
            res.should.have.status(200)
            res.text.should.equal("hello")
            done()
        })
    })
});

    
after(function() {
    requester.close()
    
    process.exit(0)
})

