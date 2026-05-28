import { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { runMonteCarlo } from '../../lib/monteCarlo';

export default function MonteCarloProjections() {
  const { totalValue } = usePortfolioStore();
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [results, setResults] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState(30);

  useEffect(() => {
    const simResults = runMonteCarlo(totalValue || 12450, monthlyContribution);
    setResults(simResults);
  }, [totalValue, monthlyContribution]);

  const current = results.find(r => r.year === selectedYear) || results[results.length - 1] || { median: 0, p10: 0, p90: 0 };

  return (
    <div className="glass p-8 rounded-3xl">
      <h2 className="text-2xl font-semibold mb-2">30-Year Wealth Projection</h2>
      <p className="text-gray-400 mb-8">Monte Carlo Simulation • 1,000 paths</p>

      <div className="mb-8">
        <label className="text-sm text-gray-400 block mb-3">
          Monthly Contribution: £{monthlyContribution}
        </label>
        <input 
          type="range" 
          min="0" 
          max="2000" 
          step="50" 
          value={monthlyContribution} 
          onChange={(e) => setMonthlyContribution(Number(e.target.value))} 
          className="w-full accent-emerald-400" 
        />
      </div>

      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {[10, 20, 30].map(y => (
          <button 
            key={y}
            onClick={() => setSelectedYear(y)}
            className={`px-6 py-3 rounded-2xl whitespace-nowrap text-sm font-medium ${selectedYear === y ? 'bg-white text-black' : 'bg-gray-900 hover:bg-gray-800'}`}
          >
            {y} Years
          </button>
        ))}
      </div>

      <div className="text-center mb-8">
        <p className="text-gray-400">Projected Value in {selectedYear} years</p>
        <p className="text-5xl font-semibold text-emerald-400 mt-3">£{current.median.toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass p-5 rounded-2xl text-center">
          <p className="text-xs text-gray-400">Worst 10%</p>
          <p className="text-lg font-semibold mt-1">£{current.p10.toLocaleString()}</p>
        </div>
        <div className="glass p-5 rounded-2xl text-center border border-emerald-400/40">
          <p className="text-xs text-emerald-400">Median</p>
          <p className="text-lg font-semibold mt-1">£{current.median.toLocaleString()}</p>
        </div>
        <div className="glass p-5 rounded-2xl text-center">
          <p className="text-xs text-gray-400">Best 10%</p>
          <p className="text-lg font-semibold mt-1">£{current.p90.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
