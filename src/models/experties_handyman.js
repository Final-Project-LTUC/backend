
const expertise_handyman = (sequelize, DataTypes) => {
    const model = sequelize.define("expertise_handyman", {
        HandymanId:{
            type:DataTypes.INTEGER,
            required:true
        },
        ExpertyId:{
            type:DataTypes.INTEGER,
            required:true,
        }
    })
    return model;
};
module.exports=expertise_handyman