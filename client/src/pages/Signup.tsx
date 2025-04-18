import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../components/common/Navbar";
import AccountType from "@/components/Signup/AccountType";
// import { signup } from "@/features/auth";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser } from "@/store/slices/authSlice";
import { sendOtp } from "@/features/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<String>("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  // Get auth state from Redux
  const isLoggedIn = useAppSelector((state: any) => state.auth.isLoggedIn);
  const user = useAppSelector((state: any) => state.auth.user);

  // Redirect if user is already logged in
  useEffect(() => {
    if (isLoggedIn && user) {
      // Redirect to home or dashboard
      navigate('/');
    }
  }, [isLoggedIn, user, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); 
    dispatch(setUser({email,phone,password,account_type: accountType,fullname}));
    const res = await sendOtp(phone);
    if(!res.data.success){
        toast.error("unable to send otp to phone number");
        return;
    }
    toast.success("otp sent succesfully to your phone!");
    setTimeout(()=>{
      navigate("/otp");
      setIsLoading(false);
    },2000)
  };

  const handleGoogleSignUp = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Sign in with Google");
      // Handle Google sign in logic here
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col mt-i-lg">
      <Navbar />

      <main className="flex-1 h-auto flex justify-center items-center">
        <div className="w-full max-w-[450px] bg-white rounded-xl shadow-md overflow-hidden mx-i-14 px-i-lg my-i-xl">
          {/* Sign In Header */}
          <div className="w-full px-i-lg py-i-lg">
            <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
            <p className="text-center text-sm text-slate-600 mt-i-2">
              Sign in to your account to continue
            </p>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSignUp} className="p-i-lg flex flex-col gap-4">
            {/* Fullname */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-slate-700"
              >
                Fullname
              </label>
              <div className="">
                <input
                  type="text"
                  id="name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full py-i-10 pl-[40px] pr-i-10 border border-slate-300 rounded-md focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 px-i-10"
                />
              </div>
            </div>

            {/* email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <div className="">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full py-i-10 pl-[40px] pr-i-10 border border-slate-300 rounded-md focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 px-i-10"
                />
              </div>
            </div>

            {/* phone */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-slate-700"
              >
                Phone
              </label>
              <div className="">
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+919981361214"
                  required
                  className="w-full py-i-10 pl-[40px] pr-i-10 border border-slate-300 rounded-md focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 px-i-10"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full py-i-10 pl-[40px] pr-[40px] border border-slate-300 rounded-md focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 px-i-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-i-lg px-i-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff
                      className="text-slate-400 hover:text-slate-600"
                      size={18}
                    />
                  ) : (
                    <FiEye
                      className="text-slate-400 hover:text-slate-600"
                      size={18}
                    />
                  )}
                </button>
              </div>
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary-600 hover:text-primary-800 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Account Type */}
            <AccountType
              accountType={accountType}
              setAccountType={setAccountType}
            />

            {/* Signup Button */}
            <div className="mt-i-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-900 hover:scale-95 text-white py-i-10 rounded-md font-medium transition-all duration-600 flex justify-center items-center"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing up...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-i-4">
              <div className="flex-1 h-[1px] bg-slate-200"></div>
              <span className="px-i-4 text-sm text-slate-500">or</span>
              <div className="flex-1 h-[1px] bg-slate-200"></div>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              className="w-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 py-i-10 rounded-md font-medium transition-colors flex justify-center items-center gap-2"
            >
              <FcGoogle size={20} />
              Sign in with Google
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-slate-600 mt-i-4 pb-i-lg">
              Don't have an account?{" "}
              <Link
                to="/signin"
                className="text-accent hover:text-accent/90 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
