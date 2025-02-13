'use client'

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";

const IMPORTANT_DATES = [
  {
    event_date: "01/02/2025",
    act: "Goods and Services Tax",
    applicable_form: "-",
    obligation: "Multi-factor authentication becomes mandatory for turnover above Rs. 5 cr."
  },
  {
    event_date: "07/02/2025",
    act: "Income Tax",
    applicable_form: "Challan No. ITNS-281",
    obligation: "Payment of TDS/TCS of January. In case of government offices where TDS/TCS is paid by book entry, same shall be paid on the same day on which tax is deducted or collected."
  },
  {
    event_date: "07/02/2025",
    act: "FEMA",
    applicable_form: "ECB-2",
    obligation: "Return of External Commercial Borrowings for January."
  },
  {
    event_date: "07/02/2025",
    act: "Income Tax",
    applicable_form: "Challan No. ITNS-285",
    obligation: "Payment of Equalization levy (Google Tax) charged on specified services during January."
  },
  {
    event_date: "10/02/2025",
    act: "Goods and Services Tax",
    applicable_form: "GSTR-7",
    obligation: "Monthly Return by Tax Deductors for January."
  },
  {
    event_date: "10/02/2025",
    act: "Goods and Services Tax",
    applicable_form: "GSTR-8",
    obligation: "Monthly Return by e-commerce operators for January."
  },
  {
    event_date: "11/02/2025",
    act: "Goods and Services Tax",
    applicable_form: "GSTR-1",
    obligation: "Monthly Return of Outward Supplies for January. Manual entry of HSN has been replaced by choosing correct HSN from given dropdown. Also, Table-12 has been bifurcated into two tabs B2B and B2C, to report these supplies separately. Further, warning regarding values of the supplies and tax amounts involved in the same will also be given for both the tabs of Table-12."
  },
  {
    event_date: "13/02/2025",
    act: "Goods and Services Tax",
    applicable_form: "IFF",
    obligation: "Optional Upload of B2B invoices, Dr/Cr notes for January under QRMP scheme."
  },
  {
    event_date: "13/02/2025",
    act: "Goods and Services Tax",
    applicable_form: "GSTR-5",
    obligation: "Monthly Return by Non-resident taxable person for January."
  },
  {
    event_date: "13/02/2025",
    act: "Goods and Services Tax",
    applicable_form: "GSTR-6",
    obligation: "Monthly Return of Input Service Distributor for January."
  },
  {
    event_date: "14/02/2025",
    act: "Income Tax",
    applicable_form: "Form 16B",
    obligation: "Issue of TDS Certificate u/s 194-IA for TDS deducted on Purchase of Property in December."
  },
  {
    event_date: "14/02/2025",
    act: "Income Tax",
    applicable_form: "Form 16C",
    obligation: "Issue of TDS Certificate for tax deducted on rent above 50,000 pm by certain individuals/HUF under Section 194-IB where lease has terminated in December."
  },
  {
    "event_date": "14/02/2025",
    "act": "Income Tax",
    "applicable_form": "Form 16D",
    "obligation": "Issue of TDS Certificate for tax deducted under Section 194M for December."
  },
  {
    "event_date": "15/02/2025",
    "act": "Provident Fund",
    "applicable_form": "ECR",
    "obligation": "Deposit of PF Contribution for January."
  },
  {
    "event_date": "15/02/2025",
    "act": "ESI",
    "applicable_form": "-",
    "obligation": "Deposit of ESI Contribution for January."
  },
  {
    "event_date": "15/02/2025",
    "act": "Income Tax",
    "applicable_form": "Form 24G",
    "obligation": "Due date for furnishing of Form 24G by Government Office where TDS/TCS for January has been paid without the production of a challan."
  },
  {
    "event_date": "20/02/2025",
    "act": "Goods and Services Tax",
    "applicable_form": "GSTR-3B",
    "obligation": "Monthly Summary Return for January for taxpayers having turnover > 5 Cr. in the previous financial year."
  },
  {
    "event_date": "22/02/2025",
    "act": "Goods and Services Tax",
    "applicable_form": "GSTR-3B",
    "obligation": "Monthly Summary Return for January for taxpayers having turnover up to 5 Cr. in the previous financial year in certain states."
  },
  {
    "event_date": "25/02/2025",
    "act": "Goods and Services Tax",
    "applicable_form": "PMT-06",
    "obligation": "Due date of payment of tax for taxpayers under QRMP scheme for January."
  },
  {
    "event_date": "28/02/2025",
    "act": "Income Tax",
    "applicable_form": "Form 26QB",
    "obligation": "Filing of challan-cum-statement for tax deducted u/s 194-IA for January."
  },
  {
    "event_date": "28/02/2025",
    "act": "Income Tax",
    "applicable_form": "Form 26QC",
    "obligation": "Filing of challan-cum-statement for tax deducted u/s 194-IB for January."
  },
  {
    "event_date": "28/02/2025",
    "act": "Income Tax",
    "applicable_form": "Form 26QD",
    "obligation": "Filing of challan-cum-statement for tax deducted u/s 194M for January."
  }
].sort((a, b) => new Date(b.event_date.split("/").reverse().join("-")) - new Date(a.event_date.split("/").reverse().join("-")));

