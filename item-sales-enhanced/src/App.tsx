import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { DashboardProvider } from './context/DashboardContext';
import { ItemsProvider } from './context/ItemsContext';
import { LibraryProvider } from './context/LibraryContext';
import { ChatProvider } from './context/ChatContext';
import { ChatbotProvider } from './context/ChatbotContext';
import { ReportsProvider } from './context/ReportsContext';
import { TransactionsProvider } from './context/TransactionsContext';
import { EducationProvider } from './context/EducationContext';
import { DeferredSalesProvider } from './context/DeferredSalesContext';

import { AppLayout } from './components/layout/AppLayout';

import { DashboardPage } from './pages/DashboardPage';
import { ItemsPage } from './pages/ItemsPage';
import { ChatbotPage } from './pages/ChatbotPage';
import { ReportsPage } from './pages/ReportsPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { EducationPage } from './pages/EducationPage';
import { ModuleDetailPage } from './pages/ModuleDetailPage';
import { FinancialSuitePage } from './pages/FinancialSuitePage';
import { CustomReportsPage } from './pages/CustomReportsPage';
import { CustomReportBuilderPage } from './pages/CustomReportBuilderPage';
import { DeferredSalesPage } from './pages/DeferredSalesPage';
import { InvoiceTransactionDetailPage } from './pages/InvoiceTransactionDetailPage';
import { FullCycleTransactionPage } from './pages/FullCycleTransactionPage';
import { MigrationStatusPage } from './pages/MigrationStatusPage';
import { ScheduledExportsPage } from './pages/ScheduledExportsPage';
import ItemSales from './pages/ItemSales';

function App() {
  return (
    <DashboardProvider>
      <ItemsProvider>
        <LibraryProvider>
          <ChatProvider>
            <ChatbotProvider>
              <ReportsProvider>
                <TransactionsProvider>
                  <EducationProvider>
                    <DeferredSalesProvider>
                      <Router>
                        <Routes>
                          <Route path="/" element={<AppLayout />}>
                            <Route index element={<ItemSales />} />
                            <Route path="chatbot" element={<ChatbotPage />} />
                            <Route path="reports" element={<ReportsPage />} />
                            <Route path="transactions" element={<TransactionsPage />} />
                            <Route path="education" element={<EducationPage />} />
                            <Route path="education/:moduleId" element={<ModuleDetailPage />} />

                            <Route path="financial-suite" element={<FinancialSuitePage />} />
                            <Route path="financial-suite/custom-reports" element={<CustomReportsPage />} />
                            <Route path="financial-suite/custom-reports/create" element={<CustomReportBuilderPage />} />
                            <Route path="financial-suite/custom-reports/edit/:id" element={<CustomReportBuilderPage />} />
                            <Route path="financial-suite/reports/sales-summary" element={<ReportsPage />} />
                            <Route path="financial-suite/scheduled-exports" element={<ScheduledExportsPage />} />

                            <Route path="deferred-sales" element={<DeferredSalesPage />} />
                            <Route path="deferred-sales/transactions" element={<TransactionsPage />} />
                            <Route path="deferred-sales/invoice-detail" element={<InvoiceTransactionDetailPage />} />
                            <Route path="deferred-sales/full-cycle" element={<FullCycleTransactionPage />} />

                            <Route path="migration-status" element={<MigrationStatusPage />} />
                            
                            {/* Item Sales Project */}
                            <Route path="item-sales" element={<ItemSales />} />

                            {/* FS Prototype Routes */}
                            <Route path="fs-prototype" element={<FinancialSuitePage />} />
                            <Route path="fs-prototype/deferred-sales" element={<DeferredSalesPage />} />
                            <Route path="fs-prototype/custom-reports" element={<CustomReportsPage />} />
                            <Route path="fs-prototype/reports/:reportType" element={<ReportsPage />} />
                          </Route>
                        </Routes>
                      </Router>
                    </DeferredSalesProvider>
                  </EducationProvider>
                </TransactionsProvider>
              </ReportsProvider>
            </ChatbotProvider>
          </ChatProvider>
        </LibraryProvider>
      </ItemsProvider>
    </DashboardProvider>
  );
}

export default App;
