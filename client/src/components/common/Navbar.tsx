import { Link } from "react-router"
import PrimaryBtn from "./PrimaryBtn"
import { IoLogOutOutline, IoPersonAddOutline } from "react-icons/io5";
import { CgLogIn } from "react-icons/cg";
import GhostBtn from "./GhostBtn";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { User } from "@/store/slices/authSlice";
import { signout } from "@/features/auth";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/store/hooks";
import { toast } from 'sonner';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const user = useAppSelector((state) => state.auth.user) as User | null;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleSignOut = async () => {
    if (isSigningOut) return; // Prevent multiple clicks
    
    try {
      setIsSigningOut(true);
      await signout(dispatch);
      toast.success("Signed out successfully");
      navigate('/signin');
    } catch (error) {
      toast.error("Failed to sign out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <nav 
      className={`
        w-[80%] flex justify-between items-center fixed z-50 left-[50%] translate-x-[-50%]
        transition-all duration-300 py-i-10
        ${scrolled 
          ? 'top-0 bg-white shadow-sm py-i-10 my-i-4 rounded-b-lg' 
          : 'top-5 bg-transparent'
        }
      `}
    >
      {/* logo */}
      <Link className="no-underline-hover px-i-10" to="/">
         <span className="text-body">Urbanaid<span className="text-accent">.</span></span>
      </Link>
      {/* links */}
      <ul className="flex gap-8 no-underline-hover font-medium">
        <li>
          <Link className="no-underline-hover" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="no-underline-hover" to="/">
            Services
          </Link>
        </li>
        <li>
          <Link className="no-underline-hover" to="/">
            About
          </Link>
        </li>
        <li>
          <Link className="no-underline-hover" to="/">
            About
          </Link>
        </li>
      </ul>
      {/* button */}
      <div className="flex gap-4 px-i-10">
        {
          isLoggedIn ? (
            <div className="flex gap-4 items-center">
              <GhostBtn 
                text={isSigningOut ? "Signing out..." : "Sign out"} 
                icon={<IoLogOutOutline />} 
                clickHandler={handleSignOut}
                disabled={isSigningOut}
              />
              <Link to="/profile">
                <img 
                  src={user?.profile_pic || 'https://via.placeholder.com/40'} 
                  alt="profile" 
                  className="w-10 h-10 rounded-full object-cover" 
                />
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link to="/signin"><GhostBtn text="Login" icon={<CgLogIn />} /></Link>
              <Link to="/signup"><PrimaryBtn text="Sign up" icon={<IoPersonAddOutline />} /></Link>
            </div>
          )
        }
      </div>
    </nav>
  )
}
