import { IXWingUser, xWingUser } from '../src/models/xWingUser.model'
import { sequelizeFactory } from "../src/server/database";
import { geoJSON } from '../types/types'
const sequelize = sequelizeFactory("development");



(async () =>  {

    await sequelize.sync({force:true})
    
    var newUserArray: Array<IXWingUser> = [
        {userName:"JamesFlem",versionsPlayed:[1,2],password:"football123",forcesPlayed:["Empire","Rebellion"],okWithProxies:true,description:"A cool guy",email:"jamesFleming@gmail.com",location:{"type":"point","coordinates":[0,0],"crs":{"type":"name","properties":{"name":"EPSG:4326"}}}},
        {userName:"GiuliaFed",versionsPlayed:[1,2],password:"CFDIsNice",forcesPlayed:["Scum and Villany","Rebellion"],okWithProxies:true,description:"I like star wars",email:"gFed@gmail.com",location:{"type":"point","coordinates":[2,52],"crs":{"type":"name","properties":{"name":"EPSG:4326"}}}},

    ]

    await xWingUser.bulkCreate(newUserArray,{individualHooks:true,validate:true});


    
})()