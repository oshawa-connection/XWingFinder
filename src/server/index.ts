import express from "express"
import { Request, Response, NextFunction } from "express";
import { sequelizeFactory } from "./database";
import { usersRouter } from "../routes/users.router"


export const sequelize = sequelizeFactory("development");

const fs = require('fs');
const spawn = require("child_process").spawn;
const bodyParser = require('body-parser');
const port = 3002;
export const server = express();
const hostname = "localhost"
console.log(__dirname +"/../views/")
server.use("/views",express.static(__dirname +"/../views/"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.set('view engine', 'ejs');

server.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS,   PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the   requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', "false");
    // Pass to next layer of middleware
    next();
  });

server.get("/",async (req:Request,res:Response) => {
  res.send("hello")
})

server.use("/users", usersRouter)

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

