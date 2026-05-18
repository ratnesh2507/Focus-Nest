import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const LAST_UPDATED = "May 18, 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Header */}
      <header className="sticky top-0 z-10 h-14 bg-bg/85 border-b border-border backdrop-blur-xl">
        <div className="h-full mx-auto max-w-4xl px-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-ui text-sm text-muted hover:text-text transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>

          <span className="font-display text-lg tracking-tight text-text">
            Privacy Policy
          </span>

          {/* Spacer to keep title visually centered */}
          <div className="w-24" />
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-6 py-10">
        <article className="bg-card border border-border rounded-card p-8 md:p-10">
          {/* Title */}
          <div className="mb-10 pb-6 border-b border-border">
            <h1 className="font-display text-4xl tracking-tight text-text mb-3">
              Privacy Policy
            </h1>
            <p className="font-ui text-sm text-muted leading-relaxed">
              Focus Nest respects your privacy and is committed to protecting
              your personal data. This policy explains what information is
              collected, how it is used, and how you can control your data.
            </p>
            <p className="font-mono text-[11px] tracking-widest text-faint mt-4">
              LAST UPDATED • {LAST_UPDATED.toUpperCase()}
            </p>
          </div>

          {/* Body */}
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="font-display text-2xl text-text mb-3">
                1. Information We Collect
              </h2>
              <p className="font-ui text-sm text-muted leading-7">
                When you sign in with Google, Focus Nest may collect your name,
                email address, and profile image. We also store study-related
                information such as session durations, dates of activity, and
                aggregated statistics like streaks and total focus time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl text-text mb-3">
                2. How We Use Your Information
              </h2>
              <p className="font-ui text-sm text-muted leading-7">
                Your data is used solely to provide application features,
                including authentication, syncing study sessions across devices,
                generating analytics, and displaying your personal dashboard.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl text-text mb-3">
                3. Data Stored in Your Browser
              </h2>
              <p className="font-ui text-sm text-muted leading-7">
                Focus Nest stores notes, timer settings, and temporary session
                state in your browser using localStorage. This data remains on
                your device and is not transmitted to our servers unless you are
                signed in and explicitly use cloud features.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl text-text mb-3">
                4. Third-Party Services
              </h2>
              <p className="font-ui text-sm text-muted leading-7">
                Focus Nest uses Supabase for authentication and database
                services, Google for OAuth sign-in, and YouTube for embedded
                ambient music streams. These providers may process data
                according to their own privacy policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl text-text mb-3">
                5. Data Sharing
              </h2>
              <p className="font-ui text-sm text-muted leading-7">
                We do not sell, rent, or share your personal data with
                advertisers or third parties, except as necessary to provide the
                services described above.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl text-text mb-3">
                6. Data Security
              </h2>
              <p className="font-ui text-sm text-muted leading-7">
                Reasonable technical and organizational measures are used to
                protect your information. However, no internet-based service can
                guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl text-text mb-3">
                7. Your Rights
              </h2>
              <p className="font-ui text-sm text-muted leading-7">
                You may stop using Focus Nest at any time. You can sign out,
                clear browser storage, or request deletion of your stored data
                by contacting the developer.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl text-text mb-3">
                8. Children&apos;s Privacy
              </h2>
              <p className="font-ui text-sm text-muted leading-7">
                Focus Nest is not specifically directed toward children under
                13. If you believe a child has provided personal information,
                please contact us so that appropriate action can be taken.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl text-text mb-3">
                9. Changes to This Policy
              </h2>
              <p className="font-ui text-sm text-muted leading-7">
                This Privacy Policy may be updated periodically. Any changes
                will be posted on this page along with a revised "Last Updated"
                date.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-text mb-3">
                10. Contact
              </h2>
              <p className="font-ui text-sm text-muted leading-7">
                If you have questions about this Privacy Policy or would like to
                request data deletion, please contact Ratnesh BVK through{" "}
                <a
                  href="https://github.com/ratnesh2507"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber hover:underline underline-offset-2"
                >
                  GitHub
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
