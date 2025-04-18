import Navbar from "@/components/common/Navbar";
import { MdOutlineDomainVerification } from "react-icons/md";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import { PiUserCheckDuotone } from "react-icons/pi";
import { useState } from "react";
import { signup, verifyOtp } from "@/features/auth";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
export default function Otp() {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  // You can get user data from Redux store if needed
  const user = useSelector((state:any) => state.auth.user);
  
  const handleVerify = async() => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    
    setError("");
    setIsVerifying(true);
    
    // console.log("Verifying OTP:", otp);
    
    // Add your OTP verification API call here
    const res = await verifyOtp(Number(otp), user?.phone);
    console.log('verify otp res : ',res);
    if(!res.data.success){
      toast.error(res.data.message);
      setIsVerifying(false);
      return;
    }

    toast.success("otp verified successfully");

    const signupRes = await signup(user);

    if(!signupRes.data.success){
      toast.error(signupRes.data.message);
      setIsVerifying(false);
      return;
    }

    toast.success("signup successfully");
    
    setTimeout(() => {
      setIsVerifying(false);
      navigate("/signin");
    }, 2000);
  };

  const handleResendOtp = () => {
    // Add logic to resend OTP
    console.log("Resending OTP");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <Navbar />
      <div className="flex flex-col lg:w-[35%] md:w-[45%] w-[100%] items-center justify-center min-h-[70%] gap-3 shadow-md shadow-slate-200 rounded-md p-i-10 px-i-lg">
        <span className="text-2xl font-bold bg-primary-100 rounded-full px-i-10 py-i-10">
          <MdOutlineDomainVerification />
        </span>
        <h2 className="text-2xl font-bold">Verify Your Account</h2>
        <p className="text-sm text-gray-500 mb-i-10 text-center">Enter the OTP sent to your phone number to verify your account</p>
        
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        
        <InputOTP 
          maxLength={6} 
          value={otp} 
          onChange={(value) => {
            setOtp(value);
            console.log(value);
            // Clear error when user types
            if (error) setError("");
          }}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} className="w-[4rem] h-[4rem] border-2 border-slate-300"/>
            <InputOTPSlot index={1} className="w-[4rem] h-[4rem] border-2 border-slate-300"/>
            <InputOTPSlot index={2} className="w-[4rem] h-[4rem] border-2 border-slate-300"/>
          </InputOTPGroup>
          <InputOTPSeparator className="text-slate-400"/>
          <InputOTPGroup> 
            <InputOTPSlot index={3} className="w-[4rem] h-[4rem] border-2 border-slate-300"/>
            <InputOTPSlot index={4} className="w-[4rem] h-[4rem] border-2 border-slate-300"/>
            <InputOTPSlot index={5} className="w-[4rem] h-[4rem] border-2 border-slate-300"/>
          </InputOTPGroup>
        </InputOTP>
        
        <PrimaryBtn 
          text={isVerifying ? "Verifying..." : "Verify Account"} 
          icon={<PiUserCheckDuotone />} 
          className="w-full my-i-10 py-i-14 font-bold"
          clickHandler={handleVerify}
        />
        
        <button 
          onClick={handleResendOtp}
          className="text-sm text-blue-800 hover:underline"
        >
          Did not receive the OTP? Resend OTP
        </button>
        
        <hr className="w-full border-slate-300 my-4"/>
        <p className="text-sm text-center text-gray-400 font-medium">By verifying your account, you're confirming that this email belongs to you and agree to our <span className="text-primary-300">Terms of Service</span> and <span className="text-primary-300">Privacy Policy</span>.</p>
      </div>
    </div>
  );
}
