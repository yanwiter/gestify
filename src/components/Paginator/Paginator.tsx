import React from "react";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const { t } = useTranslation();

  const firstPage = () => {
    onPageChange(1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const lastPage = () => {
    onPageChange(totalPages);
  };

  const goToPage = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center gap-2">
        <span className="text-gray-700 dark:text-gray-300">
          {t("itemsPerPage")}
        </span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="border border-gray-300 rounded-md p-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        {currentPage !== 1 && (
          <button
            onClick={firstPage}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t("first")}
          </button>
        )}
        {currentPage > 1 && (
          <button
            onClick={prevPage}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t("previous")}
          </button>
        )}
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          const isCurrentPage = page === currentPage;
          const isWithinRange = Math.abs(page - currentPage) <= 2;

          if (isWithinRange || page === 1 || page === totalPages) {
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                disabled={isCurrentPage}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                  isCurrentPage
                    ? "bg-blue-700 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {page}
              </button>
            );
          }
          return null;
        })}
        {currentPage < totalPages && (
          <button
            onClick={nextPage}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t("next")}
          </button>
        )}
        {currentPage !== totalPages && (
          <button
            onClick={lastPage}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t("last")}
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;