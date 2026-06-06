import { useState } from "react";

interface Props {
  onToast: (msg: string) => void;
}

export function DriverTrack({ onToast }: Props) {
  const [delivered, setDelivered] = useState(false);

  function confirmDelivery() {
    setDelivered(true);
    onToast("Yetkazish tasdiqlandi! To'lov amalga oshirilmoqda...");
  }

  return (
    <div className="pb-20 slide-up">
      <div className="px-[18px] pt-5 pb-2">
        <div className="text-[19px] font-black" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>Faol Buyurtma</div>
        <div className="text-xs mt-0.5" style={{ color: "var(--mu)" }}>Joriy yetkazish tafsilotlari</div>
      </div>

      <div className="px-[18px]">

        {/* Route card */}
        <div className="rounded-2xl p-4 mb-3 border" style={{ background: "var(--nv)", borderColor: "var(--nv)" }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1">
              <div className="text-[11px] mb-1 uppercase tracking-wide" style={{ color: "rgba(255,255,255,.45)" }}>Marshrut</div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Toshkent</span>
                <span style={{ color: "var(--or)" }}>→</span>
                <span className="text-base font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Samarqand</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full" style={{ background: "rgba(34,197,94,.15)", color: "#22C55E" }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#22C55E" }} />
              Yo'lda
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[["📍", "112 km qoldi"], ["⏰", "ETA 14:30"], ["💵", "315 000 so'm"]].map(([ic, txt]) => (
              <div key={txt} className="flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.75)" }}>
                {ic} {txt}
              </div>
            ))}
          </div>
        </div>

        {/* Customer info */}
        <div className="rounded-2xl p-4 mb-3 border" style={{ background: "var(--wh)", borderColor: "var(--ln)" }}>
          <div className="text-[11px] font-medium mb-3 uppercase tracking-wide" style={{ color: "var(--mu)" }}>Mijoz ma'lumotlari</div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: "var(--or)", fontFamily: "'Syne', sans-serif" }}>KN</div>
            <div className="flex-1">
              <div className="text-sm font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>Kamol Norqo'ziyev</div>
              <div className="text-[11px]" style={{ color: "var(--mu)" }}>+998 91 234 56 78</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onToast("Mijozga qo'ng'iroq qilinmoqda...")}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "var(--grb)", color: "var(--gr)" }}
              >📞</button>
              <button
                onClick={() => onToast("Xabar yuborilmoqda...")}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "var(--orl)", color: "var(--or)" }}
              >💬</button>
            </div>
          </div>
          <div className="flex gap-2 text-[11px]">
            <div className="flex-1 rounded-xl p-2.5" style={{ background: "var(--bg)" }}>
              <div className="mb-0.5" style={{ color: "var(--mu)" }}>Yuk turi</div>
              <div className="font-semibold" style={{ color: "var(--nv)" }}>Mebel / Shkaf</div>
            </div>
            <div className="flex-1 rounded-xl p-2.5" style={{ background: "var(--bg)" }}>
              <div className="mb-0.5" style={{ color: "var(--mu)" }}>Og'irlik</div>
              <div className="font-semibold" style={{ color: "var(--nv)" }}>120 kg</div>
            </div>
            <div className="flex-1 rounded-xl p-2.5" style={{ background: "var(--bg)" }}>
              <div className="mb-0.5" style={{ color: "var(--mu)" }}>Hajm</div>
              <div className="font-semibold" style={{ color: "var(--nv)" }}>3 m³</div>
            </div>
          </div>
        </div>

        {/* Cargo Check status */}
        <div className="rounded-2xl p-4 mb-3 border" style={{ background: "var(--wh)", borderColor: "var(--ln)" }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: "var(--grb)", color: "var(--gr)" }}>🛡️</div>
            <span className="text-sm font-bold flex-1" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>Yuk Tekshiruvi™</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "var(--grb)", color: "var(--gr)" }}>MOS ✓</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-[11px]" style={{ background: "var(--grb)", color: "var(--gr)" }}>
            ✅ AI yuk mosligini tasdiqladi · 96% o'xshashlik · Xavfsiz jo'nash
          </div>
        </div>

        {/* Price */}
        <div className="rounded-2xl p-4 mb-4 border" style={{ background: "var(--wh)", borderColor: "var(--ln)" }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs mb-1" style={{ color: "var(--mu)" }}>Kelishilgan narx</div>
              <div className="text-2xl font-black" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>315 000 so'm</div>
              <div className="text-[11px] mt-0.5" style={{ color: "var(--mu)" }}>Yetkazilgandan so'ng to'lanadi</div>
            </div>
            <div className="text-4xl">💵</div>
          </div>
        </div>

        {/* Confirm delivery */}
        {!delivered ? (
          <button
            onClick={confirmDelivery}
            className="w-full rounded-xl py-4 text-sm font-black text-white transition-all active:scale-[0.98]"
            style={{ background: "var(--or)", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.3px" }}
          >
            ✅ Yetkazildi — Tasdiqlash
          </button>
        ) : (
          <div className="rounded-xl py-4 text-center text-sm font-bold slide-up" style={{ background: "var(--grb)", color: "var(--gr)" }}>
            🎉 Yetkazish tasdiqlandi! To'lov amalga oshirilmoqda...
          </div>
        )}
      </div>
    </div>
  );
}
