import React, { useState } from "react";
import Dashboard from "../../pages/Dashboard";

const modules = {

  Dasboard: {
    name: "Recursos Humanos",
    routines: {
      panel: "Painel",
    },
  },

  RH: {
    name: "Recursos Humanos",
    routines: {
      employeeManagement: "Gestão de Funcionários",
      payroll: "Folha de Pagamento",
    },
  },
  Finance: {
    name: "Financeiro",
    routines: {
      billing: "Faturamento",
      accountsPayable: "Contas a Pagar",
    },
  },
};

interface User {
  permissions: {
    [module: string]: {
      [routine: string]: {
        read?: boolean;
        write?: boolean;
        edit?: boolean;
        delete?: boolean;
      };
    };
  };
}

interface PermissionManagerProps {
  user: User;
  onSave: (permissions: User["permissions"]) => void;
}

const PermissionManager: React.FC<PermissionManagerProps> = ({
  user,
  onSave,
}) => {
  const [permissions, setPermissions] = useState(
    user.permissions || {
        Dasboard: {
            panel: { read: false, write: false, edit: false, delete: false },
        },
      RH: {
        employeeManagement: {
          read: false,
          write: false,
          edit: false,
          delete: false,
        },
        payroll: { read: false, write: false, edit: false, delete: false },
      },
      Finance: {
        billing: { read: false, write: false, edit: false, delete: false },
        accountsPayable: {
          read: false,
          write: false,
          edit: false,
          delete: false,
        },
      },
    }
  );

  const handlePermissionChange = (
    module: string,
    routine: string,
    permission: string,
    value: boolean
  ) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [routine]: {
          ...prev[module]?.[routine],
          [permission]: value,
        },
      },
    }));
  };

  const handleSave = () => {
    onSave(permissions);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {Object.entries(modules).map(([moduleKey, module]) => {
        const modulePermissions = permissions[moduleKey] || {};
        return (
          <div key={moduleKey} className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {module.name}
            </h3>
            <div className="mt-2 space-y-4">
              {Object.entries(module.routines).map(
                ([routineKey, routineName]) => {
                  const routinePermissions =
                    modulePermissions[routineKey] || {};
                  return (
                    <div
                      key={routineKey}
                      className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
                    >
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">
                        {routineName}
                      </h4>
                      <div className="flex gap-4 mt-2">
                        {["read", "write", "edit", "delete"].map((perm) => (
                          <label
                            key={perm}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              checked={routinePermissions[perm] || false}
                              onChange={(e) =>
                                handlePermissionChange(
                                  moduleKey,
                                  routineKey,
                                  perm,
                                  e.target.checked
                                )
                              }
                              className="form-checkbox h-5 w-5 text-blue-600 dark:text-blue-400"
                            />
                            <span className="text-gray-700 dark:text-gray-300 capitalize">
                              {perm}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        );
      })}
      <button
        onClick={handleSave}
        className="mt-4 px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
      >
        Salvar
      </button>
    </div>
  );
};

export default PermissionManager;
