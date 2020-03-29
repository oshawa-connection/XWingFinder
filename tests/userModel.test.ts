import chai from 'chai';
chai.should();
import chaiHttp from 'chai-http';
import { server } from "../src/server/index";
import { sequelizeFactory } from "../src/server/database";
import { IXWingUser, xWingUser } from '../src/models/xWingUser.model'


const bulkData :Array<xWingUser> = require("./testdata.json")["bulkData"]

const sequelize = sequelizeFactory()

 

before(async function() {

});

beforeEach(async function() {
    await sequelize.sync({force:true});
    xWingUser.bulkCreate(bulkData,{individualHooks:true,validate:true});
    
})

describe("User model",async function() {
    it("should allow new user to be created", async function() {
        
        let newUser : IXWingUser
        newUser = {
            userName:"Aaron Anderson",
            password:"testing",
            versionsPlayed:[1,2],
            forcesPlayed:["Seperatists","Empire"],
            okWithProxies:false,
            description:"THis is another test user",
            email:"aaronA@test.com",
            location:{"type":"point","coordinates":[2,51],"crs":{"type":"name","properties":{"name":"EPSG:4326"}}}
        }
        
        let dbResponse = await xWingUser.create(newUser);
        
        dbResponse.should.be.an("object","the response from the db is not an object");        
    });

    it("should allow selection", async function() {

        let users = await xWingUser.findAll()
        users.should.have.length(2)

    })

})


after(async function() {
    await sequelize.drop()
})


afterEach(async function() {
    await sequelize.sync({force:true});
})

