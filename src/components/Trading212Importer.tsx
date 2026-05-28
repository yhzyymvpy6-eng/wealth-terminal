import { useState } from 'react';
import Papa from 'papaparse';
import { usePortfolioStore } from '../store/portfolioStore';

export default function Trading212Importer() {
  const { importHoldings } = usePortfolioStore();
  const [status, setStatus] = useState('');

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        importHoldings(result.data);
        setStatus('✅ Portfolio imported successfully!');
        setTimeout(() => setStatus(''), 4000);
      }
    });
  };

  return (
    <div className="glass p-8 rounded-3xl">
      <h2 className="text-2xl font-semibold mb-6">Trading 212 Import</h2>
      <label className="block border-2 border-dashed border-gray-700 hover:border-emerald-400 rounded-3xl p-16 text-center cursor-pointer transition-colors">
        <input type="file" accept=".csv" onChange={handleFile} className="hidden" />
        <span className="text-6xl mb-6 block">📤</span>
        <span className="font-medium text-lg">Tap / Click to upload CSV</span>
      </label>
      {status && <p className="mt-8 text-center text-lg">{status}</p>}
    </div>
  );
}
