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
     BeforeCreate,
     HasMany} from 'sequelize-typescript';
import {DataType} from 'sequelize-typescript';
import { Col } from 'sequelize/types/lib/utils';
import { isDate } from 'util';
import { Sequelize, GEOMETRY, DataTypes } from 'sequelize/types';
import { runInThisContext } from 'vm';
import { xWingUser } from './xWingUser.model';
const uuidv1 = require('uuid/v1');
var bcrypt = require('bcrypt');

export interface IMatch {
    
}


@Table
export class chatMatch extends Model<chatMatch> implements IMatch {

    // @Default(uuidv1)
    // @AllowNull(false)
    // @Unique
    // @Column({ type : DataType.UUID, primaryKey: true, unique: true  })
    // MatchID: string;

    // @Column({type:DataType.GEOMETRY})
    // Location : object;

    // @BelongsToMany(()=> xWingUser, () => )
    // Employees? :Array<CarnellEmployee>;
    
    // @Column
    // Password : string;

    // @Column
    // VersionsPlayed?:Array<number>

    // @Column
    // ForcesPlayed?: Array<string>

    // @Length({min:4,max:500})
    // @Column
    // Description?:string;

    // @Column
    // Rating?:string;

    // @Column({type:DataType.BLOB})
    // ProfilePicture?: string;

    // @CreatedAt
    // @Column
    // CreatedAt? : Date

    // @UpdatedAt
    // @Column
    // UpdatedAt?: Date;

}
