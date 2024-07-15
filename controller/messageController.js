import { Message } from "../models/messageModel.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errors.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { senderName, subject, message } = req.body;
  if (!senderName || !subject || !message) {
    return next(new ErrorHandler("Please fill full from!", 400));
  }
  const data = await Message.create({ senderName, subject, message });
  res.status(201).json({
    success: true,
    message: "Message Sent",
    data,
  });
});


export const deleteMessage = catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params;
    const message = await Message.findById(id);
    if(!message){
        return next(new ErrorHandler("Message Already Deleted!",400));
    }
    await message.deleteOne();
    res.status(2001).json({
        success:true,
        message:"Message Deleted",
    });
});

export const getAllMessage = catchAsyncErrors(async(req,res,next)=>{
    const messages =await Message.find();
    res.status(201).json({
        success:true,
        messages,
    })
})