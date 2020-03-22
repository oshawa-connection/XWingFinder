import { Table, 
    Column,
     Model, 
     PrimaryKey, 
     AutoIncrement, 
     Default, 
     ForeignKey, 
     BelongsTo, 
     AllowNull, 
     Unique, 
     IsDate, 
     IsBefore, 
     IsAfter, 
     Max, 
     Min, 
     CreatedAt, 
     UpdatedAt, 
     Length,
     BelongsToMany,
     IsEmail,
     BeforeCreate} from 'sequelize-typescript';
import {DataType} from 'sequelize-typescript';
import { Sequelize, GEOMETRY } from 'sequelize/types';
import { modelInterface, geoJSON } from '../../types/types'
const uuidv1 = require('uuid/v1');
var bcrypt = require('bcrypt');


type XWingVersions = 1 | 2;
type XWingForces = "Empire" | "Rebellion" | "Scum and Villany" | "First Order" | "The Resistance" | "Republic" | "Seperatists";

export type IXWingUser = modelInterface<xWingUser>;

@Table
export class xWingUser extends Model<xWingUser> {

    static formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }

    @BeforeCreate
    static encryptPassword(instance: xWingUser) {
       const salt = bcrypt.genSaltSync(12)
       instance.password = bcrypt.hashSync(instance.password,salt)
    }
 
    static validPassword(argPassword : string, instance: xWingUser) {
       return bcrypt.compareSync(argPassword,instance.password);
    }

    @BeforeCreate
    static scrambleLocation(instance: xWingUser) {
        if (instance.location.coordinates.length !== 2 || instance.location.type !== "point") throw Error("Coordinates don't look to be points.")
        
        let r = Math.floor(Math.random() * 50 + 50) / 111300; //convert to degrees
        let u = Math.random();
        let w = r * Math.sqrt(u);
        let t = 2 * Math.PI * Math.random();
        let x = w * Math.cos(t);
        let y = w * Math.sin(t);
        
        x = x / Math.cos(instance.location.coordinates[1]); //account for error of curved earth
    
        instance.location.coordinates[0] = instance.location.coordinates[0] + x;
        instance.location.coordinates[1] = instance.location.coordinates[1] + y;
        //console.log(instance.location.coordinates)
    }

    

    @Default(uuidv1)
    @AllowNull(false)
    @Unique
    @Column({ type : DataType.UUID, primaryKey: true, unique: true  })
    userID?: string;

    @AllowNull(false)
    @Column
    userName: string;

    @Column({type:DataType.GEOMETRY("POINT",4326)})
    location? : geoJSON;

    @IsEmail
    @Column
    email : string;
    
    @Length({min:5,max:50})
    @Column({ allowNull:false })
    password : string;

    @Column({type:DataType.ARRAY(DataType.INTEGER)})
    versionsPlayed:Array<XWingVersions>;

    @Column({type:DataType.ARRAY(DataType.STRING)})
    forcesPlayed: Array<XWingForces>;

    @Default(true)
    @Column
    okWithProxies? : boolean;

    @Length({min:4,max:500})
    @Column
    description?:string;

    @Default(0)
    @Column
    rating?:number;

    @Column({type:DataType.BLOB})
    profilePicture?: string;

    @CreatedAt
    @Column
    createdAt? : Date;

    @UpdatedAt
    @Column
    updatedAt?: Date;

}
