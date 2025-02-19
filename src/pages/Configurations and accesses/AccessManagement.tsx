import React, { useState, Fragment } from "react";
import { useTranslation } from "react-i18next";
import {
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
  TabPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanels,
} from "@headlessui/react";
import Pagination from "../../components/Paginator/Paginator";
import useVisibleColumns from "../../hooks/useVisibleColumns";
import { AccessModel } from "../../Models/AccessModel";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";

interface VisibleColumns {
  name: boolean;
  situation: boolean;
  email: boolean;
  phone: boolean;
  mfaStatus: boolean;
  actions: boolean;
}

const acesses = [
  {
    id: "1",
    name: "Yan Witer Rocha Barbosa",
    email: "yan@sugarsupply.com",
    phone: "(11) 1234-5678",
    situation: "12.345.678/0001-90",
    mfaStatus: "Ativo",
    password: "123",
    role: "admin",
    status: "active",
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",

  },
  {
    id: "2",
    name: "Yuri Witer Rocha Barbosa",
    email: "yuri@sugarsupply.com",
    phone: "(11) 1234-5678",
    situation: "12.345.678/0001-90",
    mfaStatus: "Inativo",
    password: "123",
    role: "manager",
    status: "inactive",
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",
  },
  {
    id: "3",
    name: "Ygor Witer Rocha Barbosa",
    email: "ygor@sugarsupply.com",
    phone: "(11) 1234-5678",
    situation: "12.345.678/0001-90",
    mfaStatus: "Enviado",
    password: "123",
    role: "employee",
    status: "on_leave",
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",
  },
];

export default function AccessManagement() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<AccessModel | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filteredSuppliers, setFilteredSuppliers] = useState(acesses);
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const { visibleColumns, toggleColumnVisibility, toggleAllColumns } =
    useVisibleColumns({
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
    const filtered = acesses.filter((supplier) => {
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

  const handleAddAccess = () => {
    setSelectedPerson(null);
    setShowModal(true);
  };

  const handleEditAccess = (AccessModel: AccessModel) => {
    setSelectedPerson(AccessModel);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPerson(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Simulando uma requisição assíncrona
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      // Exibe um toast de sucesso
      toast.success("Acesso criado com sucesso!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  
      handleCloseModal();
    } catch (error) {
      // Exibe um toast de erro
      toast.error("Ocorreu um erro ao salvar o acesso.");
    }
  };
  
  // Exemplo de uso ao deletar um acesso
  const handleDeleteAccess = async (id: string) => {
    try {
      // Simulando uma requisição assíncrona
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      // Exibe um toast de sucesso
      toast.success("Acesso deletado com sucesso!");
    } catch (error) {
      // Exibe um toast de erro
      toast.error("Ocorreu um erro ao deletar o acesso.");
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
              {currentItems.map((acesses) => (
                <tr key={acesses.id} className="border-b dark:border-gray-700">
                  {visibleColumns.name && (
                    <td className="p-4 dark:text-white">{acesses.name}</td>
                  )}
                  {visibleColumns.situation && (
                    <td className="p-4 dark:text-white">
                      {acesses.situation}
                    </td>
                  )}
                  {visibleColumns.email && (
                    <td className="p-4 dark:text-white">{acesses.email}</td>
                  )}
                  {visibleColumns.phone && (
                    <td className="p-4 dark:text-white">{acesses.phone}</td>
                  )}
                  {visibleColumns.mfaStatus && (
                    <td className="p-4 dark:text-white">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${getStatusBadgeClass(
                          acesses.mfaStatus
                        )}`}
                      >
                        {acesses.mfaStatus}
                      </span>
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg"
                        onClick={() => handleEditAccess(acesses)}
                        >
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {selectedPerson ? t("hr.editEmployee") : t("hr.addEmployee")}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <TabGroup>
                  <TabList className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    <Tab
                      className={({ selected }) =>
                        `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                              ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                              ${
                                selected
                                  ? "bg-white shadow"
                                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                              }`
                      }
                    >
                      {t("hr.personalInfo")}
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                              ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                              ${
                                selected
                                  ? "bg-white shadow"
                                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                              }`
                      }
                    >
                      {t("hr.contactInfo")}
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                              ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                              ${
                                selected
                                  ? "bg-white shadow"
                                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                              }`
                      }
                    >
                      {t("hr.employmentInfo")}
                    </Tab>
                  </TabList>
                  <TabPanels className="mt-2">
                    <TabPanel className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.fullName")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.birthDate")} *
                            </label>
                            <input
                              type="date"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.cpf")} *
                            </label>
                            <InputMask
                              mask="999.999.999-99"
                              maskChar={null}
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.rg")} *
                            </label>
                            <InputMask
                              mask="99.999.999-9"
                              maskChar={null}
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.gender")} *
                            </label>
                            <select
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                              <option value="male">{t("hr.male")}</option>
                              <option value="female">{t("hr.female")}</option>
                              <option value="other">{t("hr.other")}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800">
                      {/* Contact Information */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("auth.email")} *
                            </label>
                            {/*                             <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                    title="Digite um e-mail válido (exemplo@dominio.com)"
                                    className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                  /> */}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.phone")} *
                            </label>
                            <input
                              type="tel"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.street")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.number")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.complement")}
                            </label>
                            <input
                              type="text"
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.neighborhood")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.city")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.state")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.zipCode")} *
                            </label>
                            <InputMask
                              mask="99999-999"
                              maskChar={null}
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800">
                      {/* Employment Information */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.position")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.department")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.startDate")} *
                            </label>
                            <input
                              type="date"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.salary")} *
                            </label>
                            <input
                              type="number"
                              required
                              step="0.01"
                              min="0"
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.status")} *
                            </label>
                            <select
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                              <option value="active">{t("hr.active")}</option>
                              <option value="inactive">
                                {t("hr.inactive")}
                              </option>
                              <option value="on_leave">
                                {t("hr.onLeave")}
                              </option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("hr.accessLevel")} *
                            </label>
                            <select
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                              <option value="admin">{t("hr.admin")}</option>
                              <option value="manager">{t("hr.manager")}</option>
                              <option value="employee">
                                {t("hr.employee")}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {selectedPerson
                      ? t("hr.editEmployee")
                      : t("hr.addEmployee")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

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
