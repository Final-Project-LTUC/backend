const { Op } = require("sequelize");
const router =require('express').Router();
const barerAuth=require('../auth/authMiddlewares/barer');
const {messageModel,inboxModel,inboxParticipantsModel}=require('../models');
// Should be able to fetch all the conversataions for a specific user
router.get('/inboxes',async(req,res)=>{
  const all=await inboxModel.findAll();
  res.send(all);
})
router.get('/conversatations/:userId',async(req,res)=>{
  const role=req.query.role;
try {
  const userId=req.params.userId;
  const allConvos=await inboxModel.findConversations(userId,role);
  res.send(allConvos);
} catch (e) {
  res.send(e);
};
});
// Should be able to fetch all the messages for a conversations
router.get('/messages/:conversationId',async(req,res,next)=>{
  const conversationId=req.params.conversationId;
  try {
    const allMessages=await messageModel.findAll({where:{InboxId:conversationId}});
    res.send(allMessages);  
  } catch (e) {
    res.send(e);
  };
});
// Should be able to send a message with the two users id and create a new inbox
router.post('/messages/:user1Id/:user2Id',async(req,res,next)=>{
  const {user1Id,user2Id}=req.params;
  const {inboxId,userId,content,sentAt}=req.body;
  if(inboxId){
    try {
      const sentMessage=await messageModel.create({messageContent:content,InboxId:inboxId,userId:userId,sentAt:sentAt});
     console.log('exitsts')
      res.send(sentMessage);
     } catch (e) {
     console.log(e);
   }
  }else {
    try {
      const newInbox=await inboxModel.create({lastMessage:content,UserId:user1Id,HandymanId:user2Id});
      console.log(newInbox)
      const newMessage=await messageModel.create({messageContent:content,InboxId:newInbox.id,UserId:userId,sentAt:sentAt});
    res.send(newInbox);
    } catch (e) {
      console.log(e)
      res.send(e);
    }
    
  };
});
module.exports=router;