export default function ImportantDates() {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [filteredDates, setFilteredDates] = useState(IMPORTANT_DATES);

  const handleSearch = () => {
    if (!dateFrom || !dateTo) return;

    const filtered = IMPORTANT_DATES.filter((item) => {
      const itemDate = new Date(item.event_date.split("/").reverse().join("-"));
      return itemDate >= dateFrom && itemDate <= dateTo;
    });
    setFilteredDates(filtered);
  };

  const handleReset = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
    setFilteredDates(IMPORTANT_DATES);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8 pt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Event Calendar
              </h1>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                onClick={() => window.open("https://calendar.google.com")}
              >
                View Google Calendar
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date From
                    </label>
                    <Input
                      type="date"
                      value={dateFrom ? format(dateFrom, "yyyy-MM-dd") : ""}
                      onChange={(e) => setDateFrom(new Date(e.target.value))}
                      className="w-40"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      To
                    </label>
                    <Input
                      type="date"
                      value={dateTo ? format(dateTo, "yyyy-MM-dd") : ""}
                      onChange={(e) => setDateTo(new Date(e.target.value))}
                      className="w-40"
                    />
                  </div>
                  <div className="flex gap-2 self-end">
                    <Button variant={"outline"} onClick={handleSearch}>
                      Search
                    </Button>
                    <Button variant="outline" onClick={handleReset}>
                      Reset
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-red-600">
                  Note *: Please provide google authentication details to add
                  all events in Google Calendar At once / Click on single Event
                  to add Event in Google Calendar manually.
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                  className="rounded-md border w-full max-w-xs mx-auto"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead className="font-semibold text-blue-900">Event Date</TableHead>
                    <TableHead className="font-semibold text-blue-900">Act</TableHead>
                    <TableHead className="font-semibold text-blue-900">Applicable Form</TableHead>
                    <TableHead className="font-semibold text-blue-900">Obligation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDates.map((item, index) => (
                    <TableRow 
                      key={index}
                      className="transition-colors duration-200 hover:bg-blue-50 bg-white even:bg-slate-50"
                    >
                      <TableCell className="font-medium whitespace-nowrap">{item.event_date}</TableCell>
                      <TableCell className="whitespace-nowrap">{item.act}</TableCell>
                      <TableCell className="whitespace-nowrap">{item.applicable_form}</TableCell>
                      <TableCell className="max-w-xl">{item.obligation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 text-sm text-red-600 border-t pt-4">
              Note : Please note that this is not an exhaustive list of
              obligations under various laws. Important ones have been compiled
              to serve as a Ready Reckoner. Users are requested to reconfirm
              dates with authentic government sources in case of doubt & also
              keep track of changes, if any. We do not undertake any
              responsibility for inadvertent errors, omissions or subsequent
              changes, if any.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}