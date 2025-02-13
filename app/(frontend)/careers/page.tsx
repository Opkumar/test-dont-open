"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { submitApplication } from "@/app/actions/submitApplication";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 1024 * 1024; // 1MB

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Valid mobile number is required"),
  gender: z.string().min(1, "Please select gender"),
  position: z.string().min(1, "Position is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  qualification: z.string().min(1, "Qualification is required"),
  portfolioWebsite: z.string().url().optional(),
  lastCompany: z.string(),
  experienceYear: z.string(),
  experienceMonth: z.string(),
  reference: z.string(),
  resume: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Resume is required")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Max file size is 1MB",
    )
    .optional(),
});

const years = Array.from({ length: 41 }, (_, i) => i.toString());
const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

export default function CareersPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === "resume") {
          formData.append(key, (value as FileList)[0]);
        } else {
          formData.append(key, value as string);
        }
      });

      const result = await submitApplication(formData);
      if (result.success) {
        toast({
          title: "Application Submitted",
          description:
            "We will review your application and get back to you soon.",
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description:
            result.error || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  }

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-center mb-4">-Apply Here-</h1>
          <p className="text-center text-gray-600 mb-8">
            We nurture and cultivate a sense of pride in the work and create
            team leaders. Your growth chart will be governed by well-defined
            transparent policies of the firm. Apply via the form given below and
            meet us for face to face interview.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile No. *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position you are applying for</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Of Birth (DD/MM/YYYY) *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="qualification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Highest Qualification</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="portfolioWebsite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Portfolio website</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="http://" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField */}
                {/*   control={form.control} */}
                {/*   name="resume" */}
                {/*   render={({ field: { onChange, ...field } }) => ( */}
                {/*     <FormItem> */}
                {/*       <FormLabel>Upload Resume * ( Max size 1 mb )</FormLabel> */}
                {/*       <FormControl> */}
                {/*         <Input */}
                {/*           type="file" */}
                {/*           accept=".pdf,.doc,.docx" */}
                {/*           onChange={(e) => onChange(e.target.files)} */}
                {/*           {...field} */}
                {/*         /> */}
                {/*       </FormControl> */}
                {/*       <FormMessage /> */}
                {/*     </FormItem> */}
                {/*   )} */}
                {/* /> */}

                <FormField
                  control={form.control}
                  name="lastCompany"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last company you worked for</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="experienceYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years Of Experience</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experienceMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Month</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {months.map((month) => (
                              <SelectItem key={month} value={month}>
                                {month}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reference / Comments / Questions</FormLabel>
                    <FormControl>
                      <Textarea rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center">
                <Button variant="outline" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending Application..." : "Send Application"}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Visitor Counter */}
        {/* <div className="text-right mt-4 text-gray-600"> */}
        {/*   <span>{461564} Times Visited</span> */}
        {/* </div> */}
      </div>
    </div>
  );
}
