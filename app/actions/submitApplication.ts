"use server";

import { writeFile } from "fs/promises";
import { join } from "path";
import { transporter } from "@/lib/transporter";

export type ApplicationFormData = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: string;
  position: string;
  dateOfBirth: string;
  qualification: string;
  portfolioWebsite: string;
  lastCompany: string;
  experienceYear: string;
  experienceMonth: string;
  reference: string;
  resume: File;
};

export async function submitApplication(formData: FormData) {
  try {
    const file = formData.get("resume") as File;
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = join(process.cwd(), "uploads", fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    const userEmail = formData.get("email");
    console.log(userEmail);

    const applicationData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      mobile: formData.get("mobile"),
      gender: formData.get("gender"),
      position: formData.get("position"),
      dateOfBirth: formData.get("dateOfBirth"),
      qualification: formData.get("qualification"),
      portfolioWebsite: formData.get("portfolioWebsite"),
      lastCompany: formData.get("lastCompany"),
      experienceYear: formData.get("experienceYear"),
      experienceMonth: formData.get("experienceMonth"),
      reference: formData.get("reference"),
    };

    const emailContent = `
      New Job Application:
      
      Name: ${applicationData.firstName} ${applicationData.lastName}
      Email: ${applicationData.email}
      Mobile: ${applicationData.mobile}
      Gender: ${applicationData.gender}
      Position: ${applicationData.position}
      Date of Birth: ${applicationData.dateOfBirth}
      Qualification: ${applicationData.qualification}
      Portfolio: ${applicationData.portfolioWebsite}
      Last Company: ${applicationData.lastCompany}
      Experience: ${applicationData.experienceYear} years ${applicationData.experienceMonth} months
      
      Reference/Comments:
      ${applicationData.reference}
    `;

    await transporter.sendMail({
      from: userEmail as string,
      to: process.env.CAREERS_EMAIL_TO,
      subject: `New Job Application: ${applicationData.position}`,
      text: emailContent,
      attachments: [
        {
          filename: file.name,
          path: filePath,
        },
      ],
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to submit application:", error);
    return {
      success: false,
      error: "Failed to submit application. Please try again.",
    };
  }
}
