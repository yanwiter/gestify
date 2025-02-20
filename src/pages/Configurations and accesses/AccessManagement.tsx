import React, { useState, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { X, ChevronDown, Filter, EyeOff, Eye } from "lucide-react";
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
import useVisibleColumns from "../../hooks/useVisibleColumns";
import { AccessModel } from "../../Models/AccessModel";
import { toast } from "react-toastify";
import { GenericTable } from "../../components/Table/GenericTable";
import PermissionManager from "../../components/Permissions/PermissionManager";
import { UserPermissions } from "../../Models/Permission";

interface VisibleColumns {
  name: boolean;
  situation: boolean;
  email: boolean;
  phone: boolean;
  mfaStatus: boolean;
  actions: boolean;
}

const accesses = [
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
    permissions: {
      RH: {
        employeeManagement: {
          read: true,
          write: true,
          edit: true,
          delete: true,
        },
        payroll: { read: true, write: false, edit: false, delete: false },
      },
      Finance: {
        billing: { read: true, write: true, edit: true, delete: false },
        accountsPayable: {
          read: true,
          write: false,
          edit: false,
          delete: false,
        },
      },
    },
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
    permissions: {
      RH: {
        employeeManagement: {
          read: true,
          write: true,
          edit: true,
          delete: true,
        },
        payroll: { read: true, write: false, edit: false, delete: false },
      },
      Finance: {
        billing: { read: true, write: true, edit: true, delete: false },
        accountsPayable: {
          read: true,
          write: false,
          edit: false,
          delete: false,
        },
      },
    },
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
    permissions: {
      RH: {
        employeeManagement: {
          read: true,
          write: true,
          edit: true,
          delete: true,
        },
        payroll: { read: true, write: false, edit: false, delete: false },
      },
      Finance: {
        billing: { read: true, write: true, edit: true, delete: false },
        accountsPayable: {
          read: true,
          write: false,
          edit: false,
          delete: false,
        },
      },
    },
  },
];

export default function AccessManagement() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<AccessModel | null>(
    null
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filteredSuppliers, setFilteredSuppliers] = useState(accesses);
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
    const filtered = accesses.filter((supplier) => {
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

  const handleAddAccess = () => {
    setSelectedPerson(null);
    setShowModal(true);
  };

  const handleEditAccess = (AccessModel: unknown) => {
    setSelectedPerson(AccessModel as AccessModel);
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
  const handleDeleteAccess = async (AccessModel: unknown) => {
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
  const columns = [
    { key: "name", label: "configAndccesses.name" },
    { key: "email", label: "configAndccesses.email" },
    { key: "situation", label: "category" },
    { key: "phone", label: "suppliers.phone" },
    { key: "mfaStatus", label: "suppliers.mfaStatus" },
    { key: "permissions", label: "configAndccesses.permissions" },
  ];

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

      <GenericTable
        columns={columns}
        data={currentItems.map(({ permissions, ...rest }) => rest)}
        visibleColumns={visibleColumns}
        onEdit={handleEditAccess}
        onDelete={handleDeleteAccess}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {selectedPerson
                    ? t("configAndccesses.editAccess")
                    : t("hr.addEmployee")}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="modal-form custom-space-y"
              >
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
                      {t("configAndccesses.accessInfo")}
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
                      {t("configAndccesses.permissions")}
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
                      {t("configAndccesses.observations")}
                    </Tab>
                  </TabList>
                  <TabPanels className="mt-2">
                    <TabPanel className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800">
                      {/* Access Information */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("configAndccesses.email")} *
                            </label>
                            <div className="mt-1 relative">
                              <input
                                type="text"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("configAndccesses.password")} *
                            </label>
                            <div className="mt-1 relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-500"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-5 w-5" />
                                ) : (
                                  <Eye className="h-5 w-5" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800">
                      {selectedPerson && (
                        <PermissionManager
                          user={selectedPerson}
                          onSave={(updatedPermissions) => {
                            setSelectedPerson((prev) => {
                              if (!prev) return prev;
                              return {
                                ...prev,
                                permissions: {
                                  ...prev.permissions,
                                  ...updatedPermissions,
                                } as UserPermissions,
                              };
                            });
                          }}
                        />
                      )}
                    </TabPanel>
                    <TabPanel className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800">
                      {/* Observations */}

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("configAndccesses.situationAccess")} *
                            </label>
                            <div className="mt-1 relative">
                              <select
                                required
                                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                              >
                                <option value="active">
                                  {t("configAndccesses.active")}
                                </option>
                                <option value="inactive">
                                  {t("configAndccesses.inactive")}
                                </option>
                                <option value="blocked">
                                  {t("configAndccesses.blocked")}
                                </option>
                              </select>
                            </div>
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
                      ? t("configAndccesses.editAccess")
                      : t("hr.addEmployee")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
