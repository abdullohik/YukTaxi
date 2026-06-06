import { useState } from "react";

export interface DriverRequest {
  route: string;
  deadline: string;
  earn: string;
  tags: string[];
  urgent: boolean;
}

interface Props {
  onToast: (msg: string) => void;
  requests: DriverRequest[];
  onAccept: (i: number) => void;
  onDecline: (i: number) => void;
}

const dStats = [
  { v: "340", l: "Jami yetkazish" },
  { v: "4.92", l: "Reyting" },
  { v: "98%", l: "O'z vaqtida" },
  { v: "6 oy", l: "Platformada" },
];

export function DriverHome({ onToast, requests, onAccept, onDecline }: Props) {
  const [online, setOnline] = useState(true);

  return (
    <div className="pb-20 slide-up">
      {/* Hero */}
      <div className="relative overflow-hidden px-[18px] py-6" style={{ background: "linear-gradient(135deg,#0a1520 0%,var(--nv) 100%)" }}>
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full" style={{ background: "rgba(232,99,26,.12)" }} />
        <div className="text-sm mb-1" style={{ color: "var(--mu)", fontWeight: 300 }}>Xayrli tong, Muzaffar 🚛</div>
        <div className="flex items-start justify-between mb-0.5">
          <div>
            <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,.5)" }}>Bugungi daromad</div>
            <div className="text-[36px] font-black text-white leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>485 000</div>
            <div className="text-xs mt-1 mb-4" style={{ color: "rgba(255,255,255,.45)" }}>3 ta yetkazish · so'm · Bugun</div>
          </div>
          <div className="text-right">
            <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,.5)" }}>Oylik</div>
            <div className="text-xl font-bold" style={{ color: "rgba(255,255,255,.8)", fontFamily: "'Syne', sans-serif" }}>6.2M so'm</div>
          </div>
        </div>
        {/* Online toggle */}
        <button
          onClick={() => { setOnline((v) => !v); onToast(online ? "Siz endi oflayndasiz" : "Siz endi onlayndasiz"); }}
          className="w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5"
          style={{ background: "rgba(255,255,255,.08)" }}
        >
          <div className="relative w-11 h-6 rounded-full flex-shrink-0 transition-colors duration-300" style={{ background: online ? "#22C55E" : "rgba(255,255,255,.2)" }}>
            <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300" style={{ left: online ? "22px" : "2px" }} />
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-white">{online ? "Onlayn — yangi buyurtmalar qabul qilinmoqda" : "Oflayn — dam olish rejimi"}</div>
            <div className="text-[11px]" style={{ color: "rgba(255,255,255,.4)" }}>Bugun 6:45 dan beri faol</div>
          </div>
        </button>
      </div>

      {/* Active trip */}
      <div className="px-[18px] pt-5 pb-1">
        <div className="text-sm font-bold mb-2.5" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>Faol sayohat</div>
        <div className="rounded-2xl p-4" style={{ background: "var(--nv)" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Toshkent</span>
            <span style={{ color: "var(--or)" }}>→</span>
            <span className="font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Samarqand</span>
            <div className="ml-auto flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,.7)" }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#22C55E" }} />
              Yo'lda
            </div>
          </div>
          <div className="flex gap-2 mb-3 flex-wrap">
            {[["📍", "112 km qoldi"], ["⏰", "ETA 14:30"], ["💵", "315 000 so'm"]].map(([ic, txt]) => (
              <div key={txt} className="flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.7)" }}>
                {ic} {txt}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => onToast("Navigatsiya ochildi")} className="flex-1 rounded-xl py-2.5 text-xs font-bold text-white" style={{ background: "var(--or)", fontFamily: "'Syne', sans-serif" }}>
              🗺️ Yo'l ko'rsat
            </button>
            <button onClick={() => onToast("Mijoz bilan bog'lanish")} className="flex-1 rounded-xl py-2.5 text-xs font-bold" style={{ background: "rgba(255,255,255,.1)", color: "rgba(255,255,255,.8)", fontFamily: "'Syne', sans-serif" }}>
              📞 Qo'ng'iroq
            </button>
          </div>
        </div>
      </div>

      <div className="h-[7px] my-3" style={{ background: "var(--bg)", borderTop: "1px solid var(--ln)", borderBottom: "1px solid var(--ln)" }} />

      {/* Incoming requests */}
      <div className="px-[18px] pt-1">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-sm font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>Yo'ldagi yangi so'rovlar</span>
          {requests.length > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "var(--orl)", color: "var(--or)" }}>{requests.length} ta yangi</span>
          )}
        </div>

        {requests.length === 0 ? (
          <div className="rounded-2xl p-6 text-center border" style={{ background: "var(--wh)", borderColor: "var(--ln)" }}>
            <div className="text-3xl mb-2">🎉</div>
            <div className="text-sm font-medium" style={{ color: "var(--mu)" }}>Hozircha yangi so'rovlar yo'q</div>
          </div>
        ) : requests.map((r, i) => (
          <div key={r.route + i} className="rounded-2xl p-4 mb-2.5 border-[1.5px] transition-all" style={{ borderColor: r.urgent ? "var(--rd)" : "var(--ln)", background: "var(--wh)" }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>{r.route}</span>
                  {r.urgent && <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full" style={{ background: "var(--rd)" }}>SHOSHILINCH</span>}
                </div>
                <div className="text-xs" style={{ color: "var(--mu)" }}>{r.deadline}</div>
              </div>
              <div className="text-sm font-black" style={{ fontFamily: "'Syne', sans-serif", color: "var(--gr)" }}>{r.earn}</div>
            </div>
            <div className="flex gap-1.5 flex-wrap mb-3">
              {r.tags.map((t) => (
                <span key={t} className="text-[11px] px-2 py-1 rounded-lg" style={{ background: "var(--bg)", color: "var(--sl)" }}>{t}</span>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => onAccept(i)} className="flex-1 rounded-xl py-2.5 text-sm font-bold text-white transition-all active:scale-[0.97]" style={{ background: "var(--or)", fontFamily: "'Syne', sans-serif" }}>Qabul qilish</button>
              <button onClick={() => onDecline(i)} className="flex-1 rounded-xl py-2.5 text-sm font-bold border" style={{ background: "var(--bg)", color: "var(--sl)", borderColor: "var(--ln)", fontFamily: "'Syne', sans-serif" }}>O'tkazib yuborish</button>
            </div>
          </div>
        ))}
      </div>

      <div className="h-[7px] my-3" style={{ background: "var(--bg)", borderTop: "1px solid var(--ln)", borderBottom: "1px solid var(--ln)" }} />

      {/* Stats */}
      <div className="px-[18px] pt-1 pb-2">
        <div className="text-sm font-bold mb-2.5" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>Sizning ko'rsatkichlaringiz</div>
        <div className="flex gap-2 overflow-x-auto">
          {dStats.map((s) => (
            <div key={s.l} className="flex-shrink-0 rounded-xl p-2.5 border" style={{ background: "var(--wh)", borderColor: "var(--ln)" }}>
              <div className="text-base font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>{s.v}</div>
              <div className="text-[10px] mt-0.5" style={{ color: "var(--mu)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
