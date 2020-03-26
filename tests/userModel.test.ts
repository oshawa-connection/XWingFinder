import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from "../src/server/index";
import { sequelize } from "../src/server/database";
import { IXWingUser, xWingUser } from '../src/models/xWingUser.model'
process.env['testOrProdEnv'] = 'testing';


chai.should();

before(async function() {
    
    sequelize
    
    //await db.clear();
    //await db.save([tobi, loki, jane]);
});

beforeEach(async function() {
    await sequelize.sync({force:true})
})

describe("User model",async function() {
    it("should allow new user to be created", async function(done) {
        
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
        console.log(dbResponse);
        done()
    })
})


after(async function() {
    await sequelize.drop()
})


afterEach(async function() {
    await sequelize.drop()
})

