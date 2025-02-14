import React, { useEffect, useState, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Pencil, Trash2, X, ChevronDown, Filter } from "lucide-react";
import { SupplierModel } from "../Models/SupplierModel";
import { IMaskInput } from "react-imask";
import { Tab, Menu, Transition, MenuButton, MenuItem, MenuItems, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export default function Suppliers() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierModel | null>(null);
  const [email, setEmail] = useState("");
  const [typePerson, setTypePerson] = useState("");
  const [mask, setMask] = useState("");

  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    cnpj: true,
    email: true,
    phone: true,
    address: true,
    actions: true,
  });

  const [filters, setFilters] = useState({
    name: "",
    cnpj: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    setMask(typePerson === "physicalEntity" ? "99.999.999/9999-99" : "999.999.999-99");
  }, [typePerson]);

  const handleChange = (tipo: string) => {
    setTypePerson(tipo === typePerson ? "" : tipo);
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = suppliers.filter((supplier) => {
      return (
        supplier.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        supplier.cnpj.includes(filters.cnpj) &&
        supplier.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        supplier.phone.includes(filters.phone)
      );
    });
    setFilteredSuppliers(filtered);
    setShowFilterModal(false);
  };

  const suppliers = [
    {
      id: "1",
      name: "Sugar Supply Co.",
      cnpj: "12.345.678/0001-90",
      email: "contact@sugarsupply.com",
      phone: "(11) 1234-5678",
      address: "Av. Industrial, 1000",
    },
    {
      id: "2",
      name: "Flour Mills Ltd.",
      cnpj: "98.765.432/0001-10",
      email: "sales@flourmills.com",
      phone: "(11) 9876-5432",
      address: "Rua dos Moinhos, 500",
    },
    {
      id: "3",
      name: "Dairy Products Inc.",
      cnpj: "23.456.789/0001-20",
      email: "info@dairyproducts.com",
      phone: "(11) 2345-6789",
      address: "Rua dos Laticínios, 300",
    },
    {
      id: "4",
      name: "Meat & More",
      cnpj: "34.567.890/0001-30",
      email: "sales@meatandmore.com",
      phone: "(11) 3456-7890",
      address: "Av. dos Açougues, 200",
    },
    {
      id: "5",
      name: "Vegetable Growers",
      cnpj: "45.678.901/0001-40",
      email: "contact@vegetablegrowers.com",
      phone: "(11) 4567-8901",
      address: "Rua das Hortaliças, 150",
    },
    {
      id: "6",
      name: "Beverage Distributors",
      cnpj: "56.789.012/0001-50",
      email: "sales@beveragedistributors.com",
      phone: "(11) 5678-9012",
      address: "Av. das Bebidas, 600",
    },
    {
      id: "7",
      name: "Spice Traders",
      cnpj: "67.890.123/0001-60",
      email: "info@spicetraders.com",
      phone: "(11) 6789-0123",
      address: "Rua das Especiarias, 400",
    },
    {
      id: "8",
      name: "Fish & Seafood Co.",
      cnpj: "78.901.234/0001-70",
      email: "contact@fishseafood.com",
      phone: "(11) 7890-1234",
      address: "Av. dos Pescados, 700",
    },
    {
      id: "9",
      name: "Organic Foods Ltd.",
      cnpj: "89.012.345/0001-80",
      email: "sales@organicfoods.com",
      phone: "(11) 8901-2345",
      address: "Rua dos Orgânicos, 250",
    },
    {
      id: "10",
      name: "Frozen Goods Inc.",
      cnpj: "90.123.456/0001-90",
      email: "info@frozengoods.com",
      phone: "(11) 9012-3456",
      address: "Av. dos Congelados, 350",
    },
    {
      id: "11",
      name: "Bakery Supplies",
      cnpj: "01.234.567/0001-01",
      email: "contact@bakerysupplies.com",
      phone: "(11) 0123-4567",
      address: "Rua das Panificações, 450",
    },
    {
      id: "12",
      name: "Canned Foods Co.",
      cnpj: "12.345.678/0001-12",
      email: "sales@cannedfoods.com",
      phone: "(11) 1234-5678",
      address: "Av. das Conservas, 550",
    },
    {
      id: "13",
      name: "Pasta Makers",
      cnpj: "23.456.789/0001-23",
      email: "info@pastamakers.com",
      phone: "(11) 2345-6789",
      address: "Rua das Massas, 650",
    },
    {
      id: "14",
      name: "Oil & Vinegar Ltd.",
      cnpj: "34.567.890/0001-34",
      email: "contact@oilvinegar.com",
      phone: "(11) 3456-7890",
      address: "Av. dos Temperos, 750",
    },
    {
      id: "15",
      name: "Snack Foods Inc.",
      cnpj: "45.678.901/0001-45",
      email: "sales@snackfoods.com",
      phone: "(11) 4567-8901",
      address: "Rua dos Salgados, 850",
    },
    {
      id: "16",
      name: "Chocolate Factory",
      cnpj: "56.789.012/0001-56",
      email: "info@chocolatefactory.com",
      phone: "(11) 5678-9012",
      address: "Av. dos Doces, 950",
    },
    {
      id: "17",
      name: "Tea & Coffee Co.",
      cnpj: "67.890.123/0001-67",
      email: "contact@teacoffee.com",
      phone: "(11) 6789-0123",
      address: "Rua das Bebidas Quentes, 1050",
    },
    {
      id: "18",
      name: "Fruit Distributors",
      cnpj: "78.901.234/0001-78",
      email: "sales@fruitdistributors.com",
      phone: "(11) 7890-1234",
      address: "Av. das Frutas, 1150",
    },
    {
      id: "19",
      name: "Nut Suppliers",
      cnpj: "89.012.345/0001-89",
      email: "info@nutsuppliers.com",
      phone: "(11) 8901-2345",
      address: "Rua das Castanhas, 1250",
    },
    {
      id: "20",
      name: "Herb & Spice Co.",
      cnpj: "90.123.456/0001-90",
      email: "contact@herbspice.com",
      phone: "(11) 9012-3456",
      address: "Av. dos Temperos Naturais, 1350",
    },
    {
      id: "21",
      name: "Grain Distributors",
      cnpj: "01.234.567/0001-01",
      email: "sales@graindistributors.com",
      phone: "(11) 0123-4567",
      address: "Rua dos Grãos, 1450",
    },
    {
      id: "22",
      name: "Condiment Makers",
      cnpj: "12.345.678/0001-12",
      email: "info@condimentmakers.com",
      phone: "(11) 1234-5678",
      address: "Av. dos Condimentos, 1550",
    },
  ];

  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);

  const handleAddSupplier = () => {
    setSelectedSupplier(null);
    setShowModal(true);
  };

  const handleEditSupplier = (supplier: unknown) => {
    setSelectedSupplier(supplier as SupplierModel);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSupplier(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    handleCloseModal();
  };

  // Função para alternar a visibilidade das colunas
  interface VisibleColumns {
    name: boolean;
    cnpj: boolean;
    email: boolean;
    phone: boolean;
    address: boolean;
    actions: boolean;
  }

  const toggleColumnVisibility = (column: keyof VisibleColumns) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t("suppliers.title")}
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
                  {Object.keys(visibleColumns).map((column) => (
                    <MenuItem key={column}>
                      {({ focus }) => (
                        <button
                          onClick={() => toggleColumnVisibility(column as keyof VisibleColumns)}
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
          <button
            onClick={handleAddSupplier}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {t("suppliers.addSupplier")}
          </button>
        </div>
      </div>

      {/* Tabela de fornecedores */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                {visibleColumns.name && (
                  <th className="text-left p-4">{t("suppliers.name")}</th>
                )}
                {visibleColumns.cnpj && (
                  <th className="text-left p-4">{t("suppliers.cnpj")}</th>
                )}
                {visibleColumns.email && (
                  <th className="text-left p-4">{t("suppliers.email")}</th>
                )}
                {visibleColumns.phone && (
                  <th className="text-left p-4">{t("suppliers.phone")}</th>
                )}
                {visibleColumns.address && (
                  <th className="text-left p-4">{t("suppliers.address")}</th>
                )}
                {visibleColumns.actions && (
                <th className="text-left p-4">{t("products.actions")}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="border-b dark:border-gray-700">
                  {visibleColumns.name && (
                    <td className="p-4 dark:text-white">{supplier.name}</td>
                  )}
                  {visibleColumns.cnpj && (
                    <td className="p-4 dark:text-white">{supplier.cnpj}</td>
                  )}
                  {visibleColumns.email && (
                    <td className="p-4 dark:text-white">{supplier.email}</td>
                  )}
                  {visibleColumns.phone && (
                    <td className="p-4 dark:text-white">{supplier.phone}</td>
                  )}
                  {visibleColumns.address && (
                    <td className="p-4 dark:text-white">{supplier.address}</td>
                  )}
                  {visibleColumns.actions && (
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditSupplier(supplier)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg">
                        <Trash2 className="w-4 h-4" />
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
                  {selectedSupplier
                    ? t("suppliers.editSupplier")
                    : t("suppliers.addSupplier")}
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
                      {t("suppliers.supplierIdentification")}
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
                      {t("suppliers.address")}
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
                      {t("suppliers.documentation")}
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
                      {t("suppliers.contact")}
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
                      {t("suppliers.bankInformation")}
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
                      {t("suppliers.otherInformation")}
                    </Tab>
                  </TabList>
                  <TabPanels className="mt-2">
                    {/* Identificação do Fornecedor */}
                    <TabPanel className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {typePerson === "physicalEntity"
                                ? t("suppliers.name")
                                : t("suppliers.fantasyName")}{" "}
                              *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.typePerson")} *
                            </label>
                            <div className="mt-2 flex gap-4">
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={typePerson === "physicalEntity"}
                                  onChange={() => handleChange("physicalEntity")}
                                  className="form-checkbox h-4 w-4 border-2 border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                                />
                                <span className="text-gray-700 dark:text-gray-300">
                                  {t("suppliers.physicalEntity")}
                                </span>
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={typePerson === "juridica"}
                                  onChange={() => handleChange("juridica")}
                                  className="form-checkbox h-4 w-4 border-2 border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                                />
                                <span className="text-gray-700 dark:text-gray-300">
                                  {t("suppliers.legalEntity")}
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPanel>

                    {/* Endereço */}
                    <TabPanel className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t("hr.zipCode")} *
                              </label>
                              <IMaskInput
                                mask="99999-999"
                                type="text"
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
                        </div>
                      </div>
                    </TabPanel>

                    {/* Documentação */}
                    <TabPanel className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {typePerson === "physicalEntity"
                                ? t("suppliers.cnpj")
                                : t("suppliers.cpf")}{" "}
                              *
                            </label>
                            <IMaskInput
                              mask={mask}
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.stateRegistration")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.municipalRegistration")}
                            </label>
                            <input
                              type="text"
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </TabPanel>

                    {/* Contato */}
                    <TabPanel className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("auth.email")} *
                            </label>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                              title="Digite um e-mail válido (exemplo@dominio.com)"
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
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
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.secondaryPhone")}
                            </label>
                            <input
                              type="tel"
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.fax")}
                            </label>
                            <input
                              type="tel"
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.whatsapp")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.contactPosition")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </TabPanel>

                    {/* Informações Bancárias */}
                    <TabPanel className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.paymentTerms")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.creditLimit")} *
                            </label>
                            <input
                              type="number"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.paymentDays")} *
                            </label>
                            <input
                              type="number"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </TabPanel>

                    {/* Outras Informações */}
                    <TabPanel className="rounded-xl p-3 focus:outline-none bg-white dark:bg-gray-800">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.deliveryTime")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.deliveryMethod")} *
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.freightCosts")} *
                            </label>
                            <input
                              type="number"
                              required
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.certifications")}
                            </label>
                            <input
                              type="text"
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.certificationValidity")}
                            </label>
                            <input
                              type="date"
                              className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.securityPolicy")}
                            </label>
                            <textarea
                              className="mt-2 block w-full rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              rows={3}
                            ></textarea>
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t("suppliers.emergencyProcedures")}
                            </label>
                            <textarea
                              className="mt-2 block w-full rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              rows={3}
                            ></textarea>
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
                    {t("cancel")}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {selectedSupplier
                      ? t("suppliers.editSupplier")
                      : t("suppliers.addSupplier")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

{showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {t("suppliers.filterSuppliers")}
                </h2>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleFilterSubmit}>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t("suppliers.name")}
                      </label>
                      <input
                        type="text"
                        value={filters.name}
                        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                        className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t("suppliers.cnpj")}
                      </label>
                      <input
                        type="text"
                        value={filters.cnpj}
                        onChange={(e) => setFilters({ ...filters, cnpj: e.target.value })}
                        className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t("suppliers.email")}
                      </label>
                      <input
                        type="email"
                        value={filters.email}
                        onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                        className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t("suppliers.phone")}
                      </label>
                      <input
                        type="tel"
                        value={filters.phone}
                        onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
                        className="mt-2 block w-full h-8 rounded-md border-2 border-gray-400 bg-white shadow-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowFilterModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    {t("cancel")}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {t("applyFilters")}
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