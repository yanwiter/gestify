import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, Sun, Moon, Languages, LogOut } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { NotificationBell } from "../NotificationBell";

interface NavbarProps {
  readonly isCollapsed: boolean;
  readonly setIsCollapsed: (value: boolean) => void;
}

export default function Navbar({ isCollapsed, setIsCollapsed }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const user = "Yan Witer";

  // Estado para a empresa/filial selecionada
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const branches = [
    {
      id: 1,
      name: "Ketra Matriz",
      image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAYFBMVEVHcExil6wosOYrr+Uqr+Upr+Ugsepjl6+FhYREpdCIgn6EhYWEhYVSnr4pr+V6i5OEhYUlsOeGhIErr+WEhYUnsOYcsuyEhYUqr+WEhYUpr+WDhYYqr+UesuuKgXspr+Ut04QsAAAAIHRSTlMACGxjx////63///9NGOH/xol0MuCuYY5QMstgqF9gwB6OoYgAAADGSURBVHgBZdFFAoQwAATBwSG42wL//+USG6yuHQ8sx/UsfPiBEUYxXly2RKQZHvKARJqmDu4KTizTU4Wbmi0SqdSA2ueiUs4YPBeVOhg949Ck1ghlYvOBjnWWzQnIAZyUZFzYJpxWxhhw2X5QKtYVw2YM0JydsBO/ZzA2NPc9pON+hoo1k81j6/E4vPP4HkgZYwUUbC2UmHWv2WoYjIKtgDUzlqGJOWhkjXR1cdOxJrItuMtTklMdPKz3hSe8VKxJjzdnJVh/e2wVfZDG0XMAAAAASUVORK5CYII=",
    },
    {
      id: 2,
      name: "Ketra Vila Velha",
      image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAYFBMVEVHcExil6wosOYrr+Uqr+Upr+Ugsepjl6+FhYREpdCIgn6EhYWEhYVSnr4pr+V6i5OEhYUlsOeGhIErr+WEhYUnsOYcsuyEhYUqr+WEhYUpr+WDhYYqr+UesuuKgXspr+Ut04QsAAAAIHRSTlMACGxjx////63///9NGOH/xol0MuCuYY5QMstgqF9gwB6OoYgAAADGSURBVHgBZdFFAoQwAATBwSG42wL//+USG6yuHQ8sx/UsfPiBEUYxXly2RKQZHvKARJqmDu4KTizTU4Wbmi0SqdSA2ueiUs4YPBeVOhg949Ck1ghlYvOBjnWWzQnIAZyUZFzYJpxWxhhw2X5QKtYVw2YM0JydsBO/ZzA2NPc9pON+hoo1k81j6/E4vPP4HkgZYwUUbC2UmHWv2WoYjIKtgDUzlqGJOWhkjXR1cdOxJrItuMtTklMdPKz3hSe8VKxJjzdnJVh/e2wVfZDG0XMAAAAASUVORK5CYII=",
    },
    {
      id: 3,
      name: "Ketra Rio de Janeiro",
      image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAYFBMVEVHcExil6wosOYrr+Uqr+Upr+Ugsepjl6+FhYREpdCIgn6EhYWEhYVSnr4pr+V6i5OEhYUlsOeGhIErr+WEhYUnsOYcsuyEhYUqr+WEhYUpr+WDhYYqr+UesuuKgXspr+Ut04QsAAAAIHRSTlMACGxjx////63///9NGOH/xol0MuCuYY5QMstgqF9gwB6OoYgAAADGSURBVHgBZdFFAoQwAATBwSG42wL//+USG6yuHQ8sx/UsfPiBEUYxXly2RKQZHvKARJqmDu4KTizTU4Wbmi0SqdSA2ueiUs4YPBeVOhg949Ck1ghlYvOBjnWWzQnIAZyUZFzYJpxWxhhw2X5QKtYVw2YM0JydsBO/ZzA2NPc9pON+hoo1k81j6/E4vPP4HkgZYwUUbC2UmHWv2WoYjIKtgDUzlqGJOWhkjXR1cdOxJrItuMtTklMdPKz3hSe8VKxJjzdnJVh/e2wVfZDG0XMAAAAASUVORK5CYII=",
    },
    {
      id: 4,
      name: "Ketra São Paulo",
      image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAYFBMVEVHcExil6wosOYrr+Uqr+Upr+Ugsepjl6+FhYREpdCIgn6EhYWEhYVSnr4pr+V6i5OEhYUlsOeGhIErr+WEhYUnsOYcsuyEhYUqr+WEhYUpr+WDhYYqr+UesuuKgXspr+Ut04QsAAAAIHRSTlMACGxjx////63///9NGOH/xol0MuCuYY5QMstgqF9gwB6OoYgAAADGSURBVHgBZdFFAoQwAATBwSG42wL//+USG6yuHQ8sx/UsfPiBEUYxXly2RKQZHvKARJqmDu4KTizTU4Wbmi0SqdSA2ueiUs4YPBeVOhg949Ck1ghlYvOBjnWWzQnIAZyUZFzYJpxWxhhw2X5QKtYVw2YM0JydsBO/ZzA2NPc9pON+hoo1k81j6/E4vPP4HkgZYwUUbC2UmHWv2WoYjIKtgDUzlqGJOWhkjXR1cdOxJrItuMtTklMdPKz3hSe8VKxJjzdnJVh/e2wVfZDG0XMAAAAASUVORK5CYII=",
    },
    {
      id: 5,
      name: "Ketra Macapá",
      image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAYFBMVEVHcExil6wosOYrr+Uqr+Upr+Ugsepjl6+FhYREpdCIgn6EhYWEhYVSnr4pr+V6i5OEhYUlsOeGhIErr+WEhYUnsOYcsuyEhYUqr+WEhYUpr+WDhYYqr+UesuuKgXspr+Ut04QsAAAAIHRSTlMACGxjx////63///9NGOH/xol0MuCuYY5QMstgqF9gwB6OoYgAAADGSURBVHgBZdFFAoQwAATBwSG42wL//+USG6yuHQ8sx/UsfPiBEUYxXly2RKQZHvKARJqmDu4KTizTU4Wbmi0SqdSA2ueiUs4YPBeVOhg949Ck1ghlYvOBjnWWzQnIAZyUZFzYJpxWxhhw2X5QKtYVw2YM0JydsBO/ZzA2NPc9pON+hoo1k81j6/E4vPP4HkgZYwUUbC2UmHWv2WoYjIKtgDUzlqGJOWhkjXR1cdOxJrItuMtTklMdPKz3hSe8VKxJjzdnJVh/e2wVfZDG0XMAAAAASUVORK5CYII=",
    },
  ];

  // Função para selecionar uma empresa/filial
  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    setIsBranchDropdownOpen(false);
  };

  // Função para mudar a página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Filtrar as empresas/filiais para a paginação
  const paginatedBranches = branches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Função para trocar o idioma
  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "pt" : "en");
  };

  // Função para fazer logout
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    if (branches.length > 0 && !selectedBranch) {
      setSelectedBranch(branches[0]);
    }
  }, [branches, selectedBranch]);

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

          {/* Dropdown de seleção de empresa/filial */}
          <div className="relative group">
            <button
              onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {selectedBranch ? (
                <>
                  <img
                    src={selectedBranch.image}
                    alt={selectedBranch.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm font-medium dark:text-white">
                    {selectedBranch.name}
                  </span>
                </>
              ) : (
                <span className="text-sm font-medium dark:text-white">
                  {t("common.selectBranch")}
                </span>
              )}
            </button>
            {isBranchDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50">
                <div className="max-h-60 overflow-y-auto">
                  {paginatedBranches.map((branch) => (
                    <button
                      key={branch.id}
                      onClick={() => handleBranchSelect(branch)}
                      className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      <img
                        src={branch.image}
                        alt={branch.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span>{branch.name}</span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between items-center px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                  >
                    {"<"}
                  </button>
                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    Página {currentPage}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage * itemsPerPage >= branches.length}
                    className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                  >
                    {">"}
                  </button>
                </div>
              </div>
            )}
          </div>

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
                src="https://media.licdn.com/dms/image/v2/D4D03AQGOcvJl1IJLpg/profile-displayphoto-shrink_400_400/B4DZSzhRQjHYAg-/0/1738178631183?e=1744848000&v=beta&t=N6M0_jSItsRDBZuA8-GIBu7RsUQvWNu7J7y6NuF-mf8"
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