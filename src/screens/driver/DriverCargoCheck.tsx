import { useState, useRef } from "react";

interface Props {
  onToast: (msg: string) => void;
}

interface PhotoSlot {
  label: string;
  uploaded: boolean;
  preview: string | null;
}

export function DriverCargoCheck({ onToast }: Props) {
  const [photos, setPhotos] = useState<PhotoSlot[]>([
    { label: "Old ko'rinish", uploaded: false, preview: null },
    { label: "Yon ko'rinish", uploaded: false, preview: null },
    { label: "Zarar tekshiruvi", uploaded: false, preview: null },
    { label: "Belgilar / yorliqlar", uploaded: false, preview: null },
  ]);
  const [aiDone, setAiDone] = useState(false);
  const [running, setRunning] = useState(false);
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleFileChange(i: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotos((prev) =>
        prev.map((p, idx) =>
          idx === i ? { ...p, uploaded: true, preview: ev.target?.result as string } : p
        )
      );
      onToast(`${photos[i].label} yuklandi ✓`);
    };
    reader.readAsDataURL(file);
  }

  function runAI() {
    setRunning(true);
    setTimeout(() => { setRunning(false); setAiDone(true); onToast("AI tekshiruvi yakunlandi ✓"); }, 1800);
  }

  return (
    <div className="pb-20 slide-up">
      <div className="px-[18px] pt-5 pb-2">
        <div className="text-[19px] font-black" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>Yuk Tekshiruvi™</div>
        <div className="text-xs mt-0.5" style={{ color: "var(--mu)" }}>Olib ketishda yuk holatini tasdiqlang</div>
      </div>

      {/* Customer reference photos */}
      <div className="mx-[18px] mb-3.5 rounded-2xl p-4" style={{ background: "var(--nv)" }}>
        <div className="text-[11px] mb-2 uppercase tracking-wide" style={{ color: "rgba(255,255,255,.5)" }}>Mijoz yuklagan suratlar</div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {["Old ko'rinish", "Yon ko'rinish"].map((l) => (
            <div key={l} className="rounded-xl flex flex-col items-center justify-center gap-1 text-3xl" style={{ height: 70, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)" }}>
              🛋️
              <div className="text-[10px]" style={{ color: "rgba(255,255,255,.45)" }}>{l}</div>
            </div>
          ))}
        </div>
        <div className="text-[11px]" style={{ color: "rgba(255,255,255,.45)" }}>Siz oladigan yuk shunday ko'rinishi kerak</div>
      </div>

      {/* Driver upload section */}
      <div className="mx-[18px] rounded-2xl p-4 border-[1.5px] mb-4" style={{ borderColor: "var(--or)" }}>
        <div className="text-sm font-bold mb-3" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>1-qadam: O'z fotolaringizni oling</div>

        {[
          { n: "1", t: "Yukni mijoz suratidagi burchakdan oling", s: "Bir xil burchak taqqoslashni osonlashtiradi" },
          { n: "2", t: "Belgilar va zararni ko'rsating", s: "Bu sizni noto'g'ri da'volardan himoya qiladi" },
        ].map((step) => (
          <div key={step.n} className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: "var(--or)", fontFamily: "'Syne', sans-serif" }}>{step.n}</div>
            <div>
              <div className="text-sm" style={{ color: "var(--nv)" }}>{step.t}</div>
              <div className="text-[11px] mt-0.5" style={{ color: "var(--mu)" }}>{step.s}</div>
            </div>
          </div>
        ))}

        <div className="grid grid-cols-2 gap-2 mb-4">
          {photos.map((p, i) => (
            <div key={p.label} className="relative">
              <input
                ref={(el) => { fileRefs.current[i] = el; }}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => handleFileChange(i, e)}
              />
              <button
                onClick={() => fileRefs.current[i]?.click()}
                className="w-full h-[85px] rounded-xl flex flex-col items-center justify-center gap-1 border-2 transition-all overflow-hidden relative"
                style={p.uploaded
                  ? { borderStyle: "solid", borderColor: "var(--gr)", background: "var(--grb)" }
                  : { borderStyle: "dashed", borderColor: "var(--ln)" }
                }
              >
                {p.preview ? (
                  <>
                    <img src={p.preview} alt={p.label} className="absolute inset-0 w-full h-full object-cover rounded-xl" />
                    <div className="absolute inset-x-0 bottom-0 text-[9px] text-white text-center py-0.5 rounded-b-xl" style={{ background: "rgba(26,158,92,.8)" }}>✓ Yuklandi</div>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">{p.uploaded ? "✅" : "📷"}</span>
                    <span className="text-[10px]" style={{ color: p.uploaded ? "var(--gr)" : "var(--mu)" }}>{p.uploaded ? "Yuklandi" : p.label}</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="text-sm font-bold mb-3" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>2-qadam: AI taqqoslamoqda</div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {["Mijoz suratlari", "Sizning suratingiz"].map((l) => (
            <div key={l} className="rounded-xl flex flex-col items-center justify-center gap-1 text-2xl border" style={{ height: 70, background: "var(--bg)", borderColor: "var(--ln)", color: "var(--mu)" }}>
              {l === "Sizning suratingiz" ? "📷" : "🖼️"}
              <div className="text-[10px]" style={{ color: "var(--mu)" }}>{l}</div>
            </div>
          ))}
        </div>

        {aiDone && (
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold mb-3 slide-up" style={{ background: "var(--grb)", color: "var(--gr)" }}>
            ✅ AI tasdiqladı: Yuk mos · 96% o'xshashlik · Davom etish xavfsiz
          </div>
        )}

        <button
          onClick={runAI}
          disabled={running}
          className="w-full rounded-xl py-3 text-sm font-bold text-white mb-2 transition-all active:scale-[0.98] disabled:opacity-60"
          style={{ background: "var(--or)", fontFamily: "'Syne', sans-serif" }}
        >
          {running ? "AI tekshirmoqda..." : "AI Tekshiruvini Ishga Tushirish 🤖"}
        </button>
        <button
          onClick={() => onToast("Muammo qayd etildi va platformaga yuborildi")}
          className="w-full rounded-xl py-3 text-sm font-bold border-[1.5px] transition-all active:scale-[0.98]"
          style={{ background: "var(--wh)", borderColor: "var(--ln)", color: "var(--nv)", fontFamily: "'Syne', sans-serif" }}
        >
          ⚠️ Yuk muammosini bildirish
        </button>
      </div>
    </div>
  );
}
