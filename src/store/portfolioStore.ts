import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Holding {
  ticker: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
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
      totalValue: 12450,
      setHoldings: (holdings) => {
        const total = holdings.reduce((sum, item) => sum + (item.value || 0), 0);
        set({ holdings, totalValue: total });
      },
      importHoldings: (data) => {
        const mapped = data.slice(0, 10).map((item: any, i: number) => ({
          ticker: item.ticker || `ASSET${i}`,
          name: item.name || "Imported Asset",
          quantity: Number(item.quantity) || 10,
          avgPrice: Number(item.price) || 100,
          currentPrice: Number(item.price) * 1.12 || 112,
          value: Number(item.value) || 1250,
          pct: 12
        }));
        const total = mapped.reduce((sum: number, item: any) => sum + item.value, 0);
        set({ holdings: mapped, totalValue: total });
      }
    }),
    { name: 'wealth-terminal-storage' }
  )
);
