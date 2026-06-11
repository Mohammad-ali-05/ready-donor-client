import { useEffect, useState } from "react";

const ThemeChangeButton = () => {
    

    return (
        <label className="swap swap-rotate cursor-pointer w-8 h-8">
            <input
                type="checkbox"
                checked={theme === "dark"}
                className="theme-controller"
                onChange={handleThemeChange}
            />

            {/* Sun icon */}
            <svg
                className="swap-off h-8 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="swap-off h-8 w-8 fill-current text-gray-800">
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5Z..." />
            </svg>

            {/* Moon icon */}
            <svg
                className="swap-on h-8 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="swap-on h-8 w-8 fill-current text-gray-100">
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49..." />
            </svg>
        </label>
    );
};

export default ThemeChangeButton;
