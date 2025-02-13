interface ServiceData {
  name: string;
  banner: string;
  description: string;
  keyServices: {
    title: string;
    description: string;
  }[];
}

const servicesData: Record<string, ServiceData> = {
  "financial-and-accounting-services": {
    name: "Financial and Accounting Services (FAS)",
    banner: "/assets/services/fas-banner.jpg",
    description:
      "PRASK's FAS team provides financial insights and tools to support CFOs, controllers, and treasurers with compliance and reporting. Our goal is to inspire confidence, meet changing market conditions, ensure transparency, and address evolving economic and regulatory requirements.",
    keyServices: [
      {
        title: "Record-to-Report Solutions",
        description:
          "We streamline your financial closing process, ensuring accuracy and efficiency in your reporting cycle.",
      },
      {
        title: "Transaction Accounting",
        description:
          "Our expert team assists in maintaining accurate financial transaction records using advanced technologies and best practices.",
      },
      {
        title: "Treasury Services",
        description:
          "Optimize cash flow, manage financial risks, and enhance investment strategies for your organization's growth.",
      },
      {
        title: "Corporate Governance",
        description:
          "Implement robust governance structures to meet compliance requirements and enhance reputation.",
      },
      {
        title: "Data Analytics and Innovation",
        description:
          "Transform financial data into actionable insights to drive strategic growth initiatives.",
      },
    ],
  },
  "risk-consulting-services": {
    name: "Risk Consulting Services",
    banner: "/assets/services/risk-consulting-banner.jpg",
    description:
      "PRASK’s Risk Consulting Services go beyond traditional internal audits, offering tailored advisory to manage risks and achieve financial objectives.",
    keyServices: [
      {
        title: "Risk Control & Management",
        description:
          "Virtual services to control costs, reduce risks, and ensure financial stability.",
      },
      {
        title: "Strategic Planning and Management Reporting",
        description:
          "Align business operations with financial strategies for improved decision-making.",
      },
      {
        title: "Internal Financial Control Implementation",
        description:
          "Develop and implement compliance systems to strengthen internal controls.",
      },
      {
        title: "Process Development & SOP Implementation",
        description:
          "Create and implement standardized procedures for operational efficiency.",
      },
      {
        title: "Budgeting, Forecasting, and Cost Reduction",
        description:
          "Enhance financial planning and operational optimization for sustainable growth.",
      },
    ],
  },
  "virtual-cfo-services": {
    name: "Virtual CFO Services",
    banner: "/assets/services/virtual-cfo-banner.jpg",
    description:
      "PRASK’s Virtual CFO Services provide short-term advisory and controllership support during transitions or critical phases.",
    keyServices: [
      {
        title: "Accounting Solutions",
        description:
          "Ensure precise and efficient bookkeeping tailored to your business needs.",
      },
      {
        title: "Performance Management Systems (PMS)",
        description:
          "Assist with system implementation, expansion strategies, and cost reduction initiatives.",
      },
      {
        title: "Regulatory Compliance Services",
        description:
          "Expertise in RBI and FEMA compliances for seamless regulatory adherence.",
      },
      {
        title: "Tax and Transfer Pricing Services",
        description:
          "Manage tax filings and resolve disputes effectively with comprehensive advisory.",
      },
      {
        title: "Capital Market Advisory",
        description:
          "Provide guidance on IPOs and other capital market transactions for SMEs.",
      },
    ],
  },
  "management-consulting": {
    name: "Management Consultancy",
    banner: "/assets/services/management-consulting-banner.jpg",
    description:
      "PRASK’s Management Consultancy services focus on mergers, acquisitions, and restructuring with a holistic approach.",
    keyServices: [
      {
        title: "Mergers & Acquisitions",
        description:
          "Provide strategic and operational advisory for successful mergers and acquisitions.",
      },
      {
        title: "Due Diligence",
        description:
          "Conduct financial and tax diligence to ensure informed decision-making.",
      },
      {
        title: "Transaction Structuring",
        description:
          "Design efficient deal structures to maximize organizational value.",
      },
      {
        title: "Insolvency Advisory",
        description:
          "Offer guidance under the Insolvency and Bankruptcy Code (IBC) 2016.",
      },
      {
        title: "Post-Merger Integration",
        description:
          "Ensure smooth transitions and integration following mergers or acquisitions.",
      },
    ],
  },
  registrations: {
    name: "Registrations",
    banner: "/assets/services/registrations-banner.jpg",
    description:
      "PRASK assists domestic and international businesses with incorporation and compliance in India.",
    keyServices: [
      {
        title: "Domestic Entity Registration",
        description: "Set up companies, LLPs, and joint ventures efficiently.",
      },
      {
        title: "Foreign Entity Registration",
        description:
          "Establish liaison, branch, or project offices in India with expert guidance.",
      },
      {
        title: "Startup Registration",
        description:
          "Navigate government initiatives like 'Make in India' with ease.",
      },
      {
        title: "Regulatory Registrations",
        description:
          "Handle registrations such as FSSAI, PF, ESI, trade licenses, MSME, and trademarks.",
      },
    ],
  },
  "tax-advisory-services": {
    name: "Tax Advisory Services",
    banner: "/assets/services/tax-advisory-banner.jpg",
    description:
      "PRASK’s Tax Advisory Services help businesses navigate complex tax environments while ensuring compliance.",
    keyServices: [
      {
        title: "Tax Policy Trends Analysis",
        description:
          "Prepare for tax changes by understanding emerging policy trends.",
      },
      {
        title: "Cross-Border Tax Planning",
        description:
          "Handle international tax transactions with efficiency and expertise.",
      },
      {
        title: "Dispute Resolution",
        description:
          "Act as a bridge between tax authorities and businesses to resolve disputes.",
      },
      {
        title: "Tax Compliance and Filing",
        description: "Ensure timely and accurate tax submissions.",
      },
      {
        title: "Tax Benefits Advisory",
        description:
          "Leverage central and state government incentives for business growth.",
      },
    ],
  },
  "audit-and-compliance": {
    name: "Audit & Compliance",
    banner: "/assets/services/audit-compliance-banner.jpg",
    description:
      "PRASK provides comprehensive audit services to maintain compliance and enhance operational efficiency.",
    keyServices: [
      {
        title: "Statutory and Tax Audits",
        description:
          "Ensure legal and financial adherence through meticulous audits.",
      },
      {
        title: "Internal and Process Audits",
        description:
          "Identify inefficiencies and improve operational processes.",
      },
      {
        title: "Management Audits",
        description:
          "Strategic analysis of business functions for informed decision-making.",
      },
      {
        title: "Secretarial and Stock Audits",
        description:
          "Focus on governance and inventory management to mitigate risks.",
      },
      {
        title: "FEMA & RBI Compliance",
        description:
          "Guidance on compliance for both international and domestic transactions.",
      },
    ],
  },
};

export function getServiceData(serviceName: string): ServiceData | undefined {
  return servicesData[serviceName];
}
