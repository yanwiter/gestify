import { useState } from "react";

interface VisibleColumns {
  [key: string]: boolean;
}

const useVisibleColumns = (initialState: VisibleColumns) => {
  const [visibleColumns, setVisibleColumns] = useState<VisibleColumns>(initialState);

  const toggleColumnVisibility = (column: keyof VisibleColumns, value?: boolean) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: value ?? !prev[column],
    }));
  };

  const toggleAllColumns = (value: boolean) => {
    const newVisibleColumns = Object.keys(visibleColumns).reduce((acc, column) => {
      acc[column] = value;
      return acc;
    }, {} as VisibleColumns);
    setVisibleColumns(newVisibleColumns);
  };

  return {
    visibleColumns,
    toggleColumnVisibility,
    toggleAllColumns,
  };
};

export default useVisibleColumns;