import LogoutButton from "./dashboard/LogoutButton";

const Header = ({ userName }) => {

  return (
    <header className="h-16 w-full bg-white pr-20 flex items-center justify-end">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
            {userName?.[0]}
          </div>
          <span className="text-sm font-medium">{userName}</span>
        </div>

        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
