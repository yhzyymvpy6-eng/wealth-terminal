import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Holding {
  ticker: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  value: number;           // Current Value
  investedValue: number;
  pct: number;
}

interface PortfolioState {
  holdings: Holding[];
  totalValue: number;
  setHoldings: (holdings: Holding[]) => void;
  importHoldings: (data: any[]) => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      holdings: [],
      totalValue: 6250,

      setHoldings: (holdings) => {
        const total = holdings.reduce((sum, item) => sum + (item.value || 0), 0);
        set({ holdings, totalValue: total });
      },

      importHoldings: (data) => {
        const mapped = data
          // Skip the Total / Growth row
          .filter(row => row && 
                  row.Slice && 
                  row.Slice !== "Total" && 
                  row.Name !== "Total" && 
                  row.Name !== "Growth+dividend")
          .map((row: any, index: number) => {
            const ticker = (row.Slice || "").toUpperCase();
            const name = row.Name || "Unknown Asset";

            const quantity = parseFloat(row["Owned quantity"]) || parseFloat(row["Owned q"]) || 1;
            const investedValue = parseFloat(row["Invested value"]) || parseFloat(row["Invested £ Value"]) || 0;

            // Strong preference for the "value" column as requested
            let currentValue = parseFloat(row["value"]) || 
                              parseFloat(row.Value) || 
                              parseFloat(row.Result) || 
                              investedValue;

            return {
              ticker: ticker || `ASSET${index}`,
              name: name,
              quantity: quantity,
              avgPrice: investedValue / quantity || 100,
              currentPrice: currentValue / quantity || 100,
              value: currentValue,
              investedValue: investedValue,
              pct: 0
            };
          });

        const totalValue = mapped.reduce((sum: number, item: any) => sum + item.value, 0);

        set({ 
          holdings: mapped,
          totalValue: totalValue
        });
      }
    }),
    { name: 'wealth-terminal-storage' }
  )
);