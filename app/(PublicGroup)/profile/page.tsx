import { cookies } from "next/headers";

const ProfilePage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return <p>Please log in to view your profile.</p>;
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/me`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!res.ok) {
      return <p>Failed to load profile. Status: {res.status}</p>;
    }

    const result = await res.json();
    const user = result.data?.profile;

    return (
      <main>
        <h1>My Profile</h1>
        <p>Name: {user?.name ?? "Not available"}</p>
        <p>Email: {user?.email ?? "Not available"}</p>
      </main>
    );
  } catch (error) {
    console.error("Profile API error:", error);
    return <p>Unable to connect to the backend. Please try again.</p>;
  }
};

export default ProfilePage;