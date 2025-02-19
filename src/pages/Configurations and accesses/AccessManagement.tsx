import React, { useEffect, useState, Fragment } from "react";
import { useTranslation } from "react-i18next";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  ChevronDown,
  Filter,
  RefreshCcwDot,
} from "lucide-react";
import {
  Menu,
  Transition,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import Pagination from "../../components/Paginator/Paginator";
import useVisibleColumns from "../../hooks/useVisibleColumns";


interface VisibleColumns {
  name: boolean;
  situation: boolean;
  email: boolean;
  phone: boolean;
  mfaStatus: boolean;
  actions: boolean;
}

const acessData = [
  {
    id: "1",
    name: "Yan Witer Rocha Barbosa",
    email: "yan@sugarsupply.com",
    phone: "(11) 1234-5678",
    situation: "12.345.678/0001-90",
    mfaStatus: "Ativo",
  },
  {
    id: "2",
    name: "Yuri Witer Rocha Barbosa",
    email: "yuri@sugarsupply.com",
    phone: "(11) 1234-5678",
    situation: "12.345.678/0001-90",
    mfaStatus: "Inativo",
  },
  {
    id: "3",
    name: "Ygor Witer Rocha Barbosa",
    email: "ygor@sugarsupply.com",
    phone: "(11) 1234-5678",
    situation: "12.345.678/0001-90",
    mfaStatus: "Enviado",
  },
];

export default function AccessManagement() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filteredSuppliers, setFilteredSuppliers] = useState(acessData);
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const {
    visibleColumns,
    toggleColumnVisibility,
    toggleAllColumns,
  } = useVisibleColumns({
    name: true,
    situation: true,
    email: true,
    phone: true,
    mfaStatus: true,
    actions: true,
  });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSuppliers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const [filters, setFilters] = useState({
    name: "",
    situation: "",
    email: "",
    phone: "",
  });

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = acessData.filter((supplier) => {
      return (
        supplier.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        supplier.situation.includes(filters.situation) &&
        supplier.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        supplier.phone.includes(filters.phone)
      );
    });
    setFilteredSuppliers(filtered);
    setShowFilterModal(false);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Inativo":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Enviado":
        return "bg-orange-100 text-orange-600 dark:bg-orange-600 dark:text-white";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t("configAndccesses.managmentAccess")}
        </h1>
        <div className="flex gap-2">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                {t("suppliers.selectColumns")}
                <ChevronDown className="w-4 h-4" />
              </MenuButton>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                <MenuItem>
                    {({ focus }) => {
                      const allColumns = Object.keys(visibleColumns);
                      const allVisible = allColumns.every(
                        (column) => visibleColumns[column]
                      );

                      return (
                        <button
                          onClick={() => toggleAllColumns(!allVisible)}
                          className={`${
                            focus ? "bg-blue-500 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          {t(
                            allVisible
                              ? "suppliers.removeAll"
                              : "suppliers.includeAll"
                          )}
                        </button>
                      );
                    }}
                </MenuItem>

                  {/* Lista de colunas */}
                  {Object.keys(visibleColumns).map((column) => (
                    <MenuItem key={column}>
                      {({ focus }) => (
                        <button
                          onClick={() =>
                            toggleColumnVisibility(
                              column as keyof VisibleColumns
                            )
                          }
                          className={`${
                            focus ? "bg-blue-500 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          {t(`suppliers.${column}`)}
                          {visibleColumns[column as keyof VisibleColumns] && (
                            <span className="ml-2">✓</span>
                          )}
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Transition>
          </Menu>
          <button
            onClick={() => setShowFilterModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            {t("suppliers.filter")}
          </button>
          {/*           <button
            onClick={handleAddSupplier}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {t("suppliers.addSupplier")}
          </button> */}
        </div>
      </div>

      {/* Tabela de pessoas */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                {visibleColumns.name && (
                  <th className="text-left p-4">{t("name")}</th>
                )}
                {visibleColumns.situation && (
                  <th className="text-left p-4">{t("category")}</th>
                )}
                {visibleColumns.email && (
                  <th className="text-left p-4">{t("suppliers.email")}</th>
                )}
                {visibleColumns.phone && (
                  <th className="text-left p-4">{t("suppliers.phone")}</th>
                )}
                {visibleColumns.mfaStatus && (
                  <th className="text-left p-4">{t("suppliers.mfaStatus")}</th>
                )}
                {visibleColumns.actions && (
                  <th className="text-left p-4">{t("products.actions")}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((supplier) => (
                <tr key={supplier.id} className="border-b dark:border-gray-700">
                  {visibleColumns.name && (
                    <td className="p-4 dark:text-white">{supplier.name}</td>
                  )}
                  {visibleColumns.situation && (
                    <td className="p-4 dark:text-white">
                      {supplier.situation}
                    </td>
                  )}
                  {visibleColumns.email && (
                    <td className="p-4 dark:text-white">{supplier.email}</td>
                  )}
                  {visibleColumns.phone && (
                    <td className="p-4 dark:text-white">{supplier.phone}</td>
                  )}
                  {visibleColumns.mfaStatus && (
                    <td className="p-4 dark:text-white">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${getStatusBadgeClass(
                          supplier.mfaStatus
                        )}`}
                      >
                        {supplier.mfaStatus}
                      </span>
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg">
                          <RefreshCcwDot className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginação */}
      {Object.values(visibleColumns).some((column) => column) && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}
    </div>
  );
}
