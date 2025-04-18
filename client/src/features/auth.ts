import axios from "axios";
const backend_endpoint = import.meta.env.VITE_BACKEND_URL;
import { setUser, setIsLoggedIn } from "../store/slices/authSlice";
import { AppDispatch } from "../store/store";

// Create an axios instance with consistent configuration
const api = axios.create({
  baseURL: backend_endpoint,
  withCredentials: true, // Always send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor to always include token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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
      const responce = await api.post(`/signup`, data);
      console.log(' signup_res : ',responce);
      return responce;
   }catch(error:any){
    console.log('error while signup, ',error.response?.data);
    return error.response;
   }
}

export const sendOtp = async(phone:String) =>{
    try{
      const responce = await api.post(`/send-otp`, {phone});
      console.log('send-otp res : ', responce);
      return responce;
    }catch(error:any){
      console.log('error while sending otp, ',error.response);
      return error.response;
    }
}

export const verifyOtp = async(otp:Number,phone:String)=>{
   try{
      const responce = await api.post(`/verify-otp`, {otp,phone});
      console.log('send-otp res : ', responce);
      return responce;
   }catch(error:any){
      console.log('error while verifying otp, ',error.response?.data);
      return error.response;
   }
}

// Properly formatted as Redux Thunk action creator
export const fetchUserSession = () => {
   return async (dispatch: AppDispatch) => {
     try {
       console.log("Fetching user session...");
       // Use the configured api instance
       const { data } = await api.get('/auth/me');
       console.log("User session response:", data);
       
       dispatch(setUser(data.user));
       dispatch(setIsLoggedIn(true));
       return data.user;
     } catch (error) {
       console.error("Error fetching user session:", error);
       dispatch(setUser(null));
       dispatch(setIsLoggedIn(false));
       return null;
     }
   };
}

export const signin=async(data:any)=>{
   try{
      const res = await api.post(`/signin`, data);
      console.log('signin res : ',res.data.message);
      
      // Store the token in localStorage for future requests
      if (res.data.success && res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      
      return res;
   }catch(error:any){
    console.log('error while signin, ',error.response);
    return error.response;
   }
}
