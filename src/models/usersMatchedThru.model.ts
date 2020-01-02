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

const uuidv1 = require('uuid/v1');
var bcrypt = require('bcrypt');

export interface IMatchUserThru {
    
}


@Table
export class MatchUserThru extends Model<MatchUserThru> implements IMatchUserThru {

    @Default(uuidv1)
    @AllowNull(false)
    @Unique
    @Column({ type : DataType.UUIDV1, primaryKey: true, unique: true  })
    PK: string;

    @Default(uuidv1)
    @AllowNull(false)
    @Unique
    @Column({type:DataType.UUIDV1})
    UserID : string;

    @Default(uuidv1)
    @AllowNull(false)
    @Unique
    @Column({type:DataType.UUIDV1})
    MatchID : string;


    @CreatedAt
    @Column
    CreatedAt? : Date

    @UpdatedAt
    @Column
    UpdatedAt?: Date;

}
