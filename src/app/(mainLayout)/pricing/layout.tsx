export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="cyber-bg-grid bg-gradient-to-b from-slate-950 to-slate-950/95">
      {children}
    </div>
  );
}
