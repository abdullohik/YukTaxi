import { useState, useEffect } from "react";
import { LiveMap } from "@/components/LiveMap";
import type { BookingState } from "@/App";

interface Props {
  onToast: (msg: string) => void;
  onNavigate: (screen: string) => void;
  booking: BookingState;
}

const FROM: [number, number] = [41.2995, 69.2401];
const TO: [number, number] = [39.627, 66.975];

const driverNames = ["Muzaffar Rahimov", "Bobur Karimov", "Jasur Yusupov"];
const driverTrucks = ["Isuzu NQR · Guvohnoma: 01AB123456", "GAZelle Next · Guvohnoma: 02CD789012", "Hyundai Porter · Guvohnoma: 03EF345678"];
const driverInitials = ["MR", "BK", "JY"];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function CustomerTrack({ onToast, onNavigate, booking }: Props) {
  const [progress, setProgress] = useState(0.35);

  const truckPos: [number, number] = [
    lerp(FROM[0], TO[0], progress),
    lerp(FROM[1], TO[1], progress),
  ];

  useEffect(() => {
    if (!booking.confirmed) return;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 1) { clearInterval(id); return 1; }
        return p + 0.002;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [booking.confirmed]);

  const dIdx = booking.selectedDriver ?? 0;
  const driverName = driverNames[dIdx] ?? driverNames[0];
  const driverTruck = driverTrucks[dIdx] ?? driverTrucks[0];
  const driverInit = driverInitials[dIdx] ?? driverInitials[0];

  // Empty state when no active booking
  if (!booking.confirmed) {
    return (
      <div className="pb-20 slide-up px-[18px] pt-10 flex flex-col items-center text-center">
        <div className="text-5xl mb-4">📦</div>
        <div className="text-lg font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>Faol yetkazish yo'q</div>
        <div className="text-sm mb-6" style={{ color: "var(--mu)" }}>Yangi buyurtma bering va yukingizni real vaqtda kuzating</div>
        <button
          onClick={() => onNavigate("book")}
          className="rounded-xl px-6 py-3 text-sm font-bold text-white"
          style={{ background: "var(--or)", fontFamily: "'Syne', sans-serif" }}
        >
          ➕ Yangi buyurtma berish
        </button>
      </div>
    );
  }

  const timeline = [
    { label: "Buyurtma tasdiqlandi", sub: `Haydovchi: ${driverName}`, done: true, active: false },
    { label: "Yuk tekshirildi (olib ketishda)", sub: "AI moslik: ✓ Tasdiqlandi", done: true, active: false },
    { label: "Yo'lda", sub: `${Math.round(progress * 100)}% bosib o'tildi`, done: false, active: true },
    { label: "Yetkazish tasdiqlanadi", sub: "~14:30 da kutilmoqda", done: false, active: false },
  ];

  return (
    <div className="pb-20 slide-up">
      {/* Live Leaflet map */}
      <div className="relative" style={{ height: 230 }}>
        <LiveMap from={FROM} to={TO} truckPos={truckPos} height={230} />
        <div className="absolute text-xs text-white font-bold px-2 py-1 rounded pointer-events-none" style={{ top: 12, left: 12, background: "rgba(15,27,45,.85)", fontFamily: "'Syne', sans-serif", zIndex: 1000 }}>
          📍 Jonli kuzatuv
        </div>
        <div className="absolute text-[10px] text-white px-2 py-1 rounded pointer-events-none" style={{ bottom: 12, right: 12, background: "rgba(15,27,45,.85)", zIndex: 1000 }}>
          ETA: 14:30 · {Math.round((1 - progress) * 300)} km qoldi
        </div>
      </div>

      <div className="px-[18px] py-4">
        {/* Route card */}
        <div className="rounded-2xl p-4 border mb-3" style={{ background: "var(--wh)", borderColor: "var(--ln)" }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-base font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>
              {booking.from} <span style={{ color: "var(--or)" }}>→</span> {booking.to}
            </span>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1" style={{ background: "var(--grb)", color: "var(--gr)" }}>
              ⏰ 14:30
            </span>
          </div>
          <div className="flex gap-2 text-xs mb-4">
            <span className="px-2 py-1 rounded-lg" style={{ background: "var(--bg)", color: "var(--sl)" }}>{booking.cargoType}</span>
            <span className="px-2 py-1 rounded-lg" style={{ background: "var(--bg)", color: "var(--sl)" }}>{booking.weight} kg</span>
            <span className="px-2 py-1 rounded-lg" style={{ background: "var(--bg)", color: "var(--sl)" }}>{booking.volume} m³</span>
          </div>

          {/* Timeline */}
          <div className="flex flex-col">
            {timeline.map((t, i) => (
              <div key={t.label} className="flex gap-2.5 py-1.5">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-0.5 ${t.active ? "ring-2 ring-orange-300" : ""}`}
                    style={{ background: t.done ? "var(--gr)" : t.active ? "var(--or)" : "var(--ln)" }} />
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 my-0.5" style={{ background: t.done ? "var(--gr)" : "var(--ln)" }} />
                  )}
                </div>
                <div>
                  <div className={`text-sm font-medium ${t.active ? "" : t.done ? "" : "opacity-60"}`} style={{ color: t.active ? "var(--or)" : "var(--nv)" }}>{t.label}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: "var(--mu)" }}>{t.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cargo verify */}
        <div className="rounded-2xl p-4 border mb-3" style={{ background: "var(--wh)", borderColor: "var(--ln)" }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: "var(--orl)", color: "var(--or)" }}>🛡️</div>
            <span className="text-sm font-bold flex-1" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>Yuk Tekshiruvi™ — Tasdiqlandi</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "var(--grb)", color: "var(--gr)" }}>MOS ✓</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {["Sizning suratlaringiz", "Haydovchi surati"].map((l) => (
              <div key={l} className="rounded-xl h-[75px] flex items-center justify-center relative text-3xl" style={{ background: "var(--bg)", border: "1px solid var(--ln)" }}>
                {booking.aiResult ? (booking.aiResult as any).emoji : "📦"}
                <div className="absolute bottom-0 left-0 right-0 text-[9px] text-white text-center py-0.5" style={{ background: "rgba(15,27,45,.7)" }}>{l}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold" style={{ background: "var(--grb)", color: "var(--gr)" }}>
            ✅ AI yuk mosligini tasdiqladi · 96% o'xshashlik
          </div>
        </div>

        {/* Driver card */}
        <div className="rounded-2xl p-4 border mb-3" style={{ background: "var(--wh)", borderColor: "var(--ln)" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: "var(--nv)", fontFamily: "'Syne', sans-serif" }}>{driverInit}</div>
            <div className="flex-1">
              <div className="text-sm font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>{driverName}</div>
              <div className="text-[11px]" style={{ color: "var(--mu)" }}>{driverTruck}</div>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "var(--grb)", color: "var(--gr)" }} onClick={() => onToast("Haydovchiga qo'ng'iroq qilinmoqda...")}>📞</button>
              <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "var(--orl)", color: "var(--or)" }} onClick={() => onToast("Xabar yuborilmoqda...")}>💬</button>
            </div>
          </div>
        </div>

        <button
          onClick={() => onToast("SOS signali platformaga yuborildi")}
          className="w-full rounded-xl py-3 text-sm font-bold border-[1.5px] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: "var(--wh)", borderColor: "var(--ln)", color: "var(--nv)" }}
        >
          <span style={{ color: "var(--rd)" }}>⚠️</span> Muammo haqida xabar berish
        </button>
      </div>
    </div>
  );
}
