interface Props {
  onNavigate: (screen: string) => void;
  onToast: (msg: string) => void;
}

const stats = [
  { v: "847", l: "Faol mashinalar" },
  { v: "1,240", l: "Bugungi yetkazish" },
  { v: "98.2%", l: "O'z vaqtida" },
  { v: "4.87", l: "O'rtacha baho" },
];

const categories = [
  { icon: "🛋️", t: "Mebel", s: "Divan, shkaf, kravat" },
  { icon: "🌸", t: "Tez buziladigan", s: "Gul, sabzavot, meva" },
  { icon: "📱", t: "Texnika", s: "Maishiy, elektronika" },
  { icon: "📦", t: "Ulgurji", s: "Paletlar, tovar, material" },
];

const recent = [
  { route: "Toshkent → Farg'ona", price: "312 000 so'm", status: "Yetkazildi", date: "2-iyun 2025", cargo: "2 ta divan, 1 ta shkaf", ok: true },
  { route: "Toshkent → Buxoro", price: "480 000 so'm", status: "Yetkazildi", date: "28-may 2025", cargo: "12 quti matolar", ok: true },
];

export function CustomerHome({ onNavigate, onToast: _ }: Props) {
  return (
    <div className="pb-20 slide-up">
      {/* Hero */}
      <div className="relative overflow-hidden px-[18px] py-6" style={{ background: "var(--nv)" }}>
        <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full" style={{ background: "rgba(232,99,26,.10)" }} />
        <div className="absolute -bottom-14 -left-8 w-40 h-40 rounded-full" style={{ background: "rgba(232,99,26,.06)" }} />
        <div className="text-sm mb-1" style={{ color: "var(--mu)", fontWeight: 300 }}>Xayrli tong, Kamol 👋</div>
        <div className="text-xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
          Istalgan yukni <span style={{ color: "var(--or)" }}>O'zbekiston bo'ylab</span> yuboring
        </div>
        {/* Search box */}
        <div className="rounded-2xl p-3.5 relative z-10" style={{ background: "var(--wh)" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: "var(--or)" }} />
            <input className="flex-1 text-sm outline-none" style={{ color: "var(--nv)", background: "transparent" }} defaultValue="Toshkent" placeholder="Qayerdan — shahar" />
          </div>
          <div className="h-px my-2 ml-5" style={{ background: "var(--ln)" }} />
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: "var(--nv)" }} />
            <input className="flex-1 text-sm outline-none" style={{ color: "var(--nv)", background: "transparent" }} placeholder="Qayerga — shahar" />
          </div>
          <button
            onClick={() => onNavigate("book")}
            className="w-full mt-2.5 rounded-xl py-3 text-sm font-bold text-white transition-all active:scale-[0.98]"
            style={{ background: "var(--or)", fontFamily: "'Syne', sans-serif" }}
          >
            Yuk mashinasi topish →
          </button>
        </div>
      </div>

      {/* Active shipment */}
      <div className="px-[18px] pt-5 pb-1">
        <div className="text-sm font-bold mb-2.5" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>Faol yetkazish</div>
        <button
          onClick={() => onNavigate("track")}
          className="w-full text-left rounded-2xl p-4 relative overflow-hidden"
          style={{ background: "var(--nv)" }}
        >
          <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full" style={{ background: "rgba(232,99,26,.15)" }} />
          <div className="flex items-center gap-2 mb-2.5">
            <span className="font-bold text-white text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>Toshkent</span>
            <span style={{ color: "var(--or)" }}>→</span>
            <span className="font-bold text-white text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>Samarqand</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs mb-3" style={{ color: "rgba(255,255,255,.7)" }}>
            <span className="w-2 h-2 rounded-full pulse-dot inline-block" style={{ background: "#22C55E" }} />
            <span>Yo'lda · Taxminiy kelish 14:30</span>
            <span className="ml-auto flex items-center gap-1" style={{ color: "rgba(255,255,255,.9)" }}>🛡️ <span style={{ color: "var(--or)" }}>Yuk tasdiqlandi</span></span>
          </div>
          <div className="h-[3px] rounded-full mb-1.5" style={{ background: "rgba(255,255,255,.15)" }}>
            <div className="h-full rounded-full" style={{ background: "var(--or)", width: "62%" }} />
          </div>
          <div className="flex justify-between text-[10px]" style={{ color: "rgba(255,255,255,.4)" }}>
            <span>Olib ketildi</span><span>62% bajarildi</span><span>Yetkazish</span>
          </div>
        </button>
      </div>

      <div className="h-[7px] my-1" style={{ background: "var(--bg)", borderTop: "1px solid var(--ln)", borderBottom: "1px solid var(--ln)" }} />

      {/* Stats */}
      <div className="pt-5 pb-2">
        <div className="text-sm font-bold mb-2.5 px-[18px]" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>Bugungi ko'rsatkichlar</div>
        <div className="flex gap-2 px-[18px] overflow-x-auto">
          {stats.map((s) => (
            <div key={s.l} className="flex-shrink-0 rounded-xl p-2.5 border" style={{ background: "var(--wh)", borderColor: "var(--ln)" }}>
              <div className="text-base font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>{s.v}</div>
              <div className="text-[10px] mt-0.5" style={{ color: "var(--mu)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[7px] my-1" style={{ background: "var(--bg)", borderTop: "1px solid var(--ln)", borderBottom: "1px solid var(--ln)" }} />

      {/* Categories */}
      <div className="pt-5">
        <div className="text-sm font-bold mb-2.5 px-[18px]" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>Nima yuborasiz?</div>
        <div className="flex gap-2.5 px-[18px] overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c.t}
              onClick={() => onNavigate("book")}
              className="flex-shrink-0 rounded-2xl p-3.5 border min-w-[130px] text-left transition-all hover:border-orange-400 hover:-translate-y-0.5 active:scale-[0.97]"
              style={{ background: "var(--wh)", borderColor: "var(--ln)" }}
            >
              <div className="text-2xl mb-2">{c.icon}</div>
              <div className="text-xs font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>{c.t}</div>
              <div className="text-[11px] mt-0.5 leading-tight" style={{ color: "var(--mu)" }}>{c.s}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="h-[7px] my-4" style={{ background: "var(--bg)", borderTop: "1px solid var(--ln)", borderBottom: "1px solid var(--ln)" }} />

      {/* Recent deliveries */}
      <div className="pt-1">
        <div className="text-sm font-bold mb-2.5 px-[18px]" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>So'nggi yetkazishlar</div>
        {recent.map((r) => (
          <div key={r.route} className="mx-[18px] mb-2.5 rounded-2xl p-3.5 border cursor-pointer" style={{ background: "var(--wh)", borderColor: "var(--ln)" }}>
            <div className="flex justify-between mb-1.5">
              <span className="text-sm font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>{r.route}</span>
              <span className="text-sm font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "var(--or)" }}>{r.price}</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: "var(--grb)", color: "var(--gr)" }}>✓ {r.status}</span>
              <span className="text-[11px]" style={{ color: "var(--mu)" }}>{r.date}</span>
            </div>
            <div className="text-[11px]" style={{ color: "var(--sl)" }}>{r.cargo} · Yuk tekshiruvi ✓</div>
          </div>
        ))}
      </div>
    </div>
  );
}
