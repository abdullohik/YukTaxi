interface Props {
  onToast: (msg: string) => void;
}

const earningsHistory = [
  { ok: true, route: "Toshkent → Samarqand", detail: "Bugun 09:00 · Mebel · 300 km", amount: "+315 000" },
  { ok: true, route: "Yo'lda qo'shimcha yuk (gul)", detail: "Bugun 08:30 · Shoshilinch buyurtma", amount: "+120 000" },
  { ok: true, route: "Toshkent → Farg'ona", detail: "Kecha · Elektronika · 400 km", amount: "+420 000" },
  { ok: true, route: "Toshkent → Buxoro", detail: "1-iyun · Ulgurji tovarlar · 550 km", amount: "+580 000" },
  { ok: false, route: "Bonus: 10+ yetkazish seriyasi", detail: "Bu oy · 8 ta qoldi", amount: "+50 000" },
];

export function DriverEarnings({ onToast }: Props) {
  return (
    <div className="pb-20 slide-up">
      <div className="px-[18px] pt-5 pb-3">
        <div className="text-[19px] font-black" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>Daromadlar</div>
        <div className="text-xs mt-0.5" style={{ color: "var(--mu)" }}>Barcha to'lovlaringiz va tarixi</div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-2.5 px-[18px] mb-4">
        <div className="rounded-2xl p-4" style={{ background: "var(--nv)" }}>
          <div className="text-[11px] mb-1" style={{ color: "rgba(255,255,255,.45)" }}>Bu oy</div>
          <div className="text-[22px] font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>6.2M so'm</div>
          <div className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,.4)" }}>+18% o'tgan oydan</div>
        </div>
        <div className="rounded-2xl p-4 border" style={{ background: "var(--grb)", borderColor: "var(--gr)" }}>
          <div className="text-[11px] mb-1" style={{ color: "var(--gr)" }}>Balans</div>
          <div className="text-[22px] font-black" style={{ fontFamily: "'Syne', sans-serif", color: "var(--gr)" }}>1.4M so'm</div>
          <div className="text-[11px] mt-0.5 opacity-70" style={{ color: "var(--gr)" }}>Chiqarishga tayyor</div>
        </div>
      </div>

      <div className="px-[18px] mb-4">
        <button
          onClick={() => onToast("Click orqali mablag' chiqarilmoqda...")}
          className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all active:scale-[0.98]"
          style={{ background: "var(--or)", fontFamily: "'Syne', sans-serif" }}
        >
          ↑ Mablag' chiqarish — 1 400 000 so'm
        </button>
      </div>

      <div className="h-[7px] mb-4" style={{ background: "var(--bg)", borderTop: "1px solid var(--ln)", borderBottom: "1px solid var(--ln)" }} />

      {/* Earnings history */}
      <div className="px-[18px]">
        <div className="text-sm font-bold mb-2.5" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>Yetkazish tarixi</div>
        {earningsHistory.map((e) => (
          <div key={e.route} className="flex items-center gap-2.5 p-3.5 rounded-xl border mb-2" style={{ background: "var(--wh)", borderColor: "var(--ln)" }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0" style={{ background: e.ok ? "var(--grb)" : "var(--amb)", color: e.ok ? "var(--gr)" : "var(--am)" }}>
              {e.ok ? "✓" : "⏰"}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium" style={{ color: "var(--nv)" }}>{e.route}</div>
              <div className="text-[11px] mt-0.5" style={{ color: "var(--mu)" }}>{e.detail}</div>
            </div>
            <div className="text-sm font-bold" style={{ fontFamily: "'Syne', sans-serif", color: e.ok ? "var(--gr)" : "var(--am)" }}>{e.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
