import { Link } from "react-router"
import PrimaryBtn from "./PrimaryBtn"
import { IoPersonAddOutline } from "react-icons/io5";
import { CgLogIn } from "react-icons/cg";
import GhostBtn from "./GhostBtn";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center fixed top-[3%] left-0 right-0 z-50 px-[10%] font-medium">
      {/* logo */}
      <Link className="no-underline-hover" to="/">
         <span className="text-body">Urbanaid<span className="text-accent">.</span></span>
      </Link>
      {/* links */}
      <ul className="flex gap-8 no-underline-hover">
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
      <div className="flex gap-4">
        <GhostBtn text="Login" icon={<CgLogIn />} />
        <PrimaryBtn text="Sign up" icon={<IoPersonAddOutline />} />
      </div>
    </nav>
  )
}
