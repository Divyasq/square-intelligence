# Financial Suite

A comprehensive financial reporting application built with React, TypeScript, and Tailwind CSS. Features interactive sales breakdowns, transaction management, and dual-clickable sales analytics.

## 🚀 Live Demo

**[View Live Application](https://divyasq.github.io/financial-suite/)**

## ✨ Key Features

### 🎯 **Dual-Clickable Sales Breakdown**
- **"20 sales + 8 exchanges"** format with separate click handlers
- **"20 sales"** → Opens modal with 20 payment transactions
- **"8 exchanges"** → Opens modal with 8 exchange transactions
- Each modal row is clickable for detailed transaction view

### 📊 **Interactive Sales Dashboard**
- Real-time sales metrics and KPIs
- Visual sales gauge with progress indicators
- Expandable/collapsible sales categories
- Comprehensive transaction filtering

### 🔍 **Advanced Transaction Management**
- **Sales Transactions**: Payment-only filtering with "Completed" status
- **Exchange Transactions**: Exchange-only filtering with "Completed" status  
- **Returns Transactions**: Refund filtering with "Completed" status
- **Deferred Sales**: All status filtering including "Partially Paid"

### 🎨 **Modern UI Components**
- Responsive design with Tailwind CSS
- Interactive modals and tables
- Smooth hover effects and transitions
- Professional financial reporting interface

## 🛠️ Technical Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## 🏗️ Architecture

### **Component Structure**
```
src/
├── components/
│   ├── reports/           # Sales breakdown & reporting
│   │   ├── SalesBreakdown.tsx     # Main dual-click component
│   │   ├── TransactionsModal.tsx  # Modal system
│   │   └── GrossSalesTableModal.tsx
│   ├── transactions/      # Transaction management
│   ├── ui/               # Reusable UI components
│   └── layout/           # Layout components
├── pages/                # Page components
├── context/              # React contexts
├── types/                # TypeScript definitions
└── utils/                # Utility functions
```

### **Key Implementation Details**

#### **Dual-Click Sales Logic**
```typescript
// Dynamic parsing of "X sales + Y exchanges" format
const parseSalesAndExchanges = (text: string) => {
  const match = text.match(/(\d+)\s+sales\s+\+\s+(\d+)\s+exchanges/);
  return match ? { salesCount: match[1], exchangesCount: match[2] } : null;
};

// Separate click handlers
onSalesClick={() => setIsSalesModalOpen(true)}
onExchangesClick={() => setIsExchangesModalOpen(true)}
```

#### **Transaction Filtering**
```typescript
// Sales: Only payments with completed status
filterType: 'payments', status: 'Completed', transactionTypes: ['payments']

// Exchanges: Only exchanges with completed status  
filterType: 'exchanges', status: 'Completed', transactionTypes: ['exchanges']

// Deferred Sales: All status including partially paid
filterType: 'all', status: 'All Status', transactionTypes: ['invoices', 'appointments', 'gift-cards']
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Installation**
```bash
# Clone the repository
git clone https://github.com/Divyasq/financial-suite.git
cd financial-suite

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### **Development**
```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📱 Usage Examples

### **Sales Breakdown Navigation**
1. **Click "20 sales"** → View 20 payment transactions in modal
2. **Click "8 exchanges"** → View 8 exchange transactions in modal
3. **Click any modal row** → Navigate to detailed transaction view
4. **Click "View All Transactions"** → Navigate with proper filters applied

### **Transaction Filtering**
- **Sales Modal** → Transactions page with "Payments" + "Completed" filters
- **Exchanges Modal** → Transactions page with "Exchanges" + "Completed" filters
- **Returns Modal** → Transactions page with "Refunds" + "Completed" filters
- **Deferred Sales Modal** → Transactions page with "All Status" filters

## 🎯 Core Features Implemented

### ✅ **Modal System**
- **Clickable table rows** with hover effects
- **Dynamic transaction filtering** by type and status
- **Proper navigation state** management
- **Export functionality** for transaction data

### ✅ **Status Management**
- **Completed transactions** show green status badges
- **Partially paid transactions** show yellow status badges (deferred sales only)
- **No partially paid references** in non-deferred sales modals

### ✅ **Data Architecture**
- **20 realistic payment transactions** (PAY-001 to PAY-020)
- **8 realistic exchange transactions** (EXC-001 to EXC-008)
- **3 return transactions** with proper negative values
- **3 deferred sales transactions** with partial payment status

## 🔧 Configuration

### **Vite Configuration**
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/financial-suite/',  // GitHub Pages deployment
  build: { outDir: 'dist' }
});
```

### **GitHub Pages Deployment**
Automatic deployment via GitHub Actions on push to `main` branch.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **React Team** for the excellent framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide React** for beautiful icons
- **Recharts** for data visualization components

---

**Built with ❤️ using React + TypeScript + Tailwind CSS**
