export const metadata = {
  title: "Snake Oil Signs — Studio",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ height: "100vh" }}>{children}</div>;
}
