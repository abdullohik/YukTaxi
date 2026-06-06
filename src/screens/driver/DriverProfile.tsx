interface Props {
  onNavigate: (screen: string) => void;
  onToast: (msg: string) => void;
}

const menuItems = [
  { icon: "🚛", bg: "#E8EEF5", label: "Mashina ma'lumotlari", sub: "Isuzu NQR · 01AB123456", action: "Mashina hujjatlari" },
  { icon: "🪪", bg: "var(--orl)", label: "Hujjatlar & litsenziya", sub: "Tasdiqlangan · 2027 gacha amal qiladi", action: "Hujjatlar ochildi" },
  { icon: "💰", bg: "var(--grb)", label: "Daromadlar tarixi", sub: "Bu oy: 6 200 000 so'm", nav: "earnings" },
  { icon: "🗺️", bg: "var(--amb)", label: "Afzal marshrutlar", sub: "3 ta saqlangan marshrut", action: "Marshrutlarni sozlash" },
  { icon: "🛡️", bg: "var(--orl)", label: "Yuk Tekshiruvi™ tarixi", sub: "Barcha foto yozuvlar", nav: "cargocheck" },
  { icon: "🎧", bg: "#E8EEF5", label: "24/7 Qo'llab-quvvatlash", sub: "Chat va qo'ng'iroq", action: "Qo'llab-quvvatlash ochildi" },
];

export function DriverProfile({ onNavigate, onToast }: Props) {
  return (
    <div className="pb-20 slide-up">
      {/* Header */}
      <div className="px-[18px] pt-7 pb-5 text-center" style={{ background: "linear-gradient(135deg,#0a1520 0%,var(--nv) 100%)" }}>
        <div className="w-17 h-17 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-2.5" style={{ width: 68, height: 68, background: "var(--or)", fontFamily: "'Syne', sans-serif" }}>MR</div>
        <div className="text-lg font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Muzaffar Rahimov</div>
        <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,.45)" }}>Haydovchi · Isuzu NQR · Tasdiqlangan ✓</div>
        <div className="flex mt-4 pt-3.5" style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}>
          {[["340", "Yetkazish"], ["4.92", "Reyting"], ["6.2M", "Bu oy (so'm)"]].map(([v, l]) => (
            <div key={l} className="flex-1 text-center" style={{ borderRight: "1px solid rgba(255,255,255,.1)" }}>
              <div className="text-lg font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{v}</div>
              <div className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,.38)" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3.5">
        {menuItems.map((m) => (
          <button
            key={m.label}
            onClick={() => m.nav ? onNavigate(m.nav) : onToast(m.action || m.label)}
            className="w-full flex items-center gap-3 px-3.5 py-3.5 rounded-xl border mb-2 transition-all hover:border-orange-300 active:scale-[0.98]"
            style={{ background: "var(--wh)", borderColor: "var(--ln)" }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ background: m.bg }}>{m.icon}</div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium" style={{ color: "var(--nv)" }}>{m.label}</div>
              <div className="text-[11px] mt-0.5" style={{ color: "var(--mu)" }}>{m.sub}</div>
            </div>
            <span className="text-xs" style={{ color: "var(--mu)" }}>›</span>
          </button>
        ))}

        {/* Referral */}
        <div className="rounded-2xl p-4 mt-1" style={{ background: "var(--nv)" }}>
          <div className="text-sm font-bold text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>Do'st haydovchini taklif qiling</div>
          <div className="text-xs mb-3" style={{ color: "rgba(255,255,255,.45)" }}>U 10 ta yetkazish bajarsa — 75 000 so'm ishlaysiz</div>
          <button
            onClick={() => onToast("Haydovchi taklif havolasi nusxalandi!")}
            className="rounded-lg px-3.5 py-2 text-xs font-bold text-white transition-all active:scale-[0.97]"
            style={{ background: "var(--or)", fontFamily: "'Syne', sans-serif" }}
          >
            Havola ulashish
          </button>
        </div>
      </div>
    </div>
  );
}
