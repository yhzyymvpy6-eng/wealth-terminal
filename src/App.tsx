import { useState } from 'react';
import PortfolioOverview from './components/Dashboard/PortfolioOverview';
import Trading212Importer from './components/Trading212Importer';
import MonteCarloProjections from './components/Projections/MonteCarloProjections';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'import' | 'projections'>('dashboard');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 pb-20">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tighter">WEALTH TERMINAL</h1>
        <p className="text-emerald-400 text-sm">INSTITUTIONAL • OFFLINE</p>
      </header>

      <div className="flex gap-2 mb-8 border-b border-gray-800 pb-4 overflow-x-auto">
        <button onClick={() => setActiveTab('dashboard')} className={`px-6 py-3 rounded-2xl font-medium ${activeTab === 'dashboard' ? 'bg-white text-black' : 'bg-gray-900'}`}>Dashboard</button>
        <button onClick={() => setActiveTab('import')} className={`px-6 py-3 rounded-2xl font-medium ${activeTab === 'import' ? 'bg-white text-black' : 'bg-gray-900'}`}>Import</button>
        <button onClick={() => setActiveTab('projections')} className={`px-6 py-3 rounded-2xl font-medium ${activeTab === 'projections' ? 'bg-white text-black' : 'bg-gray-900'}`}>Forecast</button>
      </div>

      {activeTab === 'dashboard' && <PortfolioOverview />}
      {activeTab === 'import' && <Trading212Importer />}
      {activeTab === 'projections' && <MonteCarloProjections />}
    </div>
  );
}

export default App;
