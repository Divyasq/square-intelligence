import React, { useState, useEffect } from 'react';
import { Plus, Mail, FileText, Calendar, MoreVertical, Play, Pause, Trash2, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';
import { ScheduledExport, CreateScheduledExportData } from '../types/scheduled-exports';
import { mockScheduledExports } from '../data/mockScheduledExports';

export function ScheduledExportsPage() {
  const [exports, setExports] = useState<ScheduledExport[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingExport, setEditingExport] = useState<ScheduledExport | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    // Load from localStorage or use mock data
    const saved = localStorage.getItem('scheduledExports');
    if (saved) {
      setExports(JSON.parse(saved));
    } else {
      setExports(mockScheduledExports);
      localStorage.setItem('scheduledExports', JSON.stringify(mockScheduledExports));
    }
  }, []);

  const saveExports = (newExports: ScheduledExport[]) => {
    setExports(newExports);
    localStorage.setItem('scheduledExports', JSON.stringify(newExports));
  };

  const toggleExportStatus = (id: string) => {
    const updated = exports.map(exp => 
      exp.id === id 
        ? { ...exp, isActive: !exp.isActive, status: exp.isActive ? 'paused' : 'active' as const }
        : exp
    );
    saveExports(updated);
  };

  const deleteExport = (id: string) => {
    const updated = exports.filter(exp => exp.id !== id);
    saveExports(updated);
    setToast({ message: 'Scheduled export deleted', type: 'success' });
  };

  const runExportNow = (exportItem: ScheduledExport) => {
    // Simulate running the export
    setToast({ message: `Generating ${exportItem.format.toUpperCase()} export...`, type: 'info' });
    
    setTimeout(() => {
      setToast({ 
        message: `${exportItem.reportType} export sent to ${exportItem.email}`, 
        type: 'success' 
      });
      
      // Update last run time
      const updated = exports.map(exp => 
        exp.id === exportItem.id 
          ? { ...exp, lastRun: new Date().toISOString().split('T')[0] }
          : exp
      );
      saveExports(updated);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFrequencyIcon = (frequency: string) => {
    return <Calendar className="h-4 w-4" />;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scheduled Exports</h1>
          <p className="text-gray-600 mt-1">Automatically export reports via email</p>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Schedule Export
        </Button>
      </div>

      <div className="grid gap-4">
        {exports.map((exportItem) => (
          <div key={exportItem.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{exportItem.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      {getFrequencyIcon(exportItem.frequency)}
                      {exportItem.frequency}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {exportItem.email}
                    </span>
                    <span className="uppercase font-medium">
                      {exportItem.format}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exportItem.status)}`}>
                  {exportItem.status}
                </span>
                
                <div className="text-right text-sm text-gray-600">
                  <div>Next: {new Date(exportItem.nextRun).toLocaleDateString()}</div>
                  {exportItem.lastRun && (
                    <div>Last: {new Date(exportItem.lastRun).toLocaleDateString()}</div>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => runExportNow(exportItem)}
                    className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                    title="Run now"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExportStatus(exportItem.id)}
                    className="h-8 w-8 p-0"
                    title={exportItem.isActive ? "Pause" : "Resume"}
                  >
                    {exportItem.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteExport(exportItem.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {exports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No scheduled exports</h3>
          <p className="text-gray-600 mb-4">Create your first scheduled export to automatically receive reports via email.</p>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Schedule Export
          </Button>
        </div>
      )}

      {showCreateModal && (
        <CreateExportModal 
          onClose={() => setShowCreateModal(false)}
          onSave={(data) => {
            const newExport: ScheduledExport = {
              id: Date.now().toString(),
              ...data,
              isActive: true,
              createdAt: new Date().toISOString().split('T')[0],
              nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              status: 'active'
            };
            saveExports([...exports, newExport]);
            setShowCreateModal(false);
            setToast({ message: 'Scheduled export created successfully!', type: 'success' });
          }}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

function CreateExportModal({ onClose, onSave }: {
  onClose: () => void;
  onSave: (data: CreateScheduledExportData) => void;
}) {
  const [formData, setFormData] = useState<CreateScheduledExportData>({
    name: '',
    reportType: 'Sales Summary',
    frequency: 'weekly',
    format: 'pdf',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Schedule Export</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Export Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="e.g., Weekly Sales Report"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Type
            </label>
            <select
              value={formData.reportType}
              onChange={(e) => setFormData({...formData, reportType: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option>Sales Summary</option>
              <option>Reconciliation</option>
              <option>Custom Report</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({...formData, frequency: e.target.value as any})}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Format
            </label>
            <select
              value={formData.format}
              onChange={(e) => setFormData({...formData, format: e.target.value as any})}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="pdf">PDF</option>
              <option value="csv">CSV</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="manager@business.com"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Schedule Export
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
