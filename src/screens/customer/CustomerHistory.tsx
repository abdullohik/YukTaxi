import { useState } from "react";

interface Props {
  onToast: (msg: string) => void;
}

const deliveries = [
  { route: "Toshkent → Samarqand", price: "315 000 so'm", status: "Yo'lda", date: "Bugun", cargo: "2 ta divan", status_type: "transit" },
  { route: "Toshkent → Farg'ona", price: "312 000 so'm", status: "Yetkazildi", date: "2-iyun 2025", cargo: "2 ta divan, 1 ta shkaf", status_type: "ok" },
  { route: "Toshkent → Buxoro", price: "480 000 so'm", status: "Yetkazildi", date: "28-may 2025", cargo: "12 quti matolar", status_type: "ok" },
  { route: "Namangan → Toshkent", price: "190 000 so'm", status: "Yetkazildi", date: "14-may 2025", cargo: "Yangi gullar 8 quti", status_type: "ok" },
  { route: "Toshkent → Nukus", price: "650 000 so'm", status: "Bekor qilindi", date: "5-may 2025", cargo: "Qurilish materiallari", status_type: "cancel" },
];

const statusStyle: Record<string, { bg: string; color: string; icon: string }> = {
  ok: { bg: "var(--grb)", color: "var(--gr)", icon: "✓" },
  transit: { bg: "var(--amb)", color: "var(--am)", icon: "🚛" },
  cancel: { bg: "var(--rdb)", color: "var(--rd)", icon: "✕" },
};

export function CustomerHistory({ onToast }: Props) {
  const [rating, setRating] = useState(4);

  return (
    <div className="pb-20 slide-up">
      <div className="px-[18px] pt-5 pb-3">
        <div className="text-[19px] font-black" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>Tarix</div>
        <div className="text-xs mt-0.5" style={{ color: "var(--mu)" }}>Barcha yetkazishlaringiz</div>
      </div>

      {deliveries.map((d) => {
        const s = statusStyle[d.status_type];
        return (
          <div key={d.route + d.date} className="mx-[18px] mb-2.5 rounded-2xl p-3.5 border cursor-pointer" style={{ background: "var(--wh)", borderColor: "var(--ln)" }}>
            <div className="flex justify-between mb-1.5">
              <span className="text-sm font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>{d.route}</span>
              <span className="text-sm font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "var(--or)" }}>{d.price}</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.color }}>{s.icon} {d.status}</span>
              <span className="text-[11px]" style={{ color: "var(--mu)" }}>{d.date}</span>
            </div>
            <div className="text-[11px]" style={{ color: "var(--sl)" }}>{d.cargo} · Yuk Tekshiruvi™ ✓</div>
          </div>
        );
      })}

      {/* Rating card */}
      <div className="mx-[18px] mt-2 rounded-2xl p-4 border" style={{ background: "var(--wh)", borderColor: "var(--ln)" }}>
        <div className="text-sm font-bold mb-0.5" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>So'nggi yetkazishni baholang</div>
        <div className="text-[11px] mb-3" style={{ color: "var(--mu)" }}>Toshkent → Farg'ona · Muzaffar R.</div>
        <div className="flex gap-2 mb-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setRating(n)} className="text-2xl transition-transform hover:scale-110">
              <span style={{ color: n <= rating ? "var(--am)" : "var(--ln)" }}>★</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => onToast("Baho yuborildi — rahmat!")}
          className="w-full rounded-xl py-2.5 text-sm font-bold text-white transition-all active:scale-[0.98]"
          style={{ background: "var(--or)", fontFamily: "'Syne', sans-serif" }}
        >
          Baholash
        </button>
      </div>
    </div>
  );
}
