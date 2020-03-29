import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from "../src/server/index";
import { sequelizeFactory } from "../src/server/database";
import { IXWingUser, xWingUser } from '../src/models/xWingUser.model'
process.env['testOn'] = 'testing';

const sequelize = sequelizeFactory()

chai.should();

before(async function() {

});

beforeEach(async function() {
    await sequelize.sync({force:true})
})

describe("User model",async function() {
    it("should allow new user to be created", async function() {
        
        let newUser : IXWingUser
        newUser = {
            userName:"James Fleming",
            password:"testing",
            versionsPlayed:[1,2],
            forcesPlayed:["Seperatists","Rebellion"],
            okWithProxies:false,
            description:"THis is a test user",
            email:"james@test.com",
            location:{"type":"point","coordinates":[2,52],"crs":{"type":"name","properties":{"name":"EPSG:4326"}}}
        }
        
        let dbResponse = await xWingUser.create(newUser);
        //console.log(typeof(dbResponse))
        dbResponse.should.be.an("object","the response from the db is not an object");
        var x = 1
        x.should.be.equal(1)
        
    });

    // it("should allow selection", async function(done) {
        
    //     done()
    // })
})


after(async function() {
    await sequelize.drop()
})


afterEach(async function() {
    await sequelize.sync({force:true});
})

