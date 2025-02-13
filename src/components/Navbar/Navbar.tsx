import React from "react";
import { useTranslation } from "react-i18next";
import { Menu, Sun, Moon, Languages, LogOut } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { NotificationBell } from "../NotificationBell";

interface NavbarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Navbar({ isCollapsed, setIsCollapsed }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const user = "Yan Witer";

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "pt" : "en");
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="lg:hidden"
        >
          <Menu className="w-6 h-6 dark:text-white" />
        </button>
        <div className="flex items-center gap-4 ml-auto">
          <span className="text-lg font-semibold text-gray-800 dark:text-white">
            {user
              ? `${t("common.greeting")}, ${user || "Usuário"}!`
              : t("common.greeting")}
          </span>
          <button
            onClick={changeLanguage}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            title={t("common.language")}
          >
            <Languages className="w-5 h-5 dark:text-white" />
          </button>
          <NotificationBell />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            title={t("common.darkMode")}
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5 text-white" />
            )}
          </button>
          <div className="relative group">
            <button className="flex items-center gap-2">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                {t("auth.logout")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}