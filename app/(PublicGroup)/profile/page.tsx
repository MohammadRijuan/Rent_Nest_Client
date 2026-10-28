import { getProfile } from "../_actions/profileAction";
import {
  UserRound,
  Mail,
  ShieldCheck,
  CalendarDays,
  CircleUserRound,
  BriefcaseBusiness,
  FileText,
} from "lucide-react";
import Image from "next/image";

const ProfilePage = async () => {
  const { success, message, user } = await getProfile();

  if (!success) {
    if (message === "UNAUTHORIZED") {
      return (
        <main className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <CircleUserRound className="mx-auto mb-4 h-14 w-14 text-gray-300" />
            <h1 className="text-xl font-semibold text-gray-900">
              Sign in to view your profile
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Please log in to access your personal information.
            </p>
          </div>
        </main>
      );
    }

    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-sm text-gray-500">
          Unable to load profile. Please try again.
        </p>
      </main>
    );
  }

  const name = user?.name ?? "User";
  const email = user?.email ?? "No email available";
  const role = user?.role ?? "USER";
  const bio = user?.profile?.bio ?? "No bio added yet.";
  const status = user?.activeStatus ?? "UNKNOWN";

  // Only use a valid HTTP/HTTPS image URL.
  const photo = user?.profile?.profilePhoto;
  const profilePhoto =
    photo && /^https?:\/\/.+/i.test(photo) ? photo : null;

  // Create initials for the default avatar.
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part: string) => part[0])
    .join("")
    .toUpperCase();

  return (
    <main className="min-h-screen bg-[#FAFAF7] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page heading */}
        <div className="mb-8">
          <p className="text-sm font-medium text-green-700">
            RENTNEST / ACCOUNT
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Profile
          </h1>
          <p className="mt-2 text-gray-500">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Profile card */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Green banner */}
          <div className="relative h-4 bg-gradient-to-r from-green-950 via-green-800 to-green-700 sm:h-4" />

          {/* Profile information */}
          <div className="relative px-6 pb-7 sm:px-9">
            {/* Avatar and user information */}
            <div className="mt-4 flex flex-col gap-5 sm:mt-4 sm:flex-row sm:items-end">
              {/* Profile photo or default avatar */}
              <div className="relative z-10 flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-green-100 shadow-md sm:h-32 sm:w-32">
                {profilePhoto ? (
                  <Image
                    src={profilePhoto}
                    alt={`${name}'s profile photo`}
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-green-100 text-3xl font-bold text-green-800 sm:text-4xl">
                    {initials || <UserRound className="h-12 w-12" />}
                  </div>
                )}
              </div>

              {/* Name, email and role */}
              <div className="min-w-0 pb-1 sm:pb-2">
                <h2 className="break-words text-2xl font-bold text-gray-900">
                  {name}
                </h2>

                <p className="mt-1 break-all text-sm text-gray-500">
                  {email}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-800">
                    <ShieldCheck className="h-4 w-4" />
                    {status}
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                    <BriefcaseBusiness className="h-4 w-4" />
                    {role}
                  </span>
                </div>
              </div>
            </div>

            {/* Personal information */}
            <div className="mt-9 border-t border-gray-100 pt-7">
              <h3 className="text-lg font-semibold text-gray-900">
                Personal Information
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Your basic account details.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {/* Full name */}
                <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-800">
                      <UserRound className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        Full Name
                      </p>
                      <p className="mt-1 break-words font-semibold text-gray-900">
                        {name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email address */}
                <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-800">
                      <Mail className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        Email Address
                      </p>
                      <p className="mt-1 break-all font-semibold text-gray-900">
                        {email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* User role */}
                <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-800">
                      <BriefcaseBusiness className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        Account Role
                      </p>
                      <p className="mt-1 font-semibold text-gray-900">
                        {role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account status */}
                <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-800">
                      <CalendarDays className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        Account Status
                      </p>
                      <p
                        className={`mt-1 font-semibold ${
                          status === "ACTIVE"
                            ? "text-green-800"
                            : "text-gray-700"
                        }`}
                      >
                        {status}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-5 sm:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-800">
                      <FileText className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        Bio
                      </p>
                      <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">
                        {bio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <p className="mt-5 text-center text-xs text-gray-400">
          Your RentNest account information is displayed securely.
        </p>
      </div>
    </main>
  );
};

export default ProfilePage;