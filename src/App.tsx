import { useState } from "react";
import { Home, Plus, MapPin, ClipboardList, User, Navigation, Camera, Wallet } from "lucide-react";
import { useToast } from "@/components/Toast";
import { CustomerHome } from "@/screens/customer/CustomerHome";
import { CustomerBook } from "@/screens/customer/CustomerBook";
import { CustomerTrack } from "@/screens/customer/CustomerTrack";
import { CustomerHistory } from "@/screens/customer/CustomerHistory";
import { CustomerProfile } from "@/screens/customer/CustomerProfile";
import { DriverHome, type DriverRequest } from "@/screens/driver/DriverHome";
import { DriverTrack } from "@/screens/driver/DriverTrack";
import { DriverCargoCheck } from "@/screens/driver/DriverCargoCheck";
import { DriverEarnings } from "@/screens/driver/DriverEarnings";
import { DriverProfile } from "@/screens/driver/DriverProfile";

type Mode = "customer" | "driver";
type CustomerScreen = "home" | "book" | "track" | "history" | "profile";
type DriverScreen = "home" | "track" | "cargocheck" | "earnings" | "profile";

export interface BookingState {
  from: string;
  to: string;
  weight: number;
  volume: number;
  cargoType: string;
  selectedDriver: number | null;
  confirmed: boolean;
  photos: { label: string; uploaded: boolean }[];
  aiResult: any | null;
}

const defaultBooking: BookingState = {
  from: "Toshkent",
  to: "Samarqand",
  weight: 120,
  volume: 3,
  cargoType: "Mebel",
  selectedDriver: null,
  confirmed: false,
  photos: [
    { label: "Old ko'rinish", uploaded: false },
    { label: "Yon ko'rinish", uploaded: false },
    { label: "Belgi / yorliq", uploaded: false },
    { label: "Holat isboti", uploaded: false },
  ],
  aiResult: null,
};

const initialRequests: DriverRequest[] = [
  { route: "Toshkent → Samarqand", deadline: "Bugun 11:00 ga kerak", earn: "+120 000 so'm", tags: ["45 kg", "0.8 m³", "Yangi gullar", "Siz yo'lingizda"], urgent: true },
  { route: "Toshkent → Samarqand", deadline: "Bugun 13:00 gacha moslashuvchan", earn: "+85 000 so'm", tags: ["120 kg", "1.5 m³", "Mebel", "Siz yo'lingizda"], urgent: false },
];

const customerTabs: { id: CustomerScreen; Icon: typeof Home; label: string }[] = [
  { id: "home", Icon: Home, label: "Bosh sahifa" },
  { id: "book", Icon: Plus, label: "Buyurtma" },
  { id: "track", Icon: MapPin, label: "Kuzatish" },
  { id: "history", Icon: ClipboardList, label: "Tarix" },
  { id: "profile", Icon: User, label: "Profil" },
];

const driverTabs: { id: DriverScreen; Icon: typeof Home; label: string }[] = [
  { id: "home", Icon: Home, label: "Bosh" },
  { id: "track", Icon: Navigation, label: "Sayohat" },
  { id: "cargocheck", Icon: Camera, label: "Tekshiruv" },
  { id: "earnings", Icon: Wallet, label: "Daromad" },
  { id: "profile", Icon: User, label: "Profil" },
];

