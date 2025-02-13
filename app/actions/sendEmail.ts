"use server";

import { transporter } from "@/lib/transporter";

export type QueryFormData = {
  name: string;
  designation: string;
  organization: string;
  officeAddress: string;
  city: string;
  email: string;
  telephone: string;
  mobile: string;
  otherUpdates: "yes" | "no";
  subject: string;
  query: string;
};

export async function sendQueryEmail(data: QueryFormData) {
  try {
    const emailContent = `
      New Query Submission:
      
      Name: ${data.name}
      Designation: ${data.designation}
      Organization: ${data.organization}
      Office Address: ${data.officeAddress}
      City: ${data.city}
      Email: ${data.email}
      Telephone: ${data.telephone}
      Mobile: ${data.mobile}
      Receive Updates: ${data.otherUpdates}
      Subject: ${data.subject}
      
      Query:
      ${data.query}
    `;

    const userEmail = data.email;

    await transporter.sendMail({
      from: userEmail,
      to: process.env.NEXT_PUBLIC_CAREERS_EMAIL_TO,
      subject: `New Query: ${data.subject}`,
      text: emailContent,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: "Failed to send query. Please try again." };
  }
}
