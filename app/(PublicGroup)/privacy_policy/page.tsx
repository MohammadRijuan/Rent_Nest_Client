import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-editorial min-h-screen bg-[#fbfaf6]">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          

          <div className="flex size-14 items-center justify-center rounded-2xl bg-green-100 text-green-800">
            <ShieldCheck size={28} />
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-zinc-600">
            Your privacy matters to us. Learn how RentNest collects, uses, and
            protects your information.
          </p>

          <p className="mt-4 text-sm text-zinc-500">
            Last updated: October 26, 2026
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 sm:py-16">
        <section>
          <h2 className="text-2xl font-bold text-zinc-900">
            1. Introduction
          </h2>
          <p className="mt-4 leading-7 text-zinc-600">
            RentNest is a property rental platform designed to help people
            discover rental properties and connect with property owners or
            their representatives. This Privacy Policy explains how we handle
            personal information when you use our website, create an account,
            contact us, or interact with property listings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900">
            2. Information We Collect
          </h2>
          <p className="mt-4 leading-7 text-zinc-600">
            Depending on how you use RentNest, we may collect the following
            categories of information:
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-zinc-600">
            <li>
              <strong className="text-zinc-800">Account information:</strong>{" "}
              Your name, email address, phone number, and authentication
              details when you register or update your account.
            </li>
            <li>
              <strong className="text-zinc-800">Property information:</strong>{" "}
              Property descriptions, photographs, rental prices, addresses,
              amenities, and other details submitted by property owners.
            </li>
            <li>
              <strong className="text-zinc-800">Communications:</strong>{" "}
              Messages, inquiries, feedback, and information you provide when
              contacting us or property owners.
            </li>
            <li>
              <strong className="text-zinc-800">Usage information:</strong>{" "}
              Information about interactions with the website, such as pages
              visited and technical diagnostic data, where collected.
            </li>
            <li>
              <strong className="text-zinc-800">Technical information:</strong>{" "}
              Device, browser, and log information that may be collected to
              maintain website security and functionality.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900">
            3. How We Use Your Information
          </h2>
          <p className="mt-4 leading-7 text-zinc-600">
            We may use personal information to:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-zinc-600">
            <li>Create and manage user accounts.</li>
            <li>Display, manage, and moderate property listings.</li>
            <li>Help users communicate about rental properties.</li>
            <li>Respond to questions, inquiries, and support requests.</li>
            <li>Maintain platform security and prevent fraud or misuse.</li>
            <li>Improve website features, performance, and usability.</li>
            <li>Meet applicable legal obligations and enforce our policies.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900">
            4. Sharing of Information
          </h2>
          <p className="mt-4 leading-7 text-zinc-600">
            We do not sell personal information as part of our intended
            operating practices. We may share information when necessary to
            provide the service, including:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-zinc-600">
            <li>
              With property owners or relevant representatives when you submit
              an inquiry or request contact about a listing.
            </li>
            <li>
              With service providers supporting hosting, databases, security,
              communications, and website operations.
            </li>
            <li>
              With authorized personnel responsible for platform
              administration and moderation.
            </li>
            <li>
              When required by law or reasonably necessary to protect rights,
              safety, and platform security.
            </li>
          </ul>
          <p className="mt-4 leading-7 text-zinc-600">
            We aim to limit sharing to information reasonably necessary for
            the relevant purpose.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900">
            5. Cookies and Similar Technologies
          </h2>
          <p className="mt-4 leading-7 text-zinc-600">
            RentNest may use cookies or similar technologies to maintain
            sessions, support authentication, remember preferences, improve
            security, and understand website usage. The technologies used
            depend on the features enabled on the platform. You can manage
            cookies through your browser settings, although disabling some
            cookies may affect website functionality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900">
            6. Data Security
          </h2>
          <p className="mt-4 leading-7 text-zinc-600">
            We take reasonable technical and organizational measures to
            protect information against unauthorized access, alteration,
            disclosure, or destruction. However, no internet transmission or
            storage system can be guaranteed to be completely secure. Users
            should protect their login credentials and avoid sending sensitive
            information through public listing inquiries.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900">
            7. Data Retention
          </h2>
          <p className="mt-4 leading-7 text-zinc-600">
            We retain information for as long as reasonably necessary to
            operate the platform, maintain accounts and records, resolve
            disputes, enforce policies, and comply with legal obligations.
            Retention periods may vary depending on the type of information
            and the reason it was collected.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900">
            8. Your Choices and Rights
          </h2>
          <p className="mt-4 leading-7 text-zinc-600">
            Subject to applicable law, you may request access to, correction
            of, or deletion of your personal information. You may also contact
            us with questions about how your information is handled. Some
            information may need to be retained where required by law or for
            legitimate operational purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900">
            9. Third-Party Services and Links
          </h2>
          <p className="mt-4 leading-7 text-zinc-600">
            Our website may link to third-party websites or use external
            services. Those services may have their own privacy policies and
            practices. RentNest is not responsible for the privacy practices
            of independent third parties. Please review their policies before
            sharing information with them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900">
            10. Children&apos;s Privacy
          </h2>
          <p className="mt-4 leading-7 text-zinc-600">
            RentNest is not intended to knowingly collect personal information
            from children where doing so would violate applicable law. If you
            believe a child has provided personal information inappropriately,
            contact us so we can review the matter.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900">
            11. Changes to This Policy
          </h2>
          <p className="mt-4 leading-7 text-zinc-600">
            We may update this Privacy Policy as our services or legal
            obligations change. Updates will be posted on this page with a
            revised date. Continued use of the platform after an update is
            subject to applicable law.
          </p>
        </section>

        <section className="rounded-2xl border border-green-200 bg-green-50 p-6">
          <h2 className="text-xl font-bold text-zinc-900">
            12. Contact Us
          </h2>
          <p className="mt-3 leading-7 text-zinc-600">
            If you have questions about this Privacy Policy or your personal
            information, contact the RentNest team.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-2 font-semibold text-green-800 hover:text-green-900"
          >
            Contact RentNest
            <span aria-hidden="true">→</span>
          </Link>
        </section>
      </article>
    </main>
  );
}
