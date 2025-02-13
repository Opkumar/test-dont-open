export interface TaxableIncome {
  salary: number;
  houseProperty: number;
  business: number;
  capitalGains: {
    shortTerm: number;
    longTerm: number;
  };
  otherSources: number;
}

export interface Deductions {
  section80C: number;
  section80D: number;
  section80TTA: number;
  other: number;
}

// Legacy Old Regime Calculation (previous rates)
export function calculateTaxOldRegime(
  income: TaxableIncome,
  deductions: Deductions,
  isSenior: boolean,
) {
  // Sum up all income sources.
  const totalIncome =
    income.salary +
    income.houseProperty +
    income.business +
    income.capitalGains.shortTerm +
    income.capitalGains.longTerm +
    income.otherSources;

  // Subtract allowed deductions.
  const totalDeductions =
    deductions.section80C +
    deductions.section80D +
    deductions.section80TTA +
    deductions.other;
  const taxableIncome = Math.max(totalIncome - totalDeductions, 0);

  let tax = 0;
  if (!isSenior) {
    if (taxableIncome <= 250000) {
      tax = 0;
    } else if (taxableIncome <= 500000) {
      tax = (taxableIncome - 250000) * 0.05;
    } else if (taxableIncome <= 1000000) {
      tax = 12500 + (taxableIncome - 500000) * 0.2;
    } else {
      tax = 112500 + (taxableIncome - 1000000) * 0.3;
    }
  } else {
    // Senior citizen slabs
    if (taxableIncome <= 300000) {
      tax = 0;
    } else if (taxableIncome <= 500000) {
      tax = (taxableIncome - 300000) * 0.05;
    } else if (taxableIncome <= 1000000) {
      tax = 10000 + (taxableIncome - 500000) * 0.2;
    } else {
      tax = 110000 + (taxableIncome - 1000000) * 0.3;
    }
  }

  const cess = tax * 0.04;
  return {
    taxableIncome,
    basicTax: tax,
    cess,
    totalTax: tax + cess,
  };
}

// New Regime Calculation using Union Budget 2025 slabs
export function calculateTaxNewRegime(income: TaxableIncome) {
  // For salaried individuals, subtract a standard deduction of ₹75,000.
  const netSalary = Math.max(income.salary - 75000, 0);

  const totalIncome =
    netSalary +
    income.houseProperty +
    income.business +
    income.capitalGains.shortTerm +
    income.capitalGains.longTerm +
    income.otherSources;

  let tax = 0;
  if (totalIncome <= 400000) {
    tax = 0;
  } else if (totalIncome <= 800000) {
    tax = (totalIncome - 400000) * 0.05;
  } else if (totalIncome <= 1200000) {
    tax = (800000 - 400000) * 0.05 + (totalIncome - 800000) * 0.1;
  } else if (totalIncome <= 1600000) {
    tax =
      (800000 - 400000) * 0.05 +
      (1200000 - 800000) * 0.1 +
      (totalIncome - 1200000) * 0.15;
  } else if (totalIncome <= 2000000) {
    tax =
      (800000 - 400000) * 0.05 +
      (1200000 - 800000) * 0.1 +
      (1600000 - 1200000) * 0.15 +
      (totalIncome - 1600000) * 0.2;
  } else if (totalIncome <= 2400000) {
    tax =
      (800000 - 400000) * 0.05 +
      (1200000 - 800000) * 0.1 +
      (1600000 - 1200000) * 0.15 +
      (2000000 - 1600000) * 0.2 +
      (totalIncome - 2000000) * 0.25;
  } else {
    tax =
      (800000 - 400000) * 0.05 +
      (1200000 - 800000) * 0.1 +
      (1600000 - 1200000) * 0.15 +
      (2000000 - 1600000) * 0.2 +
      (2400000 - 2000000) * 0.25 +
      (totalIncome - 2400000) * 0.3;
  }

  const cess = tax * 0.04;
  return {
    taxableIncome: totalIncome,
    basicTax: tax,
    cess,
    totalTax: tax + cess,
  };
}
