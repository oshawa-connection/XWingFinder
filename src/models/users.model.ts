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
import { Col } from 'sequelize/types/lib/utils';
import { isDate } from 'util';
import { Sequelize, GEOMETRY } from 'sequelize/types';
import { runInThisContext } from 'vm';
const uuidv1 = require('uuid/v1');
var bcrypt = require('bcrypt');

export interface IXWingUser {
    
}

@Table
export class User extends Model<User> implements IXWingUser {

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
    static encryptPassword(instance: User) {
       const salt = bcrypt.genSaltSync(12)
       instance.Password = bcrypt.hashSync(instance.Password,salt)
    }
 
    static validPassword(argPassword : string, instance: User) {
       return bcrypt.compareSync(argPassword,instance.Password);
    }

    @Default(uuidv1)
    @AllowNull(false)
    @Unique
    @Column({ type : DataType.UUID, primaryKey: true, unique: true  })
    UserID: string;

    @Column({type:DataType.GEOMETRY})
    Location : object;

    @IsEmail
    @Column
    Email : string;
    
    @Length({min:5,max:50})
    @Column({ allowNull:false })
    Password : string;

    @Column({type:DataType.ARRAY(DataType.INTEGER)})
    VersionsPlayed?:Array<number>

    @Column({type:DataType.ARRAY(DataType.STRING)})
    ForcesPlayed?: Array<string>

    @Length({min:4,max:500})
    @Column
    Description?:string;

    @Column
    Rating?:string;

    @Column({type:DataType.BLOB})
    ProfilePicture?: string;

    @CreatedAt
    @Column
    CreatedAt? : Date

    @UpdatedAt
    @Column
    UpdatedAt?: Date;

}
