const socketIO = require("socket.io");
const {
  taskModel,
  handymenModel,
  companyModel,
  userModel,
} = require("../../models");
const { on } = require("nodemon");

module.exports = (server) => {
  const IO = socketIO(server, {
    cors: {
      origin: "*", // Replace with your front-end's actual URL
    },
  });

  const users = {};

  IO.on("connection", (socket) => {
    console.log(`new user ${socket.id}`);

    socket.on("signIn", (payload) => {
      users[payload.userId] = socket.id;
      console.log(users);
    });

    socket.on("pickHandyman", async (payload) => {
      //   console.log("handyman picked :::::::::::::::::::::::::", payload);

      //   try {
      //     const handyman = await handymenModel.findAll({
      //       where: { id: payload.handyData.handymanId },
      //     });
      //   } catch (err) {
      //     console.error(err);
      //   }
      //   try {
      //     const user = await userModel.findAll({
      //       where: { id: payload.handyData.clientId },
      //     });
      //   } catch (err) {
      //     console.error(err);
      //   }

      let socketId = users[payload.reciverId];
      IO.to(socketId).emit("client-recived", payload);
      socketId = null;
    });

    socket.on("schedualeAndpayment", handlePaymentAndScheduale); // handman
    async function handlePaymentAndScheduale(payload) {
      //   console.log("schedualeAndpayment  :::::::::::::::::::::::::", payload);
      payload.taskStatus = "current";

      try {
        const task = await taskModel.findByPk(payload.id);

        if (payload) {
          //   console.log("tttttttttttttttt ", task);
        }

        // Save the updated task
        await task.save();
      } catch (error) {
        console.log("error", error);
      }
      let socketIds = users[payload.clientId];
      payload.status = true;
      payload.inquiryPrice = 15;
      IO.to(socketIds).emit("inquiryDate", payload);
    }

    socket.on("continue", continuee);
    async function continuee(payload) {
      let socketIds = users[payload.clientId];
      payload.choice = true;

      if (payload.details) {
        payload.inquiryPrice = payload.details.inquiryPrice;
      }
      try {
        const task = await taskModel.findByPk(payload.id);

        if (typeof payload.choice === "boolean") {
          //   console.log("boelaen ", payload);

          task.taskStatus = "current";
          task.choice = payload.choice;
        }

        await task.save();
      } catch (error) {
        console.log("error", error);
      }
      //   console.log("uesr want the serves");
      // here it should be true if the payment logic worked false if payment logic failed and the transaction failed
      let socketId = users[payload.handymanId];
      IO.to(socketId).emit("transaction", payload);
      socketId = null;
      IO.to(socketIds).emit("transaction", payload);
    }

    socket.on("arrived", arrivedOrLate);

    async function arrivedOrLate(payload) {
      payload.onTime = true;
      try {
        const task = await taskModel.findByPk(payload.id);

        if (!task) {
          return res.status(404).json({ error: "Task not found" });
        }
        if (payload) {
          task.onTime = true;
        }

        // Save the updated task
        await task.save();
      } catch (error) {
        console.log("error", error);
      }

      let socketId = users[payload.clientId];
      IO.to(socketId).emit("arrived", payload);
      // console.log("arrived  :::::::::::::::::::::::::", payload);
      //   payload.onTime = true
      //   if (payload.onTime === true) {
      //     console.log("arrived on time ready for work", payload);
      //     socketId = null;
      //   } else {
      //     console.log("arrived late and wating for client response "); // add logic for canceling if the user wants and to get money back to the user
      //     // ioServer.emit('arrived',payload)
      //     // console.log('arrived on time ready for work', payload)
      //     let socketId = users[payload.reciverId];
      //     IO.to(socketId).emit("late", payload);
      //     socketId = null;
      //   }
    }

    // from the handyman
    socket.on("details", estimate); // log the price and emmit to the client and handy man if accepted
    async function estimate(payload) {
      try {
        const handymen = await handymenModel.findAll({
          where: { id: payload.handymanId },
        });

        if (handymen.length > 0) {
          const firstHandyman = handymen[0];
          const task = await taskModel.findByPk(payload.id);

          if (firstHandyman) {
            task.details = {
              price: payload.details.price,
              inquiryPrice: firstHandyman.inquiryPrice,
              hourlyRate: firstHandyman.hourlyRate,
            };
            payload.details = task.details;
            await task.save();
          }
        }
      } catch (error) {
        console.log("error", error);
      }

      //   console.log("details  :::::::::::::::::::::::::", payload);
      //   console.log("product costs ", payload.details.price);
      let socketId = users[payload.clientId];
      IO.to(socketId).emit("details", payload);
      socketId = null;
    }

    socket.on("busyHandyMan", busy);
    function busy(payload) {
      console.log("handyman is busy", payload);

      let socketId = users[payload.reciverId];
      IO.to(socketId).emit("handymanIsBusy", payload);
      socketId = null;
    }

    socket.on("returnStageOne", returningPayment);
    function returningPayment(payload) {
      console.log(
        `returning amount: ${payload.handyData.payment} to client ${payload.handyData.clientName}`
      );
    }

    socket.on("choiceToContinue", choiceToContinueLate);
    async function choiceToContinueLate(payload) {
      console.log("hchoiceToContinue", payload);

      if (payload.handyData.choice) {
        try {
          const task = await taskModel.findByPk(payload.handyData.id);

          if (!task) {
            return res.status(404).json({ error: "Task not found" });
          }
          if (typeof payload.handyData.choice === "boolean") {
            task.choice = payload.handyData.choice;
          }

          // Save the updated task
          await task.save();
        } catch (error) {
          console.log("error", error);
        }
      }

      // IO.emit('choiceToContinue', payload);

      if (!payload.handyData.choice) {
        payload.handyData.payback = true;
        console.log(
          `Client chose not to continue, returning the amount of ${payload.payment} to client named ${payload.handyData.clientName}`
        );
        let socketId = users[payload.reciverId];
        IO.to(socketId).emit("returendYouMoney", payload);
        socketId = null;
      }
    }

    socket.on("paidTotal", startWorking);
    function startWorking(payload) {
      console.log("amount paid", payload.handyData.details);

      let socketId = users[payload.reciverId];
      IO.to(socketId).emit("startWorking", payload);
      socketId = null;
    }

    // service declined
    socket.on("serviceRejected", nextClient);
    async function nextClient(payload) {
      console.log("serviceRejected", payload);
      // const encodedId = encodeURIComponent(payload.handymanId);
      payload.choice = false;
      // payload.handymanId = encodedId;
      try {
        const task = await taskModel.findByPk(payload.clientId);

        if (!task) {
          return res.status(404).json({ error: "Task not found" });
        }
        if (typeof payload.choice === "boolean") {
          task.choice = payload.choice;
        }

        // Save the updated task
        await task.save();
      } catch (error) {
        console.log("error", error);
      }

      console.log("rejected");
      let socketId = users[payload.handymanId];
      IO.to(socketId).emit("serviceRejected", payload);
      socketId = null;
    }

    socket.on("ontimeorless", finishedOnTime);
    function finishedOnTime(payload) {
      console.log("ontimeorless", payload.details);
      let hourlyPayment = payload.details.hourlyPayment;
    //   let expectedWorkTime = payload.details.expectedWorkTime;
      let hourlyRate = payload.details.hourlyRate;

    //   const oneHoursFixer =
        // expectedWorkTime - payload.deffrance / expectedWorkTime;
      payload.hourlyPayment = hourlyRate ;
      console.log("third stage payment", payload.hourlyPayment);

      let socketId = users[payload.clientId];
      IO.to(socketId).emit("lastPayment", payload);
      socketId = null;

      socketId = users[payload.handymanId];
      IO.to(socketId).emit("lastPayment", payload);
      socketId = null;
    }

    socket.on("moreCharge", finishedlate);
    function finishedlate(payload) {
      console.log("more Charge", payload);
      let hourlyPayment = payload.handyData.details.hourlyPayment;
      let expectedWorkTime = payload.handyData.details.expectedWorkTime;
      let hourlyRate = payload.handyData.details.hourlyRate;

      const oneHoursFixer =
        (expectedWorkTime + payload.handyData.deffrance) / expectedWorkTime;
      payload.handyData.hourlyPayment = hourlyRate * oneHoursFixer;
      console.log("third stage payment ", payload.handyData.hourlyPayment);

      let socketId = users[payload.senderId];
      IO.to(socketId).emit("lastPayment", payload);
      socketId = null;

      socketId = users[payload.reciverId];
      IO.to(socketId).emit("lastPayment", payload);
      socketId = null;
    }

    socket.on("paidrdStage", confirmedpayment);
    function confirmedpayment(payload) {
      console.log("paid for this operation", payload.handyData.details);

      let socketId = users[payload.reciverId];
      IO.to(socketId).emit("paidrdStage", payload);
      socketId = null;

      let socketIds = users[payload.senderId];
      IO.to(socketIds).emit("paidrdStage", payload);

      socketId = null;
    }

    socket.on("reviewOfHandyman", sendingServer);
    async function sendingServer(payload) {
      console.log("reviewOfHandyman", payload);
      try {
        const task = await taskModel.findByPk(payload.handyData.id);

        if (!task) {
          return res.status(404).json({ error: "Task not found" });
        }
        if (Number.isInteger(payload.handyData.review)) {
          task.reviewOfHandyman = payload.handyData.review;
        }

        // Save the updated task
        await task.save();
      } catch (error) {
        console.log("error", error);
      }

      console.log(
        `the operator  got the rating of ${payload.handyData.review} for this operation`
      );

      // logic to send to the server here
    }

    socket.on("reviewOfclient", sendingCleintToServer);
    async function sendingCleintToServer(payload) {
      console.log("reviewOfclient", payload);
      try {
        const task = await taskModel.findByPk(payload.handyData.id);

        if (!task) {
          return res.status(404).json({ error: "Task not found" });
        }
        if (Number.isInteger(payload.handyData.review)) {
          task.reviewOfClient = payload.handyData.review;
        }

        // Save the updated task
        await task.save();
      } catch (error) {
        console.log("error", error);
      }

      console.log(
        `the client  got the rating of ${payload.handyData.review} for this interaction`
      );

      // logic to send to the server here
    }

    socket.on("signOut", (payload) => {
      console.log("payload", payload);
      delete users[payload.userId];
      console.log("loged out", users);
    });
    socket.on("disconnect", () => {
      console.log("user disconected with id", socket.id);
      console.log("users:::::::::", users);
      for (const property in users) {
        if (socket.id === users[property]) {
          delete users[property];
        }
      }
      console.log(":::::::::::::: user", users);
    });
  });

  return IO;
};
