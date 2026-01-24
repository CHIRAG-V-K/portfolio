import React from "react";
import { navItems } from "../constants";

const NavItem = ({ icon: Icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-10 h-10 rounded-full shadow-inner-depth hover:shadow-sm flex items-center justify-center transition-all duration-200 ease-in-out ${
      isActive
        ? "bg-primary text-white"
        : "bg-white text-gray-600 hover:bg-gray-300"
    }`}
  >
    <Icon size={20} />
  </button>
);

// NavBar now receives activeSection and numSections
const NavBar = ({ onSectionChange, activeSection = 0, numSections = 5 }) => {
  const getLabel = (id) => {
    switch (id) {
      case "home":
        return "Home";
      case "about":
        return "About";
      case "work":
        return "Work Experience";
      case "tech":
        return "Skills"; // Using "Skills" for tech section as per typical portfolio
      case "contactus":
        return "Contact Me";
      default:
        return "";
    }
  };

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 xl:w-1/4 lg:w-1/2 w-3/4">
      <div className="bg-white rounded-full shadow-card shadow-slate-400 p-4 flex items-center justify-evenly mx-auto my-4">
        {navItems.slice(0, numSections).map((item, idx) => (
          <div key={item.id} className="relative group">
            <NavItem
              icon={item.icon}
              isActive={activeSection === idx}
              onClick={() => {
                onSectionChange(idx);
              }}
            />
            <span className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              {getLabel(item.id)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
