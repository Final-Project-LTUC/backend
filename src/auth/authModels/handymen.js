'use strict'
const handymenModel=(sequelize,DataTypes)=>{
    const model=sequelize.define('Handymen',{
        firstName:{
            type:DataTypes.STRING,
            required:true,
        },
        lastName:{
            type:DataTypes.STRING,
            required:true,
        },
        age:{
            type:DataTypes.INTEGER,
            required:true,
        },
        email:{
            type:DataTypes.STRING,
            required:true,
        },
        phoneNumber:{
            type:DataTypes.INTEGER,
            required:true
        },
        yearsOfExperience:{
            type:DataTypes.NUMBER,
            required:false,
            defaultValue:1
        },
        hourlyRate:{
            type:DataTypes.NUMBER,
            required:true,

        },
        location:{////still
        },
        rating:{
            type:DataTypes.NUMBER,
            required:false,
            default:5
        },
        description:{
            type:DataTypes.STRING,
            required:false,
            default:''
        },
        profileImgLink:{///still needs work 

        },
        languages:{
            type:DataTypes.STRING,
            required:false,
            default:'Arabic'
        }
    })
    return model;
};
module.exports=handymenModel;