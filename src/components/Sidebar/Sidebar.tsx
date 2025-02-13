import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import {
  Package,
  Truck,
  Factory,
  ClipboardCheck,
  BarChart,
  Settings,
  Users,
  ChevronDown,
  UserPlus,
  GraduationCap,
  CalendarDays,
  DollarSign,
  ShoppingCart,
  CircleDollarSign,
  ChevronLeft,
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const [isHRExpanded, setIsHRExpanded] = React.useState(false);
  const [isReportsExpanded, setIsReportsExpanded] = React.useState(false);
  const [isPurchasingExpanded, setIsPurchasingExpanded] = React.useState(false);
  const [isRevenueExpanded, setIsRevenueExpanded] = React.useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-white dark:bg-gray-800 shadow-md transition-all duration-300 flex flex-col h-screen`}
    >
      <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between shrink-0">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Factory className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Gestify
            </h1>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronLeft
            className={`w-5 h-5 transition-transform duration-300 ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        <div className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  isActive("/")
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Package className="w-5 h-5" />
                {!isCollapsed && <span>{t("common.dashboard")}</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  isActive("/products")
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Package className="w-5 h-5" />
                {!isCollapsed && <span>{t("common.products")}</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/suppliers"
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  isActive("/suppliers")
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Truck className="w-5 h-5" />
                {!isCollapsed && <span>{t("common.suppliers")}</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/production"
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  isActive("/production")
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Factory className="w-5 h-5" />
                {!isCollapsed && <span>{t("common.production")}</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/quality"
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  isActive("/quality")
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <ClipboardCheck className="w-5 h-5" />
                {!isCollapsed && <span>{t("common.quality")}</span>}
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={() => !isCollapsed && setIsHRExpanded(!isHRExpanded)}
                className={`w-full flex items-center justify-between p-2 rounded-lg ${
                  location.pathname.startsWith("/hr")
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {!isCollapsed && <span>{t("common.hr")}</span>}
                </div>
                {!isCollapsed && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isHRExpanded ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {!isCollapsed && isHRExpanded && (
                <ul className="mt-2 ml-6 space-y-2 transition-all duration-200">
                  <li>
                    <Link
                      to="/hr/employee"
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        isActive("/hr/employee")
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>{t("hr.employees")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/hr/training"
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        isActive("/hr/training")
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>{t("hr.training")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/hr/timetracking"
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        isActive("/hr/timetracking")
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <CalendarDays className="w-4 h-4" />
                      <span>{t("hr.timeTracking")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/hr/payroll"
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        isActive("/hr/payroll")
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <DollarSign className="w-4 h-4" />
                      <span>{t("hr.payroll")}</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="relative">
              <button
                onClick={() =>
                  !isCollapsed && setIsReportsExpanded(!isReportsExpanded)
                }
                className={`w-full flex items-center justify-between p-2 rounded-lg ${
                  location.pathname.startsWith("/reports")
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <BarChart className="w-5 h-5" />
                  {!isCollapsed && <span>{t("common.reports")}</span>}
                </div>
                {!isCollapsed && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isReportsExpanded ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {!isCollapsed && isReportsExpanded && (
                <ul className="mt-2 ml-6 space-y-2 transition-all duration-200">
                  <li>
                    <Link
                      to="/reports"
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        isActive("/reports")
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <BarChart className="w-5 h-5" />
                      {!isCollapsed && <span>{t("common.reports")}</span>}
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="relative">
              <button
                onClick={() =>
                  !isCollapsed && setIsPurchasingExpanded(!isPurchasingExpanded)
                }
                className={`w-full flex items-center justify-between p-2 rounded-lg ${
                  location.pathname.startsWith("/purchasing")
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  {!isCollapsed && <span>{t("common.purchasing")}</span>}
                </div>
                {!isCollapsed && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isPurchasingExpanded ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {!isCollapsed && isPurchasingExpanded && (
                <ul className="mt-2 ml-6 space-y-2 transition-all duration-200">
                  <li>
                    <Link
                      to="/reports"
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        isActive("/reports")
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <BarChart className="w-5 h-5" />
                      {!isCollapsed && <span>{t("common.reports")}</span>}
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="relative">
              <button
                onClick={() =>
                  !isCollapsed && setIsRevenueExpanded(!isRevenueExpanded)
                }
                className={`w-full flex items-center justify-between p-2 rounded-lg ${
                  location.pathname.startsWith("/revenue")
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <CircleDollarSign className="w-5 h-5" />
                  {!isCollapsed && <span>{t("common.revenue")}</span>}
                </div>
                {!isCollapsed && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isRevenueExpanded ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {!isCollapsed && isRevenueExpanded && (
                <ul className="mt-2 ml-6 space-y-2 transition-all duration-200">
                  <li>
                    <Link
                      to="/reports"
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        isActive("/reports")
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <BarChart className="w-5 h-5" />
                      {!isCollapsed && <span>{t("common.reports")}</span>}
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                to="/settings"
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  isActive("/settings")
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Settings className="w-5 h-5" />
                {!isCollapsed && <span>{t("common.settings")}</span>}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}