"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

// Predefined TDS rates
const sections = {
  "194C": { withPAN: 1, withoutPAN: 20 },
  "194D": { withPAN: 5, withoutPAN: 20 },
  "194I": { withPAN: 10, withoutPAN: 20 },
  "194J": { withPAN: 10, withoutPAN: 20 },
  "194H": { withPAN: 5, withoutPAN: 20 },
  "194A": { withPAN: 10, withoutPAN: 20 },
  "194B": { withPAN: 30, withoutPAN: 30 },
  "194BB": { withPAN: 30, withoutPAN: 30 },
  "194LA": { withPAN: 10, withoutPAN: 20 },
  "194LBA": { withPAN: 10, withoutPAN: 20 },
  "194LBB": { withPAN: 10, withoutPAN: 20 },
  "194LBC": { withPAN: 25, withoutPAN: 30 },
  "194N": { withPAN: 2, withoutPAN: 20 },
  "194O": { withPAN: 1, withoutPAN: 20 },
  "194P": { withPAN: 2, withoutPAN: 20 },
  "194Q": { withPAN: 0.1, withoutPAN: 5 },
  "206C": { withPAN: 1, withoutPAN: 5 },
  "192": { withPAN: 10, withoutPAN: 20 },
  "193": { withPAN: 10, withoutPAN: 20 },
  "194": { withPAN: 10, withoutPAN: 20 },
  "194DA": { withPAN: 5, withoutPAN: 20 },
  "194EE": { withPAN: 10, withoutPAN: 20 },
  "194F": { withPAN: 20, withoutPAN: 20 },
  "194G": { withPAN: 5, withoutPAN: 20 },
  "206C": { withPAN: 1, withoutPAN: 5 },
};

export default function TDSCalculator() {
  const [section, setSection] = useState("");
  const [panQuoted, setPanQuoted] = useState("Yes");
  const [rate, setRate] = useState(15);
  const [amount, setAmount] = useState(6250);
  const [tax, setTax] = useState(937.5);

  // Handle section change
  const handleSectionChange = (e) => {
    const selectedSection = e.target.value;
    setSection(selectedSection);

    if (selectedSection && sections[selectedSection]) {
      const applicableRate =
        panQuoted === "Yes"
          ? sections[selectedSection].withPAN
          : sections[selectedSection].withoutPAN;
      setRate(applicableRate);
    } else {
      setRate(0);
    }
  };

  // Handle PAN toggle
  const handlePanChange = (value: string) => {
    setPanQuoted(value);
    if (section && sections[section as keyof typeof sections]) {
      const applicableRate =
        value === "Yes"
          ? sections[section as keyof typeof sections].withPAN
          : sections[section as keyof typeof sections].withoutPAN;
      setRate(applicableRate);
    }
  };

  // Calculate tax whenever rate or amount changes
  useEffect(() => {
    const calculatedTax = (amount * rate) / 100;
    setTax(calculatedTax);
  }, [rate, amount]);

  return (
    <div className="min-h-screen bg-gray-50 pb-8 pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[#1a4d8c] text-white text-xl font-semibold py-2 px-6 text-center">
              TDS Calculator
            </div>

            <div className="p-6 space-y-6">
              {/* Section Selection */}
              <div className="mb-4">
                <label className="block font-medium mb-2">Section</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={section}
                  onChange={handleSectionChange}
                >
                  <option value="">Select</option>
                  <option value="194C">194C, Payment to Transporter</option>
                  <option value="194D">194D, Insurance Commission</option>
                  <option value="194I">194I, Rent on Land and Building</option>
                  <option value="194J">194J, Fee for Technical Services</option>
                  <option value="194H">194H, Commission</option>
                  <option value="194A">
                    194A, Interest other than Securities
                  </option>
                  <option value="194B">194B, Lottery</option>
                  <option value="194BB">194BB, Winning from Horse Race</option>
                  <option value="194LA">
                    194LA, Compensation for Land Acquisition
                  </option>
                  <option value="194LBA">
                    194LBA, Income from Units of REIT
                  </option>
                  <option value="194LBB">
                    194LBB, Income from Units of Investment Trust
                  </option>
                  <option value="194LBC">
                    194LBC, Income from Investment Fund
                  </option>
                  <option value="194N">194N, Cash Withdrawal</option>
                  <option value="194O">194O, Payment for E-commerce</option>
                  <option value="194P">
                    194P, Senior Citizens Tax Deduction
                  </option>
                  <option value="194Q">194Q, Purchase of Goods</option>
                  <option value="206C">206C, Scrap Sales</option>
                  <option value="192">192, Salary</option>
                  <option value="193">193, Interest on Securities</option>
                </select>
              </div>

              {/* PAN Quoted */}
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <label className="text-right text-sm font-medium">
                  PAN quoted by deductee:
                </label>
                <Select value={panQuoted} onValueChange={handlePanChange}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rate Slider */}
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <label className="text-right text-sm font-medium">Rate:</label>
                <div className="flex items-center gap-4">
                  <div className="w-[60px]">
                    <input
                      type="text"
                      value={`${rate}%`}
                      className="w-full p-1 text-center border rounded"
                      readOnly
                    />
                  </div>
                  <div className="flex-1">
                    <Slider
                      value={[rate]}
                      onValueChange={([value]) => setRate(value)}
                      max={30}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Amount Slider */}
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <label className="text-right text-sm font-medium">
                  Amount:
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-[80px]">
                    <input
                      type="text"
                      value={amount.toFixed(0)}
                      className="w-full p-1 text-center border rounded"
                      readOnly
                    />
                  </div>
                  <div className="flex-1">
                    <Slider
                      value={[amount]}
                      onValueChange={([value]) => setAmount(value)}
                      max={100000}
                      step={100}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Tax Result */}
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <label className="text-right text-sm font-medium">Tax:</label>
                <div className="w-[120px]">
                  <input
                    type="text"
                    value={tax.toFixed(1)}
                    className="w-full p-1 text-center border rounded bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
