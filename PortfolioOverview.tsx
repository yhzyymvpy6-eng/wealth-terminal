import { usePortfolioStore } from '../../store/portfolioStore';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function PortfolioOverview() {
  const { holdings, totalValue } = usePortfolioStore();
  const dailyChange = 234;

  // Totals
  const totalInvested = holdings.reduce((sum, h) => sum + (h.investedValue || 0), 0);
  const totalProfit = totalValue - totalInvested;
  const overallReturn = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;
  const isProfit = totalProfit >= 0;

  const totalQty = holdings.reduce((sum, h) => sum + h.quantity, 0);

  return (
    <>
      {/* Top Summary Card */}
      <div className="glass p-8 mb-6">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <p className="text-gray-400 text-sm">Total Invested</p>
            <p className="text-3xl font-semibold mt-1">£{totalInvested.toLocaleString()}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Current Value</p>
            <p className="text-3xl font-semibold mt-1">£{totalValue.toLocaleString()}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Total Profit</p>
            <p className={`text-3xl font-semibold mt-1 flex items-center gap-2 ${isProfit ? 'text-emerald-400' : 'text-red-400'}`}>
              {isProfit ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              £{Math.abs(totalProfit).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="glass p-6 rounded-3xl">
          <p className="text-sm text-gray-400">YTD Return</p>
          <p className={`text-3xl font-semibold mt-2 ${isProfit ? 'text-emerald-400' : 'text-red-400'}`}>
            {overallReturn >= 0 ? '+' : ''}{overallReturn.toFixed(2)}%
          </p>
        </div>
        <div className="glass p-6 rounded-3xl">
          <p className="text-sm text-gray-400">Est. Annual Income</p>
          <p className="text-3xl font-semibold mt-2">£{Math.round(totalValue * 0.034)}</p>
        </div>
      </div>

      <div className="glass p-6 rounded-3xl">
        <h2 className="text-xl font-semibold mb-6">Current Holdings</h2>
        
        {holdings.map((h, i) => (
          <div key={i} className="grid grid-cols-4 gap-4 py-4 border-t border-gray-800 first:border-0 items-center">
            <div>
              <p className="font-medium">{h.ticker}</p>
              <p className="text-sm text-gray-500">{h.name}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">Qty</p>
              <p className="font-semibold">{h.quantity}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Invested</p>
              <p className="font-semibold">£{(h.investedValue || 0).toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Current Value</p>
              <p className="font-semibold">£{h.value.toLocaleString()}</p>
            </div>
          </div>
        ))}

        {/* Total Row */}
        <div className="grid grid-cols-4 gap-4 py-4 border-t-2 border-gray-400 mt-6 font-semibold">
          <div className="text-lg">Total Holdings</div>
          <div className="text-center text-lg">{totalQty}</div>
          <div className="text-right text-lg">£{totalInvested.toLocaleString()}</div>
          <div className="text-right text-lg">£{totalValue.toLocaleString()}</div>
        </div>
      </div>
    </>
  );
}