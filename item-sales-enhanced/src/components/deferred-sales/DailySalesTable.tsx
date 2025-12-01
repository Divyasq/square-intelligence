import React from 'react';
import { SalesScenario } from '../../types/deferredSales';

interface DailySalesTableProps {
  scenario: SalesScenario;
  dateRange: { start: Date; end: Date };
}

export function DailySalesTable({ scenario, dateRange }: DailySalesTableProps) {
  // Generate daily data based on the scenario
  const generateDailyData = () => {
    const days = [];
    const start = new Date(dateRange.start);
    const end = new Date(dateRange.end);
    
    // Generate dates between start and end
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }

    // Extract actual values from scenario data
    const extractScenarioValues = () => {
      const values = {
        grossSales: 0,
        items: 0,
        serviceCharges: 0,
        returns: 0,
        discountsComps: 0,
        netSales: 0,
        tax: 0,
        tip: 0,
        refundsByAmount: 0,
        giftCardSales: 0,
        invoices: 0,
        invoiceDepositRedeemed: 0,
        squareOnline: 0,
        totalCollected: 0,
        cash: 0,
        card: 0,
        external: 0,
        other: 0,
        giftCard: 0,
        bankTransfer: 0,
        houseAccount: 0,
        fees: 0
      };

      // Debug log to see what we're working with
      console.log('Scenario ID:', scenario.id);
      console.log('Scenario data:', scenario);

      // Extract from sales sections
      scenario.salesSections.forEach(section => {
        console.log('Processing sales section:', section.title);
        section.lines.forEach(line => {
          const label = line.label.trim().toLowerCase().replace(/\s+/g, ' ');
          console.log(`Processing line: "${label}" = ${line.amount}`);
          
          if (label === 'gross sales') values.grossSales = line.amount;
          else if (label.includes('items')) values.items = line.amount;
          else if (label.includes('service charges')) values.serviceCharges = line.amount;
          else if (label === 'returns') values.returns = line.amount;
          else if (label.includes('discounts') || label.includes('comps')) values.discountsComps = line.amount;
          else if (label === 'net sales') values.netSales = line.amount;
          else if (label === 'tax') values.tax = line.amount;
          else if (label === 'tip') values.tip = line.amount;
          else if (label.includes('refunds by amount')) values.refundsByAmount = line.amount;
          else if (label.includes('gift card sales')) values.giftCardSales = line.amount;
          else if (label === 'invoices') values.invoices = line.amount;
          else if (label.includes('deposit redeemed') || label.includes('appointments deposit redeemed') || label.includes('invoices deposit redeemed')) values.invoiceDepositRedeemed = line.amount;
          else if (label.includes('square online')) values.squareOnline = line.amount;
        });
      });

      // Extract from payment sections
      scenario.paymentSections.forEach(section => {
        console.log('Processing payment section:', section.title);
        section.lines.forEach(line => {
          const label = line.label.trim().toLowerCase().replace(/\s+/g, ' ');
          console.log(`Processing payment line: "${label}" = ${line.amount}`);
          
          if (label === 'total collected') values.totalCollected = line.amount;
          else if (label.includes('cash') && !label.includes('card')) values.cash = line.amount;
          else if (label.includes('card') && !label.includes('gift')) values.card = line.amount;
          else if (label.includes('external')) values.external = line.amount;
          else if (label.includes('other')) values.other = line.amount;
          else if (label.includes('gift card')) values.giftCard = line.amount;
          else if (label.includes('bank transfer')) values.bankTransfer = line.amount;
          else if (label.includes('house account')) values.houseAccount = line.amount;
          else if (label.includes('fees')) values.fees = line.amount;
        });
      });

      console.log('Extracted values:', values);
      return values;
    };

    const scenarioValues = extractScenarioValues();

    // Create daily breakdown based on scenario
    const dailyData = days.map((date, index) => {
      const dayNumber = index + 1;
      const monthDay = `${date.getMonth() + 1}/${date.getDate()}`;
      
      // Initialize all values to 0
      let data = {
        date: monthDay,
        grossSales: 0,
        items: 0,
        serviceCharges: 0,
        returns: 0,
        discountsComps: 0,
        netSales: 0,
        giftCardSales: 0,
        invoices: 0,
        squareOnline: 0,
        taxes: 0,
        tips: 0,
        refundsByAmount: 0,
        totalSales: 0,
        totalPaymentsCollected: 0,
        bankTransfer: 0,
        card: 0,
        cash: 0,
        check: 0,
        giftCardRedeemed: 0,
        houseAccount: 0,
        other: 0,
        fees: 0,
        squarePaymentProcessingFees: 0,
        freeProcessing: 0,
        netTotal: 0
      };

      // Apply scenario-specific logic for specific days
      if (scenario.id === 'deposit-day' || scenario.id === 'invoice-deposit-day' || scenario.id === 'appointment-deposit-day') {
        // Deposit Day: Show deposit on the first day of the range
        if (dayNumber === 1) {
          const depositAmount = scenario.id === 'appointment-deposit-day' ? 50.00 : 100.00;
          data.invoices = scenarioValues.invoices || depositAmount;
          data.totalPaymentsCollected = scenarioValues.totalCollected || depositAmount;
          data.card = scenarioValues.card || depositAmount;
          data.cash = scenarioValues.cash;
          data.bankTransfer = scenarioValues.bankTransfer;
          data.giftCardRedeemed = scenarioValues.giftCard;
          data.houseAccount = scenarioValues.houseAccount;
          data.other = scenarioValues.other;
          data.netTotal = scenarioValues.totalCollected || depositAmount;
        }
      } else if (scenario.id === 'remaining-payment-option-b' || scenario.id === 'invoice-remaining-payment' || scenario.id === 'appointment-remaining-payment') {
        // Remaining Payment: Show gross sales and remaining payment on the first day
        if (dayNumber === 1) {
          const totalAmount = scenario.id === 'appointment-remaining-payment' ? 200.00 : 1000.00;
          const remainingAmount = scenario.id === 'appointment-remaining-payment' ? 150.00 : 900.00;
          const depositAmount = scenario.id === 'appointment-remaining-payment' ? -50.00 : -100.00;
          
          data.grossSales = scenarioValues.grossSales || totalAmount;
          data.items = scenario.id === 'appointment-remaining-payment' ? 0 : (scenarioValues.items || totalAmount);
          data.serviceCharges = scenario.id === 'appointment-remaining-payment' ? totalAmount : scenarioValues.serviceCharges;
          data.returns = scenarioValues.returns;
          data.discountsComps = scenarioValues.discountsComps;
          data.netSales = scenarioValues.netSales || totalAmount;
          data.taxes = scenarioValues.tax;
          data.tips = scenarioValues.tip;
          data.refundsByAmount = scenarioValues.refundsByAmount;
          // Handle Partial Payments Redeemed as negative in deferred sales
          data.invoices = scenarioValues.invoiceDepositRedeemed || depositAmount;
          data.totalSales = totalAmount + depositAmount;
          data.totalPaymentsCollected = scenarioValues.totalCollected || remainingAmount;
          data.card = scenarioValues.card || remainingAmount;
          data.cash = scenarioValues.cash;
          data.bankTransfer = scenarioValues.bankTransfer;
          data.giftCardRedeemed = scenarioValues.giftCard;
          data.houseAccount = scenarioValues.houseAccount;
          data.other = scenarioValues.other;
          data.squarePaymentProcessingFees = 0; // Keep fees at 0 to match summary view
          data.netTotal = scenarioValues.totalCollected || remainingAmount; // No fees deducted
        }
      } else if (scenario.id === 'full-cycle-option-b' || scenario.id === 'invoice-full-cycle' || scenario.id === 'appointment-full-cycle') {
        // Full Cycle: Show deposit on first day and remaining payment on 6th day
        const totalAmount = scenario.id === 'appointment-full-cycle' ? 200.00 : 1000.00;
        const depositAmount = scenario.id === 'appointment-full-cycle' ? 50.00 : 100.00;
        const remainingAmount = scenario.id === 'appointment-full-cycle' ? 150.00 : 900.00;
        
        if (dayNumber === 1) {
          // Deposit day values
          data.invoices = depositAmount;
          data.totalPaymentsCollected = depositAmount;
          data.card = depositAmount;
          data.netTotal = depositAmount;
        } else if (dayNumber === 6) {
          // Final payment day values
          data.grossSales = totalAmount;
          data.items = scenario.id === 'appointment-full-cycle' ? 0 : totalAmount;
          data.serviceCharges = scenario.id === 'appointment-full-cycle' ? totalAmount : 0;
          data.netSales = totalAmount;
          data.invoices = -depositAmount; // Partial Payments Redeemed shows as negative
          data.totalPaymentsCollected = remainingAmount;
          data.card = remainingAmount;
          data.squarePaymentProcessingFees = 0; // Keep fees at 0 to match summary view
          data.netTotal = remainingAmount; // No fees deducted, matches summary
        }
      } else {
        // For other scenarios, show values on the first day
        if (dayNumber === 1) {
          data.grossSales = scenarioValues.grossSales;
          data.items = scenarioValues.items;
          data.serviceCharges = scenarioValues.serviceCharges;
          data.returns = scenarioValues.returns;
          data.discountsComps = scenarioValues.discountsComps;
          data.netSales = scenarioValues.netSales;
          data.giftCardSales = scenarioValues.giftCardSales;
          data.invoices = scenarioValues.invoices + (scenarioValues.invoiceDepositRedeemed || 0);
          data.squareOnline = scenarioValues.squareOnline;
          data.taxes = scenarioValues.tax;
          data.tips = scenarioValues.tip;
          data.refundsByAmount = scenarioValues.refundsByAmount;
          data.totalSales = scenarioValues.grossSales || scenarioValues.invoices || scenarioValues.giftCardSales;
          data.totalPaymentsCollected = scenarioValues.totalCollected;
          data.card = scenarioValues.card;
          data.cash = scenarioValues.cash;
          data.bankTransfer = scenarioValues.bankTransfer;
          data.giftCardRedeemed = scenarioValues.giftCard;
          data.houseAccount = scenarioValues.houseAccount;
          data.other = scenarioValues.other;
          
          if (data.totalPaymentsCollected > 0) {
            data.squarePaymentProcessingFees = -Math.round(data.totalPaymentsCollected * 0.029 * 100) / 100;
            data.netTotal = data.totalPaymentsCollected + data.squarePaymentProcessingFees;
          }
        }
      }

      return data;
    });

    return dailyData;
  };

  const dailyData = generateDailyData();

  const formatCurrency = (amount: number) => {
    if (amount === 0) return '$0.00';
    return amount < 0 ? `($${Math.abs(amount).toFixed(2)})` : `$${amount.toFixed(2)}`;
  };

  return (
    <div className="overflow-x-auto bg-white">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left p-2 border-b font-medium text-gray-700 sticky left-0 bg-gray-50 min-w-[180px]">
              Daily
            </th>
            {dailyData.map((day) => (
              <th key={day.date} className="text-center p-2 border-b font-medium text-gray-700 min-w-[80px]">
                {day.date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Gross Sales Section */}
          <tr className="border-b">
            <td className="p-2 font-medium text-gray-900 sticky left-0 bg-white border-r">
              <div className="flex items-center">
                <span className="mr-2">▼</span>
                Gross sales
              </div>
            </td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.grossSales)}
              </td>
            ))}
          </tr>
          
          <tr>
            <td className="p-2 pl-6 text-gray-600 sticky left-0 bg-white border-r">Items</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.items)}
              </td>
            ))}
          </tr>
          
          <tr>
            <td className="p-2 pl-6 text-gray-600 sticky left-0 bg-white border-r">Service charges</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.serviceCharges)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 pl-8 text-gray-500 sticky left-0 bg-white border-r">sell tip cost</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(0)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 pl-6 text-gray-600 sticky left-0 bg-white border-r">Tax inclusive service charge</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(0)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 pl-6 text-gray-600 sticky left-0 bg-white border-r">Covid service charge</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(0)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 pl-6 text-gray-600 sticky left-0 bg-white border-r">Shipping</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(0)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 pl-6 text-gray-600 sticky left-0 bg-white border-r">Auto gratuity</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(0)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 text-gray-600 sticky left-0 bg-white border-r">Returns</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.returns)}
              </td>
            ))}
          </tr>

          <tr className="border-b">
            <td className="p-2 font-medium text-gray-900 sticky left-0 bg-white border-r">
              <div className="flex items-center">
                <span className="mr-2">▼</span>
                Discounts & comps
              </div>
            </td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.discountsComps)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 font-medium text-gray-900 sticky left-0 bg-white border-r">Net sales</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.netSales)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 text-gray-600 sticky left-0 bg-white border-r">Gift card sales</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.giftCardSales)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 text-gray-600 sticky left-0 bg-white border-r">Taxes</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.taxes)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 text-gray-600 sticky left-0 bg-white border-r">Tips</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.tips)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 text-gray-600 sticky left-0 bg-white border-r">Refunds by amount</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.refundsByAmount)}
              </td>
            ))}
          </tr>

          {/* Deferred Sales Section */}
          <tr className="border-b">
            <td className="p-2 font-medium text-gray-900 sticky left-0 bg-white border-r">
              <div className="flex items-center">
                <span className="mr-2">▼</span>
                Deferred Sales
              </div>
            </td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.invoices + day.giftCardSales)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 pl-6 text-gray-600 sticky left-0 bg-white border-r">Gift Card Sales</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.giftCardSales)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 pl-6 text-gray-600 sticky left-0 bg-white border-r">Partial Payments</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.invoices)}
              </td>
            ))}
          </tr>

          <tr className="border-b bg-yellow-50">
            <td className="p-2 font-bold text-gray-900 sticky left-0 bg-yellow-50 border-r">
              Total *
            </td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r font-bold">
                {formatCurrency(day.grossSales + day.invoices)}
              </td>
            ))}
          </tr>

          {/* Payments Section */}
          <tr className="border-b">
            <td className="p-2 font-medium text-gray-900 sticky left-0 bg-white border-r">
              <div className="flex items-center">
                <span className="mr-2">▼</span>
                Total payments collected
              </div>
            </td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.totalPaymentsCollected)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 pl-6 text-gray-600 sticky left-0 bg-white border-r">Bank Transfer</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.bankTransfer)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 pl-6 text-gray-600 sticky left-0 bg-white border-r">Card</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.card)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 pl-6 text-gray-600 sticky left-0 bg-white border-r">Cash</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.cash)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 pl-6 text-gray-600 sticky left-0 bg-white border-r">Check</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.check)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 pl-6 text-gray-600 sticky left-0 bg-white border-r">Gift Card Redeemed</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.giftCardRedeemed)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 pl-6 text-gray-600 sticky left-0 bg-white border-r">House Account</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.houseAccount)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 pl-6 text-gray-600 sticky left-0 bg-white border-r">Other</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.other)}
              </td>
            ))}
          </tr>

          <tr className="border-b">
            <td className="p-2 font-medium text-gray-900 sticky left-0 bg-white border-r">
              <div className="flex items-center">
                <span className="mr-2">▼</span>
                Fees
              </div>
            </td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.fees)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 pl-6 text-gray-600 sticky left-0 bg-white border-r">Square payment processing fees</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.squarePaymentProcessingFees)}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 pl-6 text-gray-600 sticky left-0 bg-white border-r">Free processing</td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r">
                {formatCurrency(day.freeProcessing)}
              </td>
            ))}
          </tr>

          <tr className="border-t-2 border-gray-800 bg-gray-50">
            <td className="p-2 font-bold text-gray-900 sticky left-0 bg-gray-50 border-r">
              Net total
            </td>
            {dailyData.map((day) => (
              <td key={day.date} className="text-center p-2 border-r font-bold">
                {formatCurrency(day.netTotal)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
