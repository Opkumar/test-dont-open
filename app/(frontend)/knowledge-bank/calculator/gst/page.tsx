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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SaleEntry {
  id: number;
  type: "Intra State Sale" | "Inter State Sale";
  rate: number;
  amount: number;
  totalTax: number;
  igst: number;
  cgst: number;
  sgst: number;
  cessRate: number;
  cess: number;
}

const taxRates = [0, 5, 12, 18, 28];

export default function GSTCalculator() {
  const [entries, setEntries] = useState<SaleEntry[]>([
    {
      id: 1,
      type: "Intra State Sale",
      rate: 0,
      amount: 0,
      totalTax: 0,
      igst: 0,
      cgst: 0,
      sgst: 0,
      cessRate: 0,
      cess: 0,
    },
    ...Array(5)
      .fill(null)
      .map((_, i) => ({
        id: i + 2,
        type: "Inter State Sale",
        rate: 0,
        amount: 0,
        totalTax: 0,
        igst: 0,
        cgst: 0,
        sgst: 0,
        cessRate: 0,
        cess: 0,
      })),
  ]);

  const [totals, setTotals] = useState({
    amount: 0,
    tax: 0,
    igst: 0,
    cgst: 0,
    sgst: 0,
    cess: 0,
  });

  const calculateTaxes = (entry: SaleEntry) => {
    const taxAmount = (entry.amount * entry.rate) / 100;
    const cessAmount = (entry.amount * entry.cessRate) / 100;

    if (entry.type === "Inter State Sale") {
      return {
        ...entry,
        totalTax: taxAmount,
        igst: taxAmount,
        cgst: 0,
        sgst: 0,
        cess: cessAmount,
      };
    } else {
      const halfTax = taxAmount / 2;
      return {
        ...entry,
        totalTax: taxAmount,
        igst: 0,
        cgst: halfTax,
        sgst: halfTax,
        cess: cessAmount,
      };
    }
  };

  const updateEntry = (id: number, updates: Partial<SaleEntry>) => {
    setEntries(
      entries.map((entry) => {
        if (entry.id === id) {
          const updatedEntry = { ...entry, ...updates };
          return calculateTaxes(updatedEntry);
        }
        return entry;
      }),
    );
  };

  useEffect(() => {
    const newTotals = entries.reduce(
      (acc, entry) => ({
        amount: acc.amount + entry.amount,
        tax: acc.tax + entry.totalTax,
        igst: acc.igst + entry.igst,
        cgst: acc.cgst + entry.cgst,
        sgst: acc.sgst + entry.sgst,
        cess: acc.cess + entry.cess,
      }),
      {
        amount: 0,
        tax: 0,
        igst: 0,
        cgst: 0,
        sgst: 0,
        cess: 0,
      },
    );
    setTotals(newTotals);
  }, [entries]);

  const handleReset = () => {
    setEntries(
      entries.map((entry) => ({
        ...entry,
        rate: 0,
        amount: 0,
        totalTax: 0,
        igst: 0,
        cgst: 0,
        sgst: 0,
        cessRate: 0,
        cess: 0,
      })),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="bg-[#1a4d8c] text-white text-xl font-semibold py-3 px-6">
            GST Calculator
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left">Type Of Sale</th>
                  <th className="px-4 py-3 text-left">Rate OF Tax</th>
                  <th className="px-4 py-3 text-left">Taxable Amount</th>
                  <th className="px-4 py-3 text-left">Total Tax Amount</th>
                  <th className="px-4 py-3 text-left">IGST</th>
                  <th className="px-4 py-3 text-left">CGST</th>
                  <th className="px-4 py-3 text-left">SGST</th>
                  <th className="px-4 py-3 text-left">Rate of Cess</th>
                  <th className="px-4 py-3 text-left">CESS</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id} className="border-t">
                    <td className="px-4 py-2">
                      <Select
                        value={entry.type}
                        onValueChange={(
                          value: "Intra State Sale" | "Inter State Sale",
                        ) => updateEntry(entry.id, { type: value })}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue>{entry.type}</SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-orange-400">
                          <SelectItem value="Intra State Sale">
                            Intra State Sale
                          </SelectItem>
                          <SelectItem value="Inter State Sale">
                            Inter State Sale
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-2">
                      <Select
                        value={entry.rate.toString()}
                        onValueChange={(value) =>
                          updateEntry(entry.id, { rate: Number(value) })
                        }
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue>{entry.rate}%</SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-orange-400">
                          {taxRates.map((rate) => (
                            <SelectItem key={rate} value={rate.toString()}>
                              {rate}%
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-2">
                      <Input
                        type="number"
                        value={entry.amount || ""}
                        onChange={(e) =>
                          updateEntry(entry.id, {
                            amount: Number(e.target.value),
                          })
                        }
                        className="w-[120px]"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Input
                        type="number"
                        value={entry.totalTax.toFixed(2)}
                        readOnly
                        className="w-[120px] bg-gray-50"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Input
                        type="number"
                        value={entry.igst.toFixed(2)}
                        readOnly
                        className="w-[120px] bg-gray-50"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Input
                        type="number"
                        value={entry.cgst.toFixed(2)}
                        readOnly
                        className="w-[120px] bg-gray-50"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Input
                        type="number"
                        value={entry.sgst.toFixed(2)}
                        readOnly
                        className="w-[120px] bg-gray-50"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Input
                        type="number"
                        value={entry.cessRate || ""}
                        onChange={(e) =>
                          updateEntry(entry.id, {
                            cessRate: Number(e.target.value),
                          })
                        }
                        className="w-[120px]"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Input
                        type="number"
                        value={entry.cess.toFixed(2)}
                        readOnly
                        className="w-[120px] bg-gray-50"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t font-semibold">
                  <td colSpan={2} className="px-4 py-3 text-right">
                    Total Amount :
                  </td>
                  <td className="px-4 py-3">{totals.amount.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    Total Tax : {totals.tax.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    Total IGST : {totals.igst.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    Total CGST : {totals.cgst.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    Total SGST : {totals.sgst.toFixed(2)}
                  </td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3">
                    Total CESS : {totals.cess.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="p-4 flex justify-end">
            <Button variant="destructive" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
