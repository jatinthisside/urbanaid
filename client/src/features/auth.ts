import axios from "axios";
const backend_endpoint = import.meta.env.VITE_BACKEND_URL;

interface signupProps{
    email:String,
    phone:String,
    fullname:String,
    password:String,
    account_type:String
}

export const signup=async(data:signupProps)=>{
   try{
    console.log('backend -> ',backend_endpoint);
      const responce = await axios.post(`${backend_endpoint}/signup`,data);
      console.log(' signup_res : ',responce);
      return responce;
   }catch(error:any){
    console.log('error while signup, ',error.response.data);
    return error;
   }
}

export const sendOtp = async(phone:String) =>{
    try{
      const responce = await axios.post(`${backend_endpoint}/send-otp`,{phone});
      console.log('send-otp res : ', responce);
      return responce;
    }catch(error:any){
      console.log('error while sending otp, ',error.responce);
      return error;
    }
}

export const verifyOtp = async(otp:Number,phone:String)=>{
   try{
      const responce = await axios.post(`${backend_endpoint}/verify-otp`,{otp,phone});
      console.log('send-otp res : ', responce);
      return responce;
   }catch(error:any){
      console.log('error while verifying otp, ',error.responce.data);
      return error;
   }
}
