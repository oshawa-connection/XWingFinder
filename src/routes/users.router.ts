import { Router } from 'express';
import { xWingUser } from '../models/xWingUser.model';
import { Request, Response, NextFunction } from "express";
import { sequelize } from '../server/index';

export const usersRouter = Router();

usersRouter.get('/', (req :Request, res : Response) => {
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

usersRouter.get('/geoJson', (req:Request, res:Response) => {
  sequelize.query(`
  select json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(ST_AsGeoJSON(t.*)::json)
    )
    from (
      SELECT "userName", "forcesPlayed", location FROM "xWingUser"
    
    ) as t(userName, forcesPlayed, location);
  ` ).then(data => {
      console.log("raw result")
      console.log(data)
      console.log("filtered result")
      console.log(data[0][0]["json_build_object"])
      res.json(data[0][0]["json_build_object"]).send()
  })
})

