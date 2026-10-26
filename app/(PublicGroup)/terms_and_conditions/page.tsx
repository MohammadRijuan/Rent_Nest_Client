
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-[#FAFAF7]">
            <section className="border-b border-zinc-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">

                    <div className="flex size-14 items-center justify-center rounded-2xl bg-green-100 text-green-800">
                        <FileText size={28} />
                    </div>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
                        Terms &amp; Conditions
                    </h1>

                    <p className="mt-4 text-zinc-600">
                        Please read these terms before using RentNest.
                    </p>

                    <p className="mt-4 text-sm text-zinc-500">
                        Last updated: October 26, 2026
                    </p>
                </div>
            </section>

            <article className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 sm:py-16">
                <section>
                    <h2 className="text-2xl font-bold text-zinc-900">
                        1. Acceptance of Terms
                    </h2>
                    <p className="mt-4 leading-7 text-zinc-600">
                        These Terms and Conditions govern your access to and use of
                        RentNest, a platform for discovering rental properties and
                        connecting prospective tenants with property owners or their
                        representatives. By accessing or using RentNest, you agree to
                        these terms. If you do not agree, please do not use the platform.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-zinc-900">
                        2. About RentNest
                    </h2>
                    <p className="mt-4 leading-7 text-zinc-600">
                        RentNest provides tools for publishing, discovering, and inquiring
                        about rental property listings. Unless explicitly stated otherwise,
                        RentNest acts as a platform connecting users and is not itself the
                        owner, landlord, tenant, or legal representative of every listed
                        property. A listing or inquiry does not guarantee availability,
                        approval, a reservation, or a rental agreement.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-zinc-900">
                        3. User Accounts
                    </h2>
                    <p className="mt-4 leading-7 text-zinc-600">
                        Some features may require an account. You agree to provide
                        accurate information, keep your account details up to date, and
                        take reasonable steps to protect your login credentials. You are
                        responsible for activity performed through your account, subject
                        to applicable law. Notify us if you suspect unauthorized access.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-zinc-900">
                        4. Property Listings and Owner Responsibilities
                    </h2>
                    <p className="mt-4 leading-7 text-zinc-600">
                        Users who submit property listings must have the necessary
                        authority to advertise the property and must provide accurate,
                        lawful, and reasonably current information.
                    </p>
                    <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-zinc-600">
                        <li>Do not publish false, misleading, or fraudulent listings.</li>
                        <li>
                            Do not use photographs or other content without the necessary
                            rights or permissions.
                        </li>
                        <li>
                            Update or remove listings that are no longer available or
                            accurate.
                        </li>
                        <li>
                            Do not misrepresent ownership, rental prices, fees, facilities,
                            property conditions, or availability.
                        </li>
                        <li>
                            Follow applicable laws and obtain any permissions required to
                            advertise and rent the property.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-zinc-900">
                        5. Responsibilities of Renters
                    </h2>
                    <p className="mt-4 leading-7 text-zinc-600">
                        Renters should review listings carefully, verify important
                        information directly with the relevant owner or representative,
                        and ask questions before making commitments or payments. Do not
                        provide passwords, verification codes, or unnecessary sensitive
                        information to other users.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-zinc-900">
                        6. Property Verification and Transactions
                    </h2>
                    <p className="mt-4 leading-7 text-zinc-600">
                        Unless a particular verification service is expressly described
                        by RentNest, we do not guarantee the identity of every user, the
                        legal ownership of a property, listing accuracy, property
                        condition, or the conduct of owners and renters. Users are
                        responsible for independently verifying relevant details and
                        ensuring that rental agreements and payments are handled safely
                        and lawfully.
                    </p>
                    <p className="mt-4 leading-7 text-zinc-600">
                        Do not rely solely on a listing as proof of ownership or a
                        guarantee that a property is available. Be cautious of requests
                        for deposits or advance payments before verifying the property
                        and the person receiving payment.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-zinc-900">
                        7. Prohibited Activities
                    </h2>
                    <p className="mt-4 leading-7 text-zinc-600">
                        You must not use RentNest to:
                    </p>
                    <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-zinc-600">
                        <li>Commit fraud, scams, harassment, or unlawful discrimination.</li>
                        <li>Post illegal, deceptive, or unauthorized content.</li>
                        <li>Impersonate another person or misrepresent your identity.</li>
                        <li>
                            Attempt to access accounts, systems, or data without
                            authorization.
                        </li>
                        <li>
                            Disrupt the website, distribute malware, or abuse its services.
                        </li>
                        <li>
                            Collect or misuse other users' personal information without a
                            lawful basis.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-zinc-900">
                        8. Content and Intellectual Property
                    </h2>
                    <p className="mt-4 leading-7 text-zinc-600">
                        RentNest and its original branding, design, software, and
                        platform content are protected by applicable intellectual
                        property laws. You may not copy, distribute, modify, or exploit
                        protected platform materials without authorization, except where
                        permitted by law.
                    </p>
                    <p className="mt-4 leading-7 text-zinc-600">
                        You retain rights you have in content you submit. By submitting
                        content, you grant RentNest permission to host, store, reproduce,
                        display, and process it as reasonably necessary to operate,
                        maintain, and promote the platform and its relevant listing
                        services, subject to applicable law and our Privacy Policy.
                        You confirm that you have the rights needed to submit that
                        content.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-zinc-900">
                        9. Listing Moderation and Account Restrictions
                    </h2>
                    <p className="mt-4 leading-7 text-zinc-600">
                        To protect users and the platform, RentNest may review, restrict,
                        remove, or reject listings and may suspend or terminate accounts
                        where reasonably necessary due to suspected fraud, misuse,
                        security risks, violations of these terms, or legal obligations.
                        Where appropriate and lawful, we may request additional
                        information to investigate a concern.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-zinc-900">
                        10. Third-Party Services and Links
                    </h2>
                    <p className="mt-4 leading-7 text-zinc-600">
                        RentNest may contain links to external websites or services.
                        These are provided for convenience and may be governed by separate
                        terms and policies. We do not control independent third-party
                        services and are not responsible for their content or practices.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-zinc-900">
                        11. Disclaimer of Warranties
                    </h2>
                    <p className="mt-4 leading-7 text-zinc-600">
                        To the extent permitted by applicable law, RentNest is provided
                        on an "as is" and "as available" basis. We do not guarantee
                        uninterrupted availability, error-free operation, listing
                        accuracy, property availability, or the actions of other users.
                        Nothing in these terms excludes a warranty or right that cannot
                        lawfully be excluded.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-zinc-900">
                        12. Limitation of Liability
                    </h2>
                    <p className="mt-4 leading-7 text-zinc-600">
                        To the extent permitted by applicable law, RentNest will not be
                        liable for indirect or consequential losses arising from the use
                        of the platform, reliance on user-submitted listings, dealings
                        between users, or temporary service interruptions. Nothing in
                        these terms excludes or limits liability where such exclusion or
                        limitation is prohibited by law, including liability that cannot
                        legally be waived.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-zinc-900">
                        13. Privacy
                    </h2>
                    <p className="mt-4 leading-7 text-zinc-600">
                        Your use of RentNest is also subject to our Privacy Policy, which
                        explains how personal information may be collected, used, and
                        shared.
                    </p>
                    <Link
                        href="/privacy"
                        className="mt-3 inline-flex items-center gap-2 font-semibold text-green-800 hover:text-green-900"
                    >
                        Read our Privacy Policy
                        <span aria-hidden="true">→</span>
                    </Link>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-zinc-900">
                        14. Changes to These Terms
                    </h2>
                    <p className="mt-4 leading-7 text-zinc-600">
                        We may update these terms to reflect changes to RentNest, our
                        practices, or applicable legal requirements. The revised version
                        will be published on this page with an updated date. Where
                        required by law, we will provide notice or obtain consent for
                        material changes.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-zinc-900">
                        15. Governing Law
                    </h2>
                    <p className="mt-4 leading-7 text-zinc-600">
                        These terms are subject to applicable laws. Any dispute will be
                        handled in accordance with the laws and procedures that legally
                        apply to the parties and the relevant transaction. Before
                        publishing, RentNest should specify its legal operating entity
                        and confirm the appropriate governing-law and jurisdiction
                        provisions with a qualified legal professional.
                    </p>
                </section>

                <section className="rounded-2xl border border-green-200 bg-green-50 p-6">
                    <h2 className="text-xl font-bold text-zinc-900">
                        16. Contact RentNest
                    </h2>
                    <p className="mt-3 leading-7 text-zinc-600">
                        If you have questions about these Terms and Conditions, please
                        contact our team.
                    </p>
                    <Link
                        href="/contact"
                        className="mt-4 inline-flex items-center gap-2 font-semibold text-green-800 hover:text-green-900"
                    >
                        Contact us
                        <span aria-hidden="true">→</span>
                    </Link>
                </section>
            </article>
        </main>
    );
}
