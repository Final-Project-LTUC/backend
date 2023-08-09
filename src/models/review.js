const review=(sequelize,DataTypes)=>{
    const model=sequelize.define('review',{
       ratingForUser:{
        type:DataTypes.INTEGER,
       },
       ratingForHandyman:{
        type:DataTypes.INTEGER,
       },
    });
    return model;
};

module.exports=review;

