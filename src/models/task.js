const task = (sequelize, DataTypes) => {
    const model = sequelize.define("Task", {
        title: {
            type: DataTypes.STRING,
            required: true,
        },

        description: {
            type: DataTypes.STRING,
            required: true,
        },
        clientName: {
            type: DataTypes.STRING,
            required: true,
        },
        dateOfReq: {
            type: DataTypes.STRING,
            required: true,
        },
        interval: {
            type: DataTypes.STRING,
            required: false,
            defaultValue: "5000",
        },
        phoneNumber: {
            type: DataTypes.BIGINT,
            required: true,
        },
        clientLat: {
            type: DataTypes.STRING,
            required: true,
        },
        clientLong: {
            type: DataTypes.STRING,
            required: true,
        },
        cityOfClient: {
            type: DataTypes.STRING,
            required: false,
            default: "amman",
        },
        handymanId: {
            type: DataTypes.UUID,
            references: {
                model: "Handymans", // Correct the table name to match your schema
                key: "id",
            },
        },
        imageUrl: {
            type: DataTypes.STRING, // Assuming you store image URLs as strings
            required: false, // Make it optional if you want
        },

        clientId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users", // Correct the table name to match your schema
                key: "id",
            },
        },
        //    companyId: {
        //         type: DataTypes.INTEGER,
        //         references: {
        //             model: 'companies', // Correct the table name to match your schema
        //             key: 'id',
        //         },
        //     },

        // status:{
        //     type:DataTypes.STRING,
        //     defaultValue:'pending'
        // },

        schdualedAt: {
            type: DataTypes.BIGINT,
        },
        choice: {
            type: DataTypes.BOOLEAN, // true or false
            allowNull: true,
        },
        onTime: {
            type: DataTypes.BOOLEAN, // true or false
            allowNull: true,
        },
        details: {
            type: DataTypes.JSONB, // JSON object
            allowNull: true,
        },
        reviewOfHandyman: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        reviewOfClient: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        taskStatus: {
            type: DataTypes.ENUM("done", "incoming", "current", "canceled"),
            allowNull: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });
    return model;
};

module.exports = task;
