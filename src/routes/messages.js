const { Op } = require("sequelize");
const router =require('express').Router();
const barerAuth=require('../auth/authMiddlewares/barer');
const {messageModel,inboxModel,inboxParticipantsModel}=require('../models');
// Should be able to fetch all the conversataions for a specific user
router.get('/conversatations/:userId',async(req,res)=>{
try {
  const userId=req.params.userId;
  const allConvos=await inboxParticipantsModel.findConversations(userId);
  res.send(allConvos);
} catch (e) {
  res.send(e);
}
});
// Should be able to fetch all the messages for a conversations
router.get('/messages/:conversationId',async(req,res,next)=>{
  const conversationId=req.params.conversationId;
  try {
    const allMessages=await messageModel.findAll({where:{inboxId:conversationId});
    res.send(allMessages);  
  } catch (e) {
    res.send(e);
  };
});
// Should be able to send a message with the two users id and create a new inbox
router.post('/message/:user1Id/:user2Id',async(req,res,next)=>{
  const {user1Id,user2Id}=req.params;
  const {inboxId,userId,content,sentAt}=req.body;
  if(inboxId){
    try {
      const sentMessage=await messageModel.create({messageContent:content,inboxId:inboxId,userId:userId,sentAt:sentAt});
      res.send(sentMessage);
     } catch (e) {
     
   }
  }else {
    const newInbox=await inboxModel.create({lastMessage:content});
    const newInbox_participants=await inboxParticipantsModel.create({inboxId:newInbox.id,user1Id:user1Id,user2Id:user2Id});
    const newMessage=messageModel.create({messageContent:content,inboxId:inboxId,userId:userId,sentAt:sentAt});
    res.send(newMessage);
  };
});
module.exports=router;