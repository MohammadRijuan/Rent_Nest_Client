import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "+880 1XXX-XXXXXX",
    description: "Call us for assistance with your rental needs.",
    href: "tel:+8801XXXXXXXXX",
  },
  {
    icon: Mail,
    title: "Email",
    value: "support@rentnest.com",
    description: "Send us your questions and feedback.",
    href: "mailto:support@rentnest.com",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Chattogram, Bangladesh",
    description: "Helping people find their place to call home.",
    href: "https://maps.google.com/?q=Chattogram+Bangladesh",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      {/* Hero */}
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-800">
              <MessageCircle size={16} />
              Contact RentNest
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              We're here to help you
              <span className="text-green-700"> feel at home.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
              Have a question about a property, need help listing your place,
              or want to know more about RentNest? Get in touch with our team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
          {/* Contact details */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-zinc-900">
              Get in touch
            </h2>

            <p className="mt-3 leading-7 text-zinc-600">
              Choose the most convenient way to reach us. We're happy to help
              with your rental journey.
            </p>

            <div className="mt-8 space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.title === "Location" ? "_blank" : undefined}
                    rel={
                      item.title === "Location"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex gap-4"
                  >
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-800 transition group-hover:bg-green-800 group-hover:text-white">
                      <Icon size={21} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-zinc-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-green-800">
                        {item.value}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        {item.description}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-10 rounded-2xl border border-green-100 bg-green-50 p-5">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-green-800" />
                <h3 className="font-semibold text-zinc-900">
                  We're ready to help
                </h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Reach out to us with your questions about finding, renting,
                or listing a property.
              </p>
            </div>
          </div>

          {/* Contact form UI */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-9 lg:col-span-3">
            <h2 className="text-2xl font-bold text-zinc-900">
              Send us a message
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Fill out the form below and tell us how we can help.
            </p>

            <form action="#" method="post" className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-zinc-700"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-zinc-700"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What is your message about?"
                  required
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us how we can help..."
                  required
                  className="w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-800 px-6 py-3.5 font-semibold text-white transition hover:bg-green-900 sm:w-auto"
              >
                Send message
                <ArrowRight size={18} />
              </button>

              <p className="text-xs leading-5 text-zinc-500">
                Please don't include passwords or other sensitive information
                in your message.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl bg-green-900 p-8 sm:p-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Still looking for your next home?
            </h2>
            <p className="mt-3 max-w-xl leading-7 text-green-100">
              Explore available properties and discover a place that fits
              your needs.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-green-900 transition hover:bg-green-50"
          >
            Explore properties
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
