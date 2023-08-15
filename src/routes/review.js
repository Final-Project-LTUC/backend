const router =require('express').Router();
const {reviewModel}=require('../models');
const barer=require('../auth/authMiddlewares/barer');
//should be able to get all reviews for a specific user
router.get('/review/user/:userId',async (req,res,next)=>{
const userId=req.params.userId;
try {
    const allReviews=await reviewModel.findAll({where:{UserId:userId}});
    res.send(allReviews);
} catch (e) {
     e={
        message:`Could Not Get All Reviews For `,
        ...e,
    }
    console.log(e);
    next(e);
}
});
//should be able to get all reviews for a specific handyman
router.get('/review/handyman/:handymanId',async(req,res,next)=>{
    const handymanId=req.params.handymanId;
    try {
        const allReviews=await reviewModel.findAll({where:{HandymanId:handymanId}});
        res.send(allReviews);
    } catch (e) {
         e={
            message:`Could Not Get All Reviews For ${handymanId}`,
            ...e,
        }
        console.log(e);
        next(e);
    }
});
//should be able to get a review for a specific task
router.get('/review/:taskId',barer(),async(req,res,next)=>{
    const taskId=req.params.taskId;
    try {
        const taskReviews=await reviewModel.find({where:{TaskId:taskId}});//returns a review with both a rating for handyman ,and a rating for user,associated with that task
        res.send(taskReviews);
    } catch (e) {
        e={
            message:`Could Not Get  Reviews For ${taskId}`,
            ...e,
        }
        console.log(e);
        next(e);
    }
});

//should be able to create a review aand associate it with a taskid and userid and handyman id ,but leaving the review for handyman null till the handyman himself hits the second route
router.post('/review/handyman',async(req,res,next)=>{
    const {rating,userId,handymanId,taskId}=req.body;//should contain the taskId related for that user and the userId and the handymanId
    try {
        const createdReview=await reviewModel.create({ratingForUser:rating,UserId:userId,handymanId:handymanId,TaskId:taskId});
        res.json(`A review for user has already been submitted ${createdReview}`);
    } catch (e) {
        e={
            message:`Could Not Create  Review For ${review.taskId}`,
            ...e,
        }
        console.log(e);
        next(e);
    }
});
//should be able to update the attribute of the ReviewForUser to the desired review
router.post('/review/user',async(req,res,next)=>{
    const {rating,userId,handymanId,taskId}=req.body;//should contain the taskId related for that user and the userId and the handymanId
    try {
        const updatedReview=reviewModel.update({ratingForHandyman:rating,UserId:userId,HandymanId:handymanId,TaskId:taskId},{where:{TaskId:taskId}});
        res.json(`A review for the handyman has already been submitted ${updatedReview}`);
    } catch (e) {
        e={
            message:`Could Not Create  Review For ${taskId}`,
            ...e,
        };
        console.log(e);
        next(e);
    }
});
module.exports=router;