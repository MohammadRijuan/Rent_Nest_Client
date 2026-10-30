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
    <header className="mb-6 border-b border-[#e3e1d7] pb-4 sm:mb-8 sm:pb-5">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9a5c40]">
        RentNest
      </p>
      <h1 className="break-words font-serif text-2xl font-medium tracking-tight text-[#26342a] sm:text-3xl">
        {role ? `${role} Panel` : "Dashboard"}
      </h1>
    </header>
  );
}