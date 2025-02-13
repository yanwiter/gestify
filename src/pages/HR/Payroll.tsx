import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Payroll() {
  const { t } = useTranslation();

  const handleExportPDF = () => {
    const input = document.getElementById('employee-payroll');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('folha_pagamento.pdf');
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t('hr.payroll')}
        </h1>
        <button
          onClick={handleExportPDF}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Exportar PDF
        </button>
      </div>

      <div id="employee-payroll" className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Folha de Pagamento</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome do Funcionário</label>
            <p className="mt-1 text-lg font-semibold">João Silva</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cargo</label>
            <p className="mt-1 text-lg font-semibold">Desenvolvedor Front-end</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Salário Bruto</label>
            <p className="mt-1 text-lg font-semibold">R$ 5.000,00</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descontos</label>
            <p className="mt-1 text-lg font-semibold">R$ 1.000,00</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Salário Líquido</label>
            <p className="mt-1 text-lg font-semibold">R$ 4.000,00</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data de Pagamento</label>
            <p className="mt-1 text-lg font-semibold">05/10/2023</p>
          </div>
        </div>
      </div>
    </div>
  );
}