export default function App() {
  const [mode, setMode] = useState<Mode>("customer");
  const [customerScreen, setCustomerScreen] = useState<CustomerScreen>("home");
  const [driverScreen, setDriverScreen] = useState<DriverScreen>("home");
  const [booking, setBooking] = useState<BookingState>(defaultBooking);
  const [driverRequests, setDriverRequests] = useState<DriverRequest[]>(initialRequests);
  const { showToast, ToastEl } = useToast();

  function switchMode(newMode: Mode) {
    setMode(newMode);
    if (newMode === "customer") {
      setCustomerScreen("home");
      showToast("Mijoz rejimiga o'tildi");
    } else {
      setDriverScreen("home");
      showToast("Haydovchi rejimiga o'tildi");
    }
  }

  function acceptRequest(i: number) {
    showToast("So'rov qabul qilindi! ✅");
    setDriverRequests((prev) => prev.filter((_, idx) => idx !== i));
  }

  function declineRequest(i: number) {
    showToast("So'rov rad etildi");
    setDriverRequests((prev) => prev.filter((_, idx) => idx !== i));
  }

  function renderCustomer() {
    switch (customerScreen) {
      case "home": return <CustomerHome onNavigate={(s) => setCustomerScreen(s as CustomerScreen)} onToast={showToast} />;
      case "book": return <CustomerBook onNavigate={(s) => setCustomerScreen(s as CustomerScreen)} onToast={showToast} booking={booking} setBooking={setBooking} />;
      case "track": return <CustomerTrack onToast={showToast} onNavigate={(s) => setCustomerScreen(s as CustomerScreen)} booking={booking} />;
      case "history": return <CustomerHistory onToast={showToast} />;
      case "profile": return <CustomerProfile onNavigate={(s) => setCustomerScreen(s as CustomerScreen)} onToast={showToast} />;
    }
  }

  function renderDriver() {
    switch (driverScreen) {
      case "home": return <DriverHome onToast={showToast} requests={driverRequests} onAccept={acceptRequest} onDecline={declineRequest} />;
      case "track": return <DriverTrack onToast={showToast} />;
      case "cargocheck": return <DriverCargoCheck onToast={showToast} />;
      case "earnings": return <DriverEarnings onToast={showToast} />;
      case "profile": return <DriverProfile onNavigate={(s) => setDriverScreen(s as DriverScreen)} onToast={showToast} />;
    }
  }

  return (
    <div className="flex items-start justify-center min-h-screen" style={{ background: "#111" }}>
      <div className="relative w-full max-w-[430px] min-h-screen" style={{ background: "var(--bg)", boxShadow: "0 0 80px rgba(0,0,0,.6)" }}>

        {/* Status bar */}
        <div className="flex justify-between items-center px-5 py-2" style={{ background: "var(--nv)" }}>
          <span className="text-xs font-semibold text-white">9:41</span>
          <div className="flex gap-1.5 text-white text-[11px]">
            <span>📶</span><span>🔋</span>
          </div>
        </div>

        {/* Top nav */}
        <div className="sticky top-0 z-50 flex items-center justify-between px-4 h-[58px] border-b" style={{ background: "var(--wh)", borderColor: "var(--ln)" }}>
          <div className="text-[22px] font-black" style={{ fontFamily: "'Syne', sans-serif", color: "var(--nv)", letterSpacing: "-0.5px" }}>
            YUK<span style={{ color: "var(--or)" }}>TAXI</span>
          </div>

          {/* Mode pill */}
          <div className="flex rounded-full p-[3px] gap-0.5 border" style={{ background: "var(--bg)", borderColor: "var(--ln)" }}>
            {(["customer", "driver"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className="px-3 py-1 rounded-full text-xs font-medium transition-all"
                style={mode === m ? { background: "var(--or)", color: "#fff" } : { background: "transparent", color: "var(--mu)" }}
              >
                {m === "customer" ? "Mijoz" : "Haydovchi"}
              </button>
            ))}
          </div>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "var(--nv)", fontFamily: "'Syne', sans-serif" }}>
            {mode === "customer" ? "KN" : "MR"}
          </div>
        </div>

        {/* Screen content */}
        <div className="overflow-y-auto" style={{ minHeight: "calc(100vh - 58px - 32px - 62px)" }}>
          {mode === "customer" ? renderCustomer() : renderDriver()}
        </div>

        {/* Bottom nav */}
        <div className="fixed bottom-0 h-[62px] flex border-t z-50" style={{ background: "var(--wh)", borderColor: "var(--ln)", width: "100%", maxWidth: 430 }}>
          {mode === "customer"
            ? customerTabs.map(({ id, Icon, label }) => {
                const active = customerScreen === id;
                return (
                  <button
                    key={id}
                    onClick={() => setCustomerScreen(id)}
                    className="flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors"
                    style={{ color: active ? "var(--or)" : "var(--mu)" }}
                  >
                    <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                    <span>{label}</span>
                  </button>
                );
              })
            : driverTabs.map(({ id, Icon, label }) => {
                const active = driverScreen === id;
                return (
                  <button
                    key={id}
                    onClick={() => setDriverScreen(id)}
                    className="flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors"
                    style={{ color: active ? "var(--or)" : "var(--mu)" }}
                  >
                    <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                    <span>{label}</span>
                  </button>
                );
              })
          }
        </div>

        <ToastEl />
      </div>
    </div>
  );
}
