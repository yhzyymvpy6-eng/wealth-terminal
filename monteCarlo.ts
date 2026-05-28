export function runMonteCarlo(initialValue: number, monthlyContribution: number, years = 30) {
  const results = [];
  const annualMean = 0.085;   // 8.5% average annual return
  const annualStdDev = 0.18;  // 18% volatility

  for (let year = 0; year <= years; year += 10) {
    let finalValues: number[] = [];

    for (let i = 0; i < 1000; i++) {
      let value = initialValue;
      const months = year * 12;

      for (let m = 0; m < months; m++) {
        const monthlyReturn = (annualMean / 12) + (annualStdDev / Math.sqrt(12)) * (Math.random() * 2 - 1);
        value = value * (1 + monthlyReturn) + monthlyContribution;
      }
      finalValues.push(Math.max(value, 0));
    }

    finalValues.sort((a, b) => a - b);

    results.push({
      year,
      median: Math.round(finalValues[500]),
      p10: Math.round(finalValues[100]),
      p90: Math.round(finalValues[900])
    });
  }
  return results;
}
