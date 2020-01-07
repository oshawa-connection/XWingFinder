import { IXWingUser, User } from '../src/models/users.model'
import { sequelize } from '../src/server/database'
import { geoJSON } from '../types/types'




(async () =>  {
    await sequelize.sync({force:true})
    
    var newUserArray: Array<IXWingUser> = [
        {UserName:"JamesFlem",VersionsPlayed:[1,2],Password:"football123",ForcesPlayed:["Empire","Rebellion"],OkWithProxies:true,Description:"A cool guy",Email:"jamesFleming@gmail.com",Location:{"type":"point","coordinates":[0,0],"crs":{"type":"name","properties":{"name":"EPSG:4326"}}}},
        {UserName:"GiuliaFed",VersionsPlayed:[1,2],Password:"CFDIsNice",ForcesPlayed:["Scum and Villany","Rebellion"],OkWithProxies:true,Description:"I like star wars",Email:"gFed@gmail.com",Location:{"type":"point","coordinates":[2,52],"crs":{"type":"name","properties":{"name":"EPSG:4326"}}}},

    ]

    await User.bulkCreate(newUserArray,{individualHooks:true,validate:true});


    
})()