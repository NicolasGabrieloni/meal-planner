export default function LoggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex h-screen w-screen items-center justify-center bg-white`}
    >
      {children}
    </div>
  );
}
