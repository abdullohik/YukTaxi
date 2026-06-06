import { useState, useRef } from "react";
import type { BookingState } from "@/App";

interface Props {
  onNavigate: (screen: string) => void;
  onToast: (msg: string) => void;
  booking: BookingState;
  setBooking: (b: BookingState) => void;
}

const cities = ["Toshkent", "Samarqand", "Farg'ona", "Buxoro", "Nukus", "Namangan", "Andijon", "Qarshi", "Termiz", "Urganch"];
const cargoTypes = ["Mebel", "Tez buziladigan / gul", "Elektronika / texnika", "Ulgurji tovarlar", "Qurilish materiallari", "Boshqa"];

const distanceMap: Record<string, number> = {
  "Toshkent-Samarqand": 300, "Toshkent-Farg'ona": 320, "Toshkent-Buxoro": 550, "Toshkent-Nukus": 1100,
  "Toshkent-Namangan": 330, "Toshkent-Andijon": 370, "Samarqand-Buxoro": 270, "Samarqand-Farg'ona": 390,
};

const drivers = [
  { initials: "MR", name: "Muzaffar Rahimov", truck: "Isuzu NQR · 5 tonna", rating: "4.92", deliveries: 340, dep: "09:30", dist: "2 km" },
  { initials: "BK", name: "Bobur Karimov", truck: "GAZelle Next · 2.5 tonna", rating: "4.78", deliveries: 189, dep: "10:00", dist: "5 km", color: "#1A3C5E" },
  { initials: "JY", name: "Jasur Yusupov", truck: "Hyundai Porter · 1 tonna", rating: "4.85", deliveries: 412, dep: "08:45", dist: "8 km", color: "#3A5068" },
];

const aiDetectionResults = [
  { cargoType: "Mebel", weight: 85, volume: 1.8, label: "Divan / kreslo", confidence: 92, emoji: "🛋️" },
  { cargoType: "Elektronika / texnika", weight: 22, volume: 0.4, label: "Televizor / monitor", confidence: 89, emoji: "📺" },
  { cargoType: "Mebel", weight: 140, volume: 3.2, label: "Shkaf / javon", confidence: 94, emoji: "🚪" },
  { cargoType: "Tez buziladigan / gul", weight: 18, volume: 0.6, label: "Gul / o'simliklar", confidence: 87, emoji: "🌸" },
  { cargoType: "Ulgurji tovarlar", weight: 210, volume: 4.5, label: "Qutili tovarlar", confidence: 91, emoji: "📦" },
  { cargoType: "Elektronika / texnika", weight: 45, volume: 0.9, label: "Maishiy texnika", confidence: 88, emoji: "🧺" },
];

interface AiResult {
  cargoType: string; weight: number; volume: number; label: string; confidence: number; emoji: string; dimensions: string;
}

// Local photo slot state with thumbnail preview
interface PhotoSlotUI {
  label: string;
  uploaded: boolean;
  preview: string | null;
}

