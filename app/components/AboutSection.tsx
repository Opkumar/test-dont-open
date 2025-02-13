import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-gray-100 py-24">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            About PRASK & ASSOCIATES
          </h2>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-gray-700">
              PRASK & Associates is a premier Chartered Accountants firm
              headquartered in New Delhi, India. Backed by a team of seasoned
              professionals, each partner brings over 17 years of expertise in
              corporate and consulting domains. Beyond our core offerings of
              Statutory and Internal Audits, we specialize in Financial and
              Accounting Services (FAS), Risk Consulting Services, Management
              Consultancy, Litigation Support (Income Tax & GST), and Company
              Incorporation. Our team comprises professionals with extensive
              experience in leading accounting and consulting firms, working
              with corporate houses and MNCs across industries. At PRASK &
              Associates, we are committed to delivering timely solutions,
              industry-specific insights, and a zero non-compliance approach.
              With a strong focus on regulatory frameworks and business
              dynamics, we ensure innovative and tailored solutions for our
              clients.
            </p>
            <div className="flex justify-start">
              <Link href="/about">
                <Button
                  variant="link"
                  className="text-purple-600 hover:text-purple-600/90 bg-transparent uppercase font-semibold text-lg"
                >
                  Read More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff6b00] to-[#ff8f40] opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
