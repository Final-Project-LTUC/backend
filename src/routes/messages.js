const { Op } = require("sequelize");
const router =require('express').Router;
const barerAuth=require('../auth/authMiddlewares/barer');
const {messageModel,inboxModel,inboxParticipantsModel}=require('../models');
router.get('/inboxes', barerAuth,async (req, res) => {
    const userId=req.user.id;
   const allUserConversations= await inboxParticipantsModel.findConversation(userId);
   res.send(allUserConversations);
  });
  router.get('/inbox/:inboxId/messages', async (req, res) => {
    try {
      const inboxId = req.params.inboxId;
      const messages = await messageModel.findAll({
        where: { inboxId },
        include: [{ model: inboxParticipantsModel, as: 'senderParticipant' }],
      });
      res.json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching messages.' });
    }
  });






// router.get('/conversations',barerAuth,(req,res,next)=>{
//     try {
//         const userId=req.user.id;
//         const conversations=inboxParticipantsModel.findConversation(userId)
//         res.send(conversations);
//     } catch (e) {
//         next(e);
//     }

// });
// router.get('/messages',barerAuth,(req,res,next)=>{
// try {
//     //get all messages for a specific conversation
// } catch (e) {
    
// }
// });
// router.post('/messages',barerAuth,(req,res,next)=>{
//     const message=req.body.message;
// try {
//     const sentMessage=messageModel.create(message);
//     //emit for all users message is sent;
//     res.send(sentMessage);
// } catch (e) {
//     next(e);
// };
// })
module.exports=router;