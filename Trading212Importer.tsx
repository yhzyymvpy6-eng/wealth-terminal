import { useState } from 'react';
import Papa from 'papaparse';
import { usePortfolioStore } from '../store/portfolioStore';

export default function Trading212Importer() {
  const { importHoldings } = usePortfolioStore();
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setStatus('Parsing CSV...');

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        console.log("CSV Headers found:", result.meta.fields); // For debugging
        console.log("First row sample:", result.data[0]);

        if (result.data.length === 0) {
          setStatus('❌ CSV file is empty');
          setIsLoading(false);
          return;
        }

        // Try to import
        importHoldings(result.data);
        setStatus(`✅ Successfully imported ${result.data.length} rows!`);
        setIsLoading(false);

        // Clear the input so the same file can be selected again
        e.target.value = '';
      },
      error: (error) => {
        console.error(error);
        setStatus('❌ Error parsing CSV file');
        setIsLoading(false);
      }
    });
  };

  return (
    <div className="glass p-8 rounded-3xl">
      <h2 className="text-2xl font-semibold mb-6">Trading 212 Import</h2>
      <p className="text-gray-400 mb-6">Upload your Trading 212 transactions or holdings CSV</p>
      
      <label className="block border-2 border-dashed border-gray-700 hover:border-emerald-400 rounded-3xl p-16 text-center cursor-pointer transition-colors">
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFile} 
          className="hidden" 
          disabled={isLoading}
        />
        <span className="text-6xl mb-6 block">{isLoading ? '⏳' : '📤'}</span>
        <span className="font-medium text-lg">
          {isLoading ? 'Processing...' : 'Click or tap to upload CSV'}
        </span>
      </label>

      {status && (
        <p className={`mt-8 text-center text-lg ${status.includes('✅') ? 'text-emerald-400' : 'text-red-400'}`}>
          {status}
        </p>
      )}

      <p className="text-xs text-gray-500 text-center mt-10">
        Works completely offline • Data saved locally
      </p>
    </div>
  );
}