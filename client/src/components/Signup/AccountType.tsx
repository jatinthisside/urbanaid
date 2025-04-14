import { GoPeople } from "react-icons/go";
import { RiStore2Line } from "react-icons/ri";
import AccountOption from "./AccountOption";
import { useState } from "react";

export default function AccountType() {
  const [accountType, setAccountType] = useState<String>('customer');
  const toggleHandler=(e:any)=>{
    e.preventDefault();
    console.log('event ->',e);
    const value = e.currentTarget.name;
    console.log("value ->",value);
    setAccountType(value);
  }
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="account_type"
        className="text-sm font-medium text-slate-700"
      >
        Account Type
      </label>
      {/* choice */}
      <div className="w-full h-auto flex flex-col gap-1.5">
        {/* customer */}
        <button name="customer" value="customer" onClick={toggleHandler}>
          <AccountOption icon={<GoPeople/>} title="Customer" desc="Book services from top vendors" accType={accountType === "customer" ? true : false}/>
        </button>
        {/* vendor */}
        <button name="vendor" value="vendor" onClick={toggleHandler}>
          <AccountOption icon={<RiStore2Line/>} title="Vendor" desc="Offer and manage your services" accType={accountType === "vendor" ? true : false}/>
        </button>
      </div>
    </div>
  );
}
