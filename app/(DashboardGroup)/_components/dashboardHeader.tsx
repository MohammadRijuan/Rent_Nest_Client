type DashboardHeaderProps = {
  user: {
    role?: string;
  } | null;
};

export default function DashboardHeader({
  user,
}: DashboardHeaderProps) {
  const role = user?.role?.toUpperCase();

  return (
    <header className="mb-5 border-b pb-4 sm:mb-6 sm:pb-5">
      <h1 className="break-words text-xl font-bold tracking-tight sm:text-2xl">
        {role ? `${role} Panel` : "Dashboard"}
      </h1>
    </header>
  );
}