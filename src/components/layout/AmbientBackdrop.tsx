export default function AmbientBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-32 top-[-18%] h-[520px] w-[520px] rounded-full bg-violet/28 blur-[140px] animate-glow-pulse" />
      <div className="absolute right-[-12%] top-[8%] h-[420px] w-[420px] rounded-full bg-gold/12 blur-[130px] animate-drift" />
      <div className="absolute bottom-[-24%] left-[22%] h-[420px] w-[640px] rounded-full bg-violet-deep/35 blur-[160px]" />
      <div className="grain-overlay" />
    </div>
  );
}
