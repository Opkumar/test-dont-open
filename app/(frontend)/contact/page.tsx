import { Map, PhoneCall, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-[#1a2942]">
          CONTACT INFORMATION
        </h1>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="w-full h-[400px] lg:h-[600px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.1598375339147!2d77.27941131508544!3d28.586333982434987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM1JzE0LjgiTiA3N8KwMTYnNTEuMCJF!5e0!3m2!1sen!2sin!4v1629789876543!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full border-0 rounded-lg shadow-lg"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-gray-700 text-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-2">PRASK & ASSOCIATES</h2>
              <p className="text-xl mb-6">CHARTERED ACCOUNTANTS</p>
              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <Map className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3
                      className="font-semibold mb-2 text-purple-600
                  "
                    >
                      Address
                    </h3>
                    <p className="text-gray-200">
                      B-1 26-27, 3rd floor community centre janakpuri
                      <br />
                      Delhi - 110058
                    </p>
                  </div>
                </div>
                {/* Contact Numbers */}
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <PhoneCall className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-purple-600">
                      Contact No.
                    </h3>
                    <p className="text-gray-200">
                      CA Rahul Paul : +91 9999393126
                    </p>
                    <p className="text-gray-200">
                      CA Prabhjot Singh : +91 9599928202
                    </p>
                    <p className="text-gray-200">
                      CA Sumit Kapoor : +91 9999137533
                    </p>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-purple-600">
                      Email
                    </h3>
                    <p className="text-gray-200">info@prask.in</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Visitor Counter */}
            <div className="bg-[#1a2942] text-white p-4 rounded-lg text-right shadow-lg">
              <p className="text-gray-200">
                <span className="font-semibold text-purple-600">{461564}</span>{" "}
                Times Visited
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
