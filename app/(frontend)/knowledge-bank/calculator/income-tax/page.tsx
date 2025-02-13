"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  calculateTaxOldRegime,
  calculateTaxNewRegime,
} from "@/lib/taxCalculations";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface TaxForm {
  name: string;
  financialYear: string;
  status: string;
  gender: string;
  seniorCitizen: string;
  regime: "old" | "new";
  income: {
    salary: number;
    houseProperty: number;
    business: number;
    capitalGains: {
      shortTerm: {
        stt15: number;
        stt20: number;
        others: number;
      };
      longTerm: {
        rate10: number;
        rate125: number;
        rate20: number;
      };
    };
    otherSources: {
      interest: number;
      agriculture: number;
      lottery: number;
    };
  };
  deductions: {
    section80C: number;
    section80D: number;
    section80TTA: number;
    other: number;
  };
  taxPaid: {
    tds: number;
    advance: number;
    selfAssessment: number;
  };
}

export default function IncomeTaxCalculator() {
  const [formData, setFormData] = useState<TaxForm>({
    name: "",
    financialYear: "2024-2025",
    status: "Individual",
    gender: "Male",
    seniorCitizen: "Not Senior C",
    regime: "old",
    income: {
      salary: 0,
      houseProperty: 0,
      business: 0,
      capitalGains: {
        shortTerm: { stt15: 0, stt20: 0, others: 0 },
        longTerm: { rate10: 0, rate125: 0, rate20: 0 },
      },
      otherSources: {
        interest: 0,
        agriculture: 0,
        lottery: 0,
      },
    },
    deductions: {
      section80C: 0,
      section80D: 0,
      section80TTA: 0,
      other: 0,
    },
    taxPaid: {
      tds: 0,
      advance: 0,
      selfAssessment: 0,
    },
  });
  const [calculationResult, setCalculationResult] = useState<{
    totalTax: number;
    regime: string;
  } | null>(null);

  // For top-level or one-level nested updates
  const handleInputChange = (
    section: string,
    field: string,
    value: string | number,
  ) => {
    if (field === "") {
      // Top-level property update (e.g. name, financialYear, etc.)
      setFormData((prev) => ({
        ...prev,
        [section]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section as keyof TaxForm],
          [field]: value,
        },
      }));
    }
  };

  // For deeper nested objects
  const handleNestedInputChange = (
    section: string,
    subsection: string,
    field: string,
    value: number,
    subfield?: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof TaxForm],
        [subsection]: subfield
          ? {
            ...prev[section as keyof TaxForm][subsection],
            [subfield]: {
              ...prev[section as keyof TaxForm][subsection][subfield],
              [field]: value,
            },
          }
          : {
            ...prev[section as keyof TaxForm][subsection],
            [field]: value,
          },
      },
    }));
  };

  const calculateTax = () => {
    // Construct a TaxableIncome object by aggregating incomes.
    const taxableIncome: TaxableIncome = {
      salary: formData.income.salary,
      houseProperty: formData.income.houseProperty,
      business: formData.income.business,
      capitalGains: {
        shortTerm:
          formData.income.capitalGains.shortTerm.stt15 +
          formData.income.capitalGains.shortTerm.stt20 +
          formData.income.capitalGains.shortTerm.others,
        longTerm:
          formData.income.capitalGains.longTerm.rate10 +
          formData.income.capitalGains.longTerm.rate125 +
          formData.income.capitalGains.longTerm.rate20,
      },
      otherSources:
        formData.income.otherSources.interest +
        formData.income.otherSources.agriculture +
        formData.income.otherSources.lottery,
    };

    if (formData.regime === "old") {
      const deduction: Deductions = {
        section80C: formData.deductions.section80C,
        section80D: formData.deductions.section80D,
        section80TTA: formData.deductions.section80TTA,
        other: formData.deductions.other,
      };
      const isSenior = formData.seniorCitizen !== "Not Senior C";
      const result = calculateTaxOldRegime(taxableIncome, deduction, isSenior);
      setCalculationResult({
        totalTax: result.totalTax,
        regime: "Old Regime",
      });
      // console.log("Tax Calculation (Old Regime):", result);
    } else {
      const result = calculateTaxNewRegime(taxableIncome);
      setCalculationResult({
        totalTax: result.totalTax,
        regime: "New Regime [Union Budget 2025]",
      });
      // console.log("Tax Calculation (New Regime) [Union Budget 2025]:", result);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8 pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <h1 className="text-2xl font-bold text-center py-4 border-b">
            Income Tax Calculator
          </h1>

          <div className="p-6 space-y-6">
            {/* Basic Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <Label>Assessee Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    handleInputChange("name", "", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Financial Year</Label>
                <Select
                  value={formData.financialYear}
                  onValueChange={(value) =>
                    handleInputChange("financialYear", "", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status of Tax Payer</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    handleInputChange("status", "", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Individual">Individual</SelectItem>
                    <SelectItem value="HUF">HUF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) =>
                    handleInputChange("gender", "", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Senior Citizen</Label>
                <Select
                  value={formData.seniorCitizen}
                  onValueChange={(value) =>
                    handleInputChange("seniorCitizen", "", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Senior C">
                      Not Senior Citizen
                    </SelectItem>
                    <SelectItem value="Senior C">Senior Citizen</SelectItem>
                    <SelectItem value="Super Senior C">
                      Super Senior Citizen
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Slab Rate Calculation As Per:</Label>
              <RadioGroup
                value={formData.regime}
                onValueChange={(value: "old" | "new") =>
                  handleInputChange("regime", "", value)
                }
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="old" id="old" />
                  <Label htmlFor="old">Old Regime</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new">New Regime</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Income Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                Statement of Income and Tax
              </h2>

              <div className="space-y-4 bg-gray-50 p-4 rounded">
                <h3 className="font-semibold">Income:</h3>

                <div>
                  <Label>
                    Salary (Enter taxable salary after standard deduction of Rs.
                    75000)
                  </Label>
                  <Input
                    type="number"
                    value={formData.income.salary || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "income",
                        "salary",
                        Number(e.target.value),
                      )
                    }
                  />
                </div>

                <div>
                  <Label>Income from House Property</Label>
                  <Input
                    type="number"
                    value={formData.income.houseProperty || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "income",
                        "houseProperty",
                        Number(e.target.value),
                      )
                    }
                  />
                </div>

                {/* Capital Gains */}

                <div className="space-y-2">
                  <h4 className="font-medium">Capital Gains</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>STT @15%</Label>
                      <Input
                        type="number"
                        value={
                          formData.income.capitalGains.shortTerm.stt15 || ""
                        }
                        onChange={(e) =>
                          handleNestedInputChange(
                            "income",
                            "capitalGains",
                            "stt15",
                            Number(e.target.value),
                            "shortTerm",
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label>STT @20%</Label>
                      <Input
                        type="number"
                        value={
                          formData.income.capitalGains.shortTerm.stt20 || ""
                        }
                        onChange={(e) =>
                          handleNestedInputChange(
                            "income",
                            "capitalGains",
                            "stt20",
                            Number(e.target.value),
                            "shortTerm",
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label>Other Short Term</Label>
                      <Input
                        type="number"
                        value={
                          formData.income.capitalGains.shortTerm.others || ""
                        }
                        onChange={(e) =>
                          handleNestedInputChange(
                            "income",
                            "capitalGains",
                            "others",
                            Number(e.target.value),
                            "shortTerm",
                          )
                        }
                      />
                    </div>
                    {/* Long Term Capital Gains */}
                    <div>
                      <Label>Long Term @10%</Label>
                      <Input
                        type="number"
                        value={
                          formData.income.capitalGains.longTerm.rate10 || ""
                        }
                        onChange={(e) =>
                          handleNestedInputChange(
                            "income",
                            "capitalGains",
                            "rate10",
                            Number(e.target.value),
                            "longTerm",
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label>Long Term @12.5%</Label>
                      <Input
                        type="number"
                        value={
                          formData.income.capitalGains.longTerm.rate125 || ""
                        }
                        onChange={(e) =>
                          handleNestedInputChange(
                            "income",
                            "capitalGains",
                            "rate125",
                            Number(e.target.value),
                            "longTerm",
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label>Long Term @20%</Label>
                      <Input
                        type="number"
                        value={
                          formData.income.capitalGains.longTerm.rate20 || ""
                        }
                        onChange={(e) =>
                          handleNestedInputChange(
                            "income",
                            "capitalGains",
                            "rate20",
                            Number(e.target.value),
                            "longTerm",
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label>
                    Income from Other Sources (Interest, Agriculture, Lottery)
                  </Label>
                  <Input
                    type="number"
                    value={formData.income.otherSources.interest || ""}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "income",
                        "otherSources",
                        "interest",
                        Number(e.target.value),
                      )
                    }
                  />
                  {/* You can add separate inputs for agriculture and lottery if desired */}
                </div>
              </div>
            </div>

            {/* Deductions Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                Deduction under chapter VIA:
              </h2>
              <div className="space-y-4 bg-gray-50 p-4 rounded">
                <div>
                  <Label>Deduction u/s 80C,80CCC,80CCD</Label>
                  <Input
                    type="number"
                    value={formData.deductions.section80C || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "deductions",
                        "section80C",
                        Number(e.target.value),
                      )
                    }
                  />
                </div>
                {/* Add other deduction inputs */}
              </div>
            </div>

            {/* Tax Payment Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Detail of Tax Paid:</h2>
              <div className="space-y-4 bg-gray-50 p-4 rounded">
                <div>
                  <Label>Tax Deducted at Source</Label>
                  <Input
                    type="number"
                    value={formData.taxPaid.tds || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "taxPaid",
                        "tds",
                        Number(e.target.value),
                      )
                    }
                  />
                </div>
                {/* Add other tax paid inputs */}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <div className="space-x-4">
                <Button variant="outline" onClick={calculateTax}>
                  Calculate
                </Button>
                <Button variant="outline" onClick={() => window.history.back()}>
                  Back
                </Button>
                <Button variant="outline" onClick={handlePrint}>
                  Print
                </Button>
              </div>
              {/* <Link href="/knowledge-bank/hra-calculator"> */}
              {/*   <Button className="bg-blue-600 hover:bg-blue-700"> */}
              {/*     HRA Calculator */}
              {/*   </Button> */}
              {/* </Link> */}
            </div>
          </div>
        </motion.div>
      </div>

      {calculationResult && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-6 my-4"
        >
          <Alert className="bg-orange-50 border-orange-200">
            <AlertTitle className="text-orange-800">
              Tax Calculation Result ({calculationResult.regime})
            </AlertTitle>
            <AlertDescription className="text-orange-700 text-lg font-semibold">
              Total Tax Payable: ₹
              {calculationResult.totalTax.toLocaleString("en-IN")}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </div>
  );
}
