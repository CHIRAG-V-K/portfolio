import React, { useCallback, useState } from "react";
import { navItems } from "../constants";
import { Link } from "react-router-dom";

const NavItem = ({ icon: Icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-10 h-10 rounded-full shadow-inner-depth hover:shadow-sm  flex items-center justify-center transition-all duration-200 ease-in-out
      ${
        isActive
          ? "bg-primary text-white"
          : "bg-white text-gray-600 hover:bg-gray-300"
      }`}
  >
    <Icon size={20} />
  </button>
);

const NavBar = () => {
  const [activeNav, setActiveNav] = useState("home");

  return (
    <div className="fixed top-0 left-1/2 transform  -translate-x-1/2 z-50  xl:w-1/4 lg:w-1/2 w-3/4 ">
      <div className="bg-white rounded-full shadow-card shadow-slate-400 p-4 flex items-center justify-evenly mx-auto my-4">
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            <NavItem
              key={item.id}
              icon={item.icon}
              isActive={activeNav === item.id}
              onClick={() => {
                setActiveNav(item.id);
              }}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
