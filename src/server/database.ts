var fs = require('fs');
var path = require('path');
import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/users.model';

var basename = path.basename(__filename);
const environment : string = process.env.testOrProdEnv || "development";
console.log(environment);
var config = require(__dirname + '/../../database.config.json')[environment];

console.log(config);
var db = <any>{};

export const sequelize = new Sequelize({
  database: config.database,
  dialect: config.dialect,
  username: config.username,
  password: config.password,
  host: config.host,
  port: config.port,
  define: {
    schema: config.schema,
    freezeTableName: true,
    timestamps: true,
  }
});

sequelize.authenticate().then(() => {
  console.log('connection successful.')
})
  .catch((err) => {
    console.log(err);
  })

// sequelize.addModels([__dirname + '/**/*.model.ts']);

sequelize.addModels([User]);
