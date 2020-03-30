import { Router } from 'express';
import { xWingUser, IXWingUser } from '../models/xWingUser.model';
import { Request, Response, NextFunction } from "express";
import { sequelize } from '../server/index';
import { buildBasicGeoJSONFromLatLong } from '../helperMethods/geographicFunctions';

export const xWingUserRouter = Router();

xWingUserRouter.get('/', (req :Request, res : Response) => {
  xWingUser
    .findAll()
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send()
    })
});

xWingUserRouter.get('/geoJson', (req:Request, res:Response) => {
  sequelize.query(`
  select json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(ST_AsGeoJSON(t.*)::json)
    )
    from (
      SELECT "userName", "forcesPlayed", location FROM "xWingUser"
    
    ) as t(userName, forcesPlayed, location);
  ` ).then((data : any) => {
      console.log("raw result")
      console.log(data)
      console.log("filtered result")
      console.log(data[0][0]["json_build_object"])
      res.json(data[0][0]["json_build_object"]).send()
  })
})

xWingUserRouter.post('/newUser',(req:Request,res:Response) => {
  let newUserData : IXWingUser = {
    userName:req.body.userName,
    password:req.body.password,
    forcesPlayed:req.body.forcesPlayed,
    location : buildBasicGeoJSONFromLatLong(req.body.latitude,req.body.longitude),

  }

  let newUser = new xWingUser(newUserData)
  
  newUser.validate().then( (message:any) => {
    console.log('message')
    res.status(200).send("hello dave");
  })
  .catch((error) => {
    console.error(error)
    res.status(501).send("You done messed it up");
  })

  
  
})