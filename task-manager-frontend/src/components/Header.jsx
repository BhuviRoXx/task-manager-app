import { Search, Sparkles, LogOut } from "lucide-react";
import LogoutButton from "./dashboard/LogoutButton";

const Header = ({ userName, onAICommand }) => {
  return (
    <header className="h-32 w-full bg-white border-b border-gray-200 px-20 flex items-center justify-between">
      
      {/* Search */}
      <div className="flex items-center gap-3 w-1/2 bg-gray-100 px-4 py-2 rounded-lg">
        <Sparkles size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Type to create and manage tasks..."
          className="bg-transparent outline-none h-16 w-full text-sm"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
            {userName?.[0]}
          </div>
          <span className="text-sm font-medium">{userName}</span>
        </div>

        {/* logout */}
        <LogoutButton/>

      </div>
    </header>
  );
};

export default Header;
