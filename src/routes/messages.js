const router =require('express').Router;
const barerAuth=require('../auth/authMiddlewares/barer');
const {messageModel,inboxModel,inboxParticipantsModel}=require('../models');
const message = require('../models/messaging/message');
router.get('/conversations',barerAuth,(req,res,next)=>{
    try {
        const userId=req.user.id;
        const conversations=inboxParticipantsModel.findConversation(userId)
        res.send(conversations);
    } catch (e) {
        next(e);
    }

});
router.get('/messages',barerAuth,(req,res,next)=>{
try {
    //get all messages for a specific conversation
} catch (e) {
    
}
});
router.post('/messages',barerAuth,(req,res,next)=>{
    const message=req.body.message;
try {
    const sentMessage=messageModel.create(message);
    //emit for all users message is sent;
    res.send(sentMessage);
} catch (e) {
    next(e);
};
})
module.exports=router;