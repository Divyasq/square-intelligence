import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useDeferredSales } from '../../context/DeferredSalesContext';

export function DeferredSalesNavigation() {
  const navigate = useNavigate();
  const { scenarioGroups, selectedGroup, setSelectedGroup, setSelectedScenario } = useDeferredSales();
  const [activeTab, setActiveTab] = useState<'appointments' | 'invoices'>('invoices'); // Default to invoices

  const handleGroupSelect = (group: any) => {
    setSelectedGroup(group);
    setSelectedScenario(null);
  };

  // Check if the selected group is the partial payments/deposits group
  const isPartialPaymentsGroup = selectedGroup?.id === 'appointments-deposits' || selectedGroup?.id === 'invoices-deposits';
  
  // Get the appropriate scenarios based on the active tab
  const getDisplayScenarios = () => {
    if (!selectedGroup) return [];
    
    if (selectedGroup.id === 'appointments-deposits' || selectedGroup.id === 'invoices-deposits') {
      // Find both appointment and invoice groups
      const appointmentsGroup = scenarioGroups.find(g => g.id === 'appointments-deposits');
      const invoicesGroup = scenarioGroups.find(g => g.id === 'invoices-deposits');
      
      if (activeTab === 'appointments' && appointmentsGroup) {
        return appointmentsGroup.scenarios;
      } else if (activeTab === 'invoices' && invoicesGroup) {
        return invoicesGroup.scenarios;
      }
    }
    
    return selectedGroup.scenarios;
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="h-8 w-8 p-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="font-semibold text-gray-900">Deferred Sales</h2>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="p-2">
        {scenarioGroups
          .filter(group => group.id !== 'invoices-deposits') // Hide the invoices-deposits group from main navigation
          .map((group) => (
          <div key={group.id} className="mb-1">
            <button
              onClick={() => handleGroupSelect(group)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                (selectedGroup?.id === group.id || 
                 (group.id === 'appointments-deposits' && selectedGroup?.id === 'invoices-deposits'))
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>
                  {group.id === 'appointments-deposits' 
                    ? 'Tracking Partial payments/Deposits' 
                    : group.title}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </button>
            
            {/* Show tabs for partial payments/deposits - Hide Appointments tab for now */}
            {(selectedGroup?.id === group.id || 
              (group.id === 'appointments-deposits' && selectedGroup?.id === 'invoices-deposits')) && 
             group.id === 'appointments-deposits' && (
              <div className="ml-4 mt-2 mb-2">
                <div className="flex bg-gray-200 rounded-md p-1">
                  {/* Hide Appointments tab for now
                  <button
                    onClick={() => {
                      setActiveTab('appointments');
                      const appointmentsGroup = scenarioGroups.find(g => g.id === 'appointments-deposits');
                      if (appointmentsGroup) setSelectedGroup(appointmentsGroup);
                    }}
                    className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
                      activeTab === 'appointments'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Appointments
                  </button>
                  */}
                  <button
                    onClick={() => {
                      setActiveTab('invoices');
                      const invoicesGroup = scenarioGroups.find(g => g.id === 'invoices-deposits');
                      if (invoicesGroup) setSelectedGroup(invoicesGroup);
                    }}
                    className="w-full px-2 py-1 text-xs rounded transition-colors bg-white text-gray-900 shadow-sm"
                  >
                    Invoices/Appointments
                  </button>
                </div>
              </div>
            )}
            
            {/* Scenarios within Group */}
            {(selectedGroup?.id === group.id || 
              (group.id === 'appointments-deposits' && selectedGroup?.id === 'invoices-deposits')) && (
              <div className="ml-4 mt-1 space-y-1">
                {getDisplayScenarios().map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => setSelectedScenario(scenario)}
                    className="w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors text-gray-600 hover:bg-gray-100"
                  >
                    {scenario.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
