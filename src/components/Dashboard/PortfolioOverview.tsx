import { usePortfolioStore } from '../../store/portfolioStore';
import { TrendingUp } from 'lucide-react';

export default function PortfolioOverview() {
  const { holdings, totalValue } = usePortfolioStore();
  const dailyChange = 234;

  return (
    <>
      <div className="glass p-8 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-400">Total Portfolio Value</p>
            <p className="text-5xl font-semibold mt-2">£{totalValue.toLocaleString()}</p>
          </div>
          <div className="text-5xl">💰</div>
        </div>
        <div className="flex items-center gap-2 mt-6 text-emerald-400">
          <TrendingUp className="w-5 h-5" /> +£{dailyChange} today (+1.8%)
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="glass p-6 rounded-3xl">
          <p className="text-sm text-gray-400">YTD Return</p>
          <p className="text-3xl font-semibold text-emerald-400 mt-2">+18.4%</p>
        </div>
        <div className="glass p-6 rounded-3xl">
          <p className="text-sm text-gray-400">Est. Annual Income</p>
          <p className="text-3xl font-semibold mt-2">£{Math.round(totalValue * 0.034)}</p>
        </div>
      </div>

      <div className="glass p-6 rounded-3xl">
        <h2 className="text-xl font-semibold mb-6">Current Holdings</h2>
        {holdings.length === 0 ? (
          <p className="text-gray-500 py-12 text-center">No holdings loaded.<br />Use Import tab.</p>
        ) : (
          holdings.map((h, i) => (
            <div key={i} className="flex justify-between py-4 border-t border-gray-800 first:border-0">
              <div>
                <p className="font-medium">{h.ticker}</p>
                <p className="text-sm text-gray-500">{h.name}</p>
              </div>
              <div className="text-right">
                <p>£{h.value.toLocaleString()}</p>
                <p className="text-sm text-gray-400">{h.pct}%</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
