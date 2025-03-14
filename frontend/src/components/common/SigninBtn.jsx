import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"

const PrimaryBtn = ({text}) => {
    return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button className='bg-[#0F172A] text-white px-4 py-2 rounded-md ml-2 transition-all duration-500 hover:scale-95'>Try for free</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
           <UserButton />
      </SignedIn>
    </>
    )
}

export default PrimaryBtn