export function CustomerBook({ onNavigate, onToast, booking, setBooking }: Props) {
  const [showDrivers, setShowDrivers] = useState(false);
  const [photoSlots, setPhotoSlots] = useState<PhotoSlotUI[]>(
    booking.photos.map((p) => ({ ...p, preview: null }))
  );
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const aiFileRef = useRef<HTMLInputElement>(null);
  const slotFileRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { from, to, weight, volume, cargoType, selectedDriver, aiResult } = booking;

  function update(partial: Partial<BookingState>) {
    setBooking({ ...booking, ...partial });
  }

  const key = `${from}-${to}`;
  const rkey = `${to}-${from}`;
  const dist = distanceMap[key] || distanceMap[rkey] || 450;
  const base = dist * 800 + weight * 600 + volume * 15000;
  const lo = Math.round(base / 5000) * 5000;
  const hi = Math.round((base * 1.22) / 5000) * 5000;

  function handleAiPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoPreview(ev.target?.result as string);
      update({ aiResult: null });
      runAiAnalysis();
    };
    reader.readAsDataURL(file);
  }

  function runAiAnalysis() {
    setAiAnalyzing(true);
    const raw = aiDetectionResults[Math.floor(Math.random() * aiDetectionResults.length)];
    const w = Math.floor(Math.random() * 60 + 60);
    const h = Math.floor(Math.random() * 80 + 60);
    const d = Math.floor(Math.random() * 50 + 30);
    setTimeout(() => {
      const result: AiResult = { ...raw, dimensions: `${w} × ${h} × ${d} sm` };
      update({ aiResult: result, weight: result.weight, volume: result.volume, cargoType: result.cargoType });
      setAiAnalyzing(false);
      onToast(`AI aniqladi: ${result.label} · ${result.weight} kg`);
    }, 2200);
  }

  function handleSlotPhoto(i: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const preview = ev.target?.result as string;
      setPhotoSlots((prev) => prev.map((p, idx) => idx === i ? { ...p, uploaded: true, preview } : p));
      update({ photos: booking.photos.map((p, idx) => idx === i ? { ...p, uploaded: true } : p) });
      onToast(`${photoSlots[i].label} yuklandi ✓`);
    };
    reader.readAsDataURL(file);
  }

  function validateAndShowDrivers() {
    if (from === to) { onToast("Shaharlar bir xil bo'lmasligi kerak"); return; }
    if (weight <= 0) { onToast("Og'irlikni kiriting"); return; }
    if (volume <= 0) { onToast("Hajmni kiriting"); return; }
    setShowDrivers(true);
  }

  function confirmBook() {
    if (selectedDriver === null) return;
    update({ confirmed: true });
    onToast("Buyurtma muvaffaqiyatli tasdiqlandi! 🎉");
    setTimeout(() => onNavigate("track"), 400);
  }

  const ai = aiResult as AiResult | null;

  return (
    <div className="pb-20 slide-up">
      <div className="px-[18px] pt-5 pb-2">
        <div className="text-[19px] font-black" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>Yuk yuborish</div>
        <div className="text-xs mt-0.5" style={{ color: "var(--mu)" }}>AI narxlash · Tasdiqlangan haydovchilar · Yuk tekshiruvi</div>
      </div>

      <div className="px-[18px]">

        {/* ── AI PHOTO SCAN ── */}
        <div className="rounded-2xl border-[1.5px] mb-4 overflow-hidden" style={{ borderColor: "var(--or)" }}>
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">🤖</span>
              <span className="text-sm font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>AI Yuk Skaneri</span>
              <span className="text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full ml-1" style={{ background: "var(--or)" }}>YANGI</span>
            </div>
            <p className="text-[11px] leading-snug mb-3" style={{ color: "var(--mu)" }}>
              Yukingizning rasmini oling — AI og'irlik, o'lcham va narxni avtomatik hisoblaydi
            </p>

            <input ref={aiFileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleAiPhoto} />

            {!photoPreview && !aiAnalyzing && (
              <button
                onClick={() => aiFileRef.current?.click()}
                className="w-full h-[120px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all active:scale-[0.97]"
                style={{ borderColor: "var(--or)", background: "var(--orl)" }}
              >
                <span className="text-3xl">📷</span>
                <span className="text-sm font-bold" style={{ color: "var(--or)", fontFamily: "'Syne', sans-serif" }}>Rasm olish yoki yuklash</span>
                <span className="text-[10px]" style={{ color: "var(--mu)" }}>AI yukni o'zi tahlil qiladi</span>
              </button>
            )}

            {aiAnalyzing && (
              <div className="w-full h-[120px] rounded-xl flex flex-col items-center justify-center gap-3" style={{ background: "var(--nv)" }}>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-2 h-2 rounded-full" style={{ background: "var(--or)", animation: `pulse-dot 1s ${i * 0.2}s infinite` }} />
                  ))}
                </div>
                <div className="text-xs text-center" style={{ color: "rgba(255,255,255,.7)" }}>
                  <div className="font-medium mb-0.5">AI tahlil qilmoqda...</div>
                  <div style={{ color: "rgba(255,255,255,.4)" }}>Og'irlik · O'lcham · Narx hisoblanmoqda</div>
                </div>
              </div>
            )}

            {photoPreview && !aiAnalyzing && (
              <div className="relative">
                <img src={photoPreview} alt="Yuk rasmi" className="w-full h-[120px] object-cover rounded-xl" />
                <button onClick={() => { setPhotoPreview(null); update({ aiResult: null }); }} className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white" style={{ background: "rgba(0,0,0,.5)" }}>✕</button>
                <div className="absolute bottom-0 left-0 right-0 rounded-b-xl px-2 py-1 text-[10px] font-medium text-white" style={{ background: "rgba(0,0,0,.5)" }}>📸 AI skanerlangan rasm</div>
              </div>
            )}
          </div>

          {ai && (
            <div className="px-4 pb-4 slide-up">
              <div className="rounded-xl p-3" style={{ background: "var(--nv)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{ai.emoji}</span>
                  <div>
                    <div className="text-sm font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{ai.label}</div>
                    <div className="text-[10px]" style={{ color: "rgba(255,255,255,.5)" }}>AI aniqladi · {ai.confidence}% ishonchlilik</div>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "#22C55E22", color: "#22C55E" }}>✓ Tasdiqlandi</div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[["⚖️", "Og'irlik", `~${ai.weight} kg`], ["📐", "O'lcham", ai.dimensions], ["📦", "Hajm", `~${ai.volume} m³`]].map(([icon, label, val]) => (
                    <div key={label as string} className="rounded-lg p-2 text-center" style={{ background: "rgba(255,255,255,.07)" }}>
                      <div className="text-base mb-0.5">{icon}</div>
                      <div className="text-[9px] mb-0.5" style={{ color: "rgba(255,255,255,.45)" }}>{label}</div>
                      <div className="text-[11px] font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{val}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-[11px] px-3 py-2 rounded-lg" style={{ background: "rgba(232,99,26,.15)", color: "var(--or)" }}>
                  ⚡ Quyidagi maydonlar avtomatik to'ldirildi
                </div>
              </div>
              <button onClick={() => aiFileRef.current?.click()} className="w-full mt-2 py-2 rounded-xl text-xs font-medium border transition-all" style={{ background: "transparent", borderColor: "var(--or)", color: "var(--or)" }}>
                🔄 Boshqa rasm yuklash
              </button>
            </div>
          )}
        </div>

        {/* Route */}
        <div className="mb-3.5">
          <label className="text-[11px] font-medium block mb-1 uppercase tracking-wide" style={{ color: "var(--sl)" }}>Qayerdan</label>
          <select className="w-full rounded-xl px-3 py-2.5 text-sm border-[1.5px] outline-none appearance-none" style={{ borderColor: "var(--ln)", color: "var(--nv)", background: "var(--wh)" }} value={from} onChange={(e) => update({ from: e.target.value })}>
            {cities.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="mb-3.5">
          <label className="text-[11px] font-medium block mb-1 uppercase tracking-wide" style={{ color: "var(--sl)" }}>Qayerga</label>
          <select className="w-full rounded-xl px-3 py-2.5 text-sm border-[1.5px] outline-none appearance-none" style={{ borderColor: "var(--ln)", color: "var(--nv)", background: "var(--wh)" }} value={to} onChange={(e) => update({ to: e.target.value })}>
            {cities.filter((c) => c !== from).map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Weight & volume */}
        <div className="grid grid-cols-2 gap-2.5 mb-3.5">
          <div>
            <label className="text-[11px] font-medium block mb-1 uppercase tracking-wide flex items-center gap-1" style={{ color: "var(--sl)" }}>
              Og'irlik (kg) {ai && <span className="text-[9px] px-1 py-0.5 rounded" style={{ background: "var(--orl)", color: "var(--or)" }}>AI ✓</span>}
            </label>
            <input type="number" className="w-full rounded-xl px-3 py-2.5 text-sm border-[1.5px] outline-none" style={{ borderColor: ai ? "var(--or)" : "var(--ln)", color: "var(--nv)", background: "var(--wh)" }} value={weight} onChange={(e) => update({ weight: Number(e.target.value) })} />
          </div>
          <div>
            <label className="text-[11px] font-medium block mb-1 uppercase tracking-wide flex items-center gap-1" style={{ color: "var(--sl)" }}>
              Hajm (m³) {ai && <span className="text-[9px] px-1 py-0.5 rounded" style={{ background: "var(--orl)", color: "var(--or)" }}>AI ✓</span>}
            </label>
            <input type="number" className="w-full rounded-xl px-3 py-2.5 text-sm border-[1.5px] outline-none" style={{ borderColor: ai ? "var(--or)" : "var(--ln)", color: "var(--nv)", background: "var(--wh)" }} value={volume} step="0.1" onChange={(e) => update({ volume: Number(e.target.value) })} />
          </div>
        </div>

        <div className="mb-3.5">
          <label className="text-[11px] font-medium block mb-1 uppercase tracking-wide flex items-center gap-1" style={{ color: "var(--sl)" }}>
            Yuk turi {ai && <span className="text-[9px] px-1 py-0.5 rounded" style={{ background: "var(--orl)", color: "var(--or)" }}>AI ✓</span>}
          </label>
          <select className="w-full rounded-xl px-3 py-2.5 text-sm border-[1.5px] outline-none appearance-none" style={{ borderColor: ai ? "var(--or)" : "var(--ln)", color: "var(--nv)", background: "var(--wh)" }} value={cargoType} onChange={(e) => update({ cargoType: e.target.value })}>
            {cargoTypes.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div>
            <label className="text-[11px] font-medium block mb-1 uppercase tracking-wide" style={{ color: "var(--sl)" }}>Sana</label>
            <input type="date" className="w-full rounded-xl px-3 py-2.5 text-sm border-[1.5px] outline-none" style={{ borderColor: "var(--ln)", color: "var(--nv)", background: "var(--wh)" }} defaultValue="2025-06-05" />
          </div>
          <div>
            <label className="text-[11px] font-medium block mb-1 uppercase tracking-wide" style={{ color: "var(--sl)" }}>Vaqt</label>
            <input type="time" className="w-full rounded-xl px-3 py-2.5 text-sm border-[1.5px] outline-none" style={{ borderColor: "var(--ln)", color: "var(--nv)", background: "var(--wh)" }} defaultValue="09:00" />
          </div>
        </div>

        {/* AI Price */}
        <div className="rounded-2xl p-4 mb-4 relative overflow-hidden" style={{ background: "var(--nv)" }}>
          <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full" style={{ background: "rgba(232,99,26,.08)" }} />
          <div className="inline-block text-[10px] font-bold text-white px-2 py-0.5 rounded-full mb-2.5" style={{ background: "var(--or)", fontFamily: "'Syne', sans-serif", letterSpacing: ".5px" }}>⚡ AI Narx Bahosi</div>
          <div className="text-2xl font-black text-white mb-0.5" style={{ fontFamily: "'Syne', sans-serif" }}>{lo.toLocaleString()} – {hi.toLocaleString()} so'm</div>
          <div className="text-xs mb-3" style={{ color: "rgba(255,255,255,.5)" }}>
            {ai ? "AI yuk tahlili asosida hisoblangan narx" : "Adolatli bozor narxi oralig'i"}
          </div>
          {[["Masofa", `~${dist} km`], ["Yuk og'irligi", `${weight} kg`], ["Yuk hajmi", `${volume} m³`], ["Yuk turi", cargoType], ["Hozirgi talab", "Past · qulay narx"]].map(([k, v]) => (
            <div key={k} className="flex justify-between text-xs mb-1">
              <span style={{ color: "rgba(255,255,255,.55)" }}>{k}</span>
              <span className="font-medium text-white">{v}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-3 pt-2.5 border-t" style={{ borderColor: "rgba(255,255,255,.08)" }}>
            <span className="text-[11px]" style={{ color: "rgba(255,255,255,.4)" }}>AI ishonchliligi</span>
            <div className="flex-1 h-[3px] rounded-full" style={{ background: "rgba(255,255,255,.15)" }}>
              <div className="h-full rounded-full" style={{ background: "#22C55E", width: `${ai ? ai.confidence : 87}%` }} />
            </div>
            <span className="text-[11px]" style={{ color: "rgba(255,255,255,.4)" }}>{ai ? ai.confidence : 87}%</span>
          </div>
        </div>

        {/* Cargo Check photo slots */}
        <div className="rounded-2xl p-4 mb-4 border-[1.5px]" style={{ borderColor: "var(--or)" }}>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base" style={{ background: "var(--orl)", color: "var(--or)" }}>📷</div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>Yuk Tekshiruvi™</span>
                <span className="text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full" style={{ background: "var(--or)" }}>BIZNING USTUNLIK</span>
              </div>
              <div className="text-[11px]" style={{ color: "var(--mu)" }}>Foto tasdiqlash ikki tomonni ham himoya qiladi</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {photoSlots.map((p, i) => (
              <div key={p.label} className="relative">
                <input
                  ref={(el) => { slotFileRefs.current[i] = el; }}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => handleSlotPhoto(i, e)}
                />
                <button
                  onClick={() => slotFileRefs.current[i]?.click()}
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
          <div className="flex items-start gap-1.5 text-[11px] leading-snug" style={{ color: "var(--sl)" }}>
            <span style={{ color: "var(--or)" }}>🛡️</span>
            Haydovchi olib ketishda bir xil suratga oladi. AI ikkala to'plamni solishtiradi.
          </div>
        </div>

        <button onClick={validateAndShowDrivers} className="w-full rounded-xl py-3.5 text-sm font-bold text-white mb-4 transition-all active:scale-[0.98]" style={{ background: "var(--or)", fontFamily: "'Syne', sans-serif" }}>
          Mavjud mashinalarni ko'rish 🔍
        </button>

        {showDrivers && (
          <div className="mb-4 slide-up">
            <div className="text-sm font-bold mb-2.5" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>Mavjud haydovchilar · {drivers.length} ta</div>
            {drivers.map((d, i) => (
              <button
                key={d.name}
                onClick={() => update({ selectedDriver: i })}
                className="w-full text-left rounded-2xl p-3.5 mb-2.5 border-[1.5px] transition-all"
                style={{ borderColor: selectedDriver === i ? "var(--or)" : "var(--ln)", background: selectedDriver === i ? "var(--orl)" : "var(--wh)" }}
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: (d as any).color || "var(--nv)", fontFamily: "'Syne', sans-serif" }}>{d.initials}</div>
                  <div>
                    <div className="text-sm font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)" }}>{d.name}</div>
                    <div className="text-[11px]" style={{ color: "var(--mu)" }}>{d.truck}</div>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-sm font-semibold" style={{ color: "var(--am)" }}>⭐ {d.rating}</div>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  <span className="text-[10px] px-2 py-1 rounded-lg" style={{ background: "var(--bg)", color: "var(--sl)" }}>🚚 {d.deliveries} ta yetkazish</span>
                  <span className="text-[10px] px-2 py-1 rounded-lg" style={{ background: "var(--bg)", color: "var(--sl)" }}>⏰ {d.dep} jo'naydi</span>
                  <span className="text-[10px] px-2 py-1 rounded-lg" style={{ background: "var(--bg)", color: "var(--sl)" }}>📍 {d.dist}</span>
                  <span className="text-[11px] ml-auto flex items-center gap-1 font-medium" style={{ color: "var(--gr)" }}>✅ Tasdiqlangan</span>
                </div>
              </button>
            ))}

            {selectedDriver !== null && (
              <button onClick={confirmBook} className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all active:scale-[0.98] slide-up" style={{ background: "var(--or)", fontFamily: "'Syne', sans-serif" }}>
                Buyurtmani tasdiqlash ✓
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
