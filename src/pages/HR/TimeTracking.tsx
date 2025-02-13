import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

export default function TimeTracking() {
    const { t } = useTranslation();
    const [records, setRecords] = useState([]);
    const [newRecord, setNewRecord] = useState({ employee: '', timeIn: '', timeOut: '' });
    const [editingIndex, setEditingIndex] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecord({ ...newRecord, [name]: value });
    };

    const addRecord = () => {
        if (newRecord.employee && newRecord.timeIn && newRecord.timeOut) {
            setRecords([...records, newRecord]);
            setNewRecord({ employee: '', timeIn: '', timeOut: '' });
        }
    };

    const editRecord = (index) => {
        setNewRecord(records[index]);
        setEditingIndex(index);
    };

    const updateRecord = () => {
        if (newRecord.employee && newRecord.timeIn && newRecord.timeOut) {
            const updatedRecords = [...records];
            updatedRecords[editingIndex] = newRecord;
            setRecords(updatedRecords);
            setNewRecord({ employee: '', timeIn: '', timeOut: '' });
            setEditingIndex(null);
        }
    };

    const deleteRecord = (index) => {
        const updatedRecords = records.filter((_, i) => i !== index);
        setRecords(updatedRecords);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {t('hr.timeTracking')}
                </h1>
            </div>

            <div className="space-y-4">
                <div className="flex space-x-4">
                    <input
                        type="text"
                        name="employee"
                        placeholder="Funcionário"
                        value={newRecord.employee}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                    />
                    <input
                        type="time"
                        name="timeIn"
                        value={newRecord.timeIn}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                    />
                    <input
                        type="time"
                        name="timeOut"
                        value={newRecord.timeOut}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                    />
                    {editingIndex === null ? (
                        <button onClick={addRecord} className="p-2 bg-blue-500 text-white rounded">
                            <Plus size={16} />
                        </button>
                    ) : (
                        <button onClick={updateRecord} className="p-2 bg-green-500 text-white rounded">
                            <Pencil size={16} />
                        </button>
                    )}
                </div>

                <div className="space-y-2">
                    {records.map((record, index) => (
                        <div key={index} className="flex justify-between items-center p-2 border rounded">
                            <span>{record.employee}</span>
                            <span>{record.timeIn} - {record.timeOut}</span>
                            <div className="flex space-x-2">
                                <button onClick={() => editRecord(index)} className="p-1 bg-yellow-500 text-white rounded">
                                    <Pencil size={16} />
                                </button>
                                <button onClick={() => deleteRecord(index)} className="p-1 bg-red-500 text-white rounded">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}