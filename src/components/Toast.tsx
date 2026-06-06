import { useEffect, useState, useRef } from "react";

interface ToastItem {
  id: number;
  message: string;
}

interface ToastProps {
  message: string;
  onDone: () => void;
}

function ToastBubble({ message, onDone }: ToastProps) {
  const [visible, setVisible] = useState(true);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDoneRef.current(), 300);
    }, 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`rounded-xl px-4 py-2.5 text-center text-sm font-medium text-white transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
      style={{ background: "var(--nv)", whiteSpace: "nowrap", pointerEvents: "none" }}
    >
      {message}
    </div>
  );
}

export function useToast() {
  const [queue, setQueue] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  function showToast(m: string) {
    setQueue((prev) => {
      const next = [...prev, { id: ++counter.current, message: m }];
      return next.slice(-3);
    });
  }

  function dismiss(id: number) {
    setQueue((prev) => prev.filter((t) => t.id !== id));
  }

  function ToastEl() {
    if (queue.length === 0) return null;
    const active = queue[0];
    return (
      <div
        className="fixed bottom-20 left-1/2 z-[999] flex flex-col items-center gap-1.5"
        style={{ transform: "translateX(-50%)" }}
      >
        <ToastBubble key={active.id} message={active.message} onDone={() => dismiss(active.id)} />
      </div>
    );
  }

  return { showToast, ToastEl };
}
