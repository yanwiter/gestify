import React from "react";
import { useTranslation } from "react-i18next";
import { Pencil, RefreshCcwDot, Trash2 } from "lucide-react";
import Pagination from "../Paginator/Paginator";

interface Column {
  key: string;
  label: string;
}

interface GenericTableProps {
  columns: Column[];
  data: { id: string; [key: string]: string | number | boolean }[];
  visibleColumns: { [key: string]: boolean };
  onEdit: (item: {
    id: string;
    [key: string]: string | number | boolean;
  }) => void;
  onDelete: (item: {
    id: string;
    [key: string]: string | number | boolean;
  }) => void;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export const GenericTable: React.FC<GenericTableProps> = ({
  columns,
  data,
  visibleColumns,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                {columns.map((column) =>
                  visibleColumns[column.key] ? (
                    <th key={column.key} className="text-left p-4">
                      {t(column.label)}
                    </th>
                  ) : null
                )}
                {visibleColumns.actions && (
                  <th className="text-left p-4">{t("products.actions")}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-b dark:border-gray-700">
                  {columns.map((column) =>
                    visibleColumns[column.key] ? (
                      <td key={column.key} className="p-4 dark:text-white">
                        {item[column.key]}
                      </td>
                    ) : null
                  )}
                  {visibleColumns.actions && (
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(item)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <button  className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg">
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

      {Object.values(visibleColumns).some((column) => column) && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      )}
    </div>
  );
};
