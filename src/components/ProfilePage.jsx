import { useState } from "react";

// ─── Icons (inline SVG, щоб не тягнути залежності) ───────────────────────────
const IconChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconPhone = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconMapPin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconCalendar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconDollar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const IconUsers = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconFlag = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);
const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconLogout = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

// ─── Crosshair SVG (як на splash screen) ─────────────────────────────────────
const Crosshair = ({ size = 48, opacity = 0.35 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ opacity }}>
    <circle cx="24" cy="24" r="20" stroke="#e8e8e0" strokeWidth="1.2" />
    <circle cx="24" cy="24" r="8"  stroke="#e8e8e0" strokeWidth="1.2" />
    <line x1="24" y1="2"  x2="24" y2="14" stroke="#e8e8e0" strokeWidth="1.2" />
    <line x1="24" y1="34" x2="24" y2="46" stroke="#e8e8e0" strokeWidth="1.2" />
    <line x1="2"  y1="24" x2="14" y2="24" stroke="#e8e8e0" strokeWidth="1.2" />
    <line x1="34" y1="24" x2="46" y2="24" stroke="#e8e8e0" strokeWidth="1.2" />
    <circle cx="24" cy="24" r="1.5" fill="#e8e8e0" />
  </svg>
);

// ─── Дані (заміни на реальні props / API) ────────────────────────────────────
const MOCK_USER = {
  nickname: "Gerero_228",
  phone: "+380 99 434 5756",
  city: "Мукачево",
  age: 18,
  experience: "2 роки",
  note: "",
  gamesCount: 14,
  rating: 4.8,
};

const MOCK_GAMES = [
  { id: 1, name: "Гра №1", date: "18 квіт. · 15:30", city: "Ужгород",  price: "600 грн", players: "15 з 32", status: "waiting"   },
  { id: 2, name: "Гра №2", date: "22 квіт. · 10:00", city: "Мукачево", price: "600 грн", players: "15 з 20", status: "done"      },
  { id: 3, name: "Гра №3", date: "5 бер.  · 09:00",  city: "Ужгород",  price: "600 грн", players: "12 з 30", status: "cancelled" },
];

const STATUS_MAP = {
  waiting:   { label: "Очікується", cls: "bg-yellow-950/60 text-yellow-400 border border-yellow-900/50" },
  done:      { label: "Завершена",  cls: "bg-green-950/60  text-green-400  border border-green-900/50"  },
  cancelled: { label: "Скасована",  cls: "bg-red-950/60    text-red-400    border border-red-900/50"    },
};

// ─── Sub-components ───────────────────────────────────────────────────────────
const Label = ({ children }) => (
  <p className="text-[10px] tracking-widest uppercase text-neutral-600 mb-1">{children}</p>
);

const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <Label>{label}</Label>
    <input
      className="bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 text-sm placeholder-neutral-700 px-3 py-2.5 w-full outline-none focus:border-neutral-600 transition-colors"
      {...props}
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <Label>{label}</Label>
    <textarea
      className="bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 text-sm placeholder-neutral-700 px-3 py-2.5 w-full outline-none resize-none focus:border-neutral-600 transition-colors"
      rows={3}
      {...props}
    />
  </div>
);

const StatCard = ({ label, value, sub }) => (
  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
    <p className="text-[10px] tracking-widest uppercase text-neutral-600 mb-1">{label}</p>
    <p className="text-xl font-semibold text-neutral-100 leading-none">{value}</p>
    {sub && <p className="text-[11px] text-neutral-600 mt-1">{sub}</p>}
  </div>
);

const GameCard = ({ game }) => {
  const s = STATUS_MAP[game.status];
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex items-start justify-between gap-4 hover:border-neutral-700 transition-colors cursor-pointer">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-neutral-100 mb-2">{game.name}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span className="flex items-center gap-1.5 text-xs text-neutral-500"><IconCalendar /> {game.date}</span>
          <span className="flex items-center gap-1.5 text-xs text-neutral-500"><IconMapPin /> {game.city}</span>
          <span className="flex items-center gap-1.5 text-xs text-neutral-500"><IconDollar /> {game.price}</span>
          <span className="flex items-center gap-1.5 text-xs text-neutral-500"><IconUsers /> {game.players}</span>
        </div>
      </div>
      <span className={`text-[11px] font-medium px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${s.cls}`}>
        {s.label}
      </span>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ProfilePage({ onBack }) {
  const [form, setForm] = useState({
    nickname:   MOCK_USER.nickname,
    phone:      MOCK_USER.phone,
    age:        String(MOCK_USER.age),
    experience: MOCK_USER.experience,
    note:       MOCK_USER.note,
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = () => {
    // тут твій API-запит
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans">

      {/* Top bar */}
      <div className="border-b border-neutral-900 px-6 py-3.5 flex items-center gap-2.5">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-200 text-sm transition-colors"
        >
          <IconChevronLeft /> Назад
        </button>
        <span className="text-neutral-800 text-sm">·</span>
        <span className="text-sm text-neutral-400">Особистий профіль</span>
      </div>

      {/* Desktop layout: sidebar + main */}
      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

        {/* ── Sidebar ── */}
        <aside className="flex flex-col gap-4">

          {/* Avatar + name */}
          <div className="flex flex-col gap-3 mb-2">
            <div className="w-20 h-20 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
              <Crosshair size={48} opacity={0.35} />
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-neutral-600 mb-0.5">Гравець</p>
              <p className="text-2xl font-semibold text-neutral-100 tracking-tight">{form.nickname}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2.5">
            <StatCard label="Ігор"    value={MOCK_USER.gamesCount}      sub="всього"   />
            <StatCard label="Досвід"  value={form.experience}            sub=""         />
            <StatCard label="Вік"     value={form.age}                   sub="років"    />
            <StatCard label="Рейтинг" value={`★ ${MOCK_USER.rating}`}   sub="середній" />
          </div>

          {/* Contacts */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <p className="text-[10px] tracking-widest uppercase text-neutral-600 mb-3">Контакти</p>
            <div className="flex flex-col divide-y divide-neutral-800">
              <div className="flex items-center gap-2.5 py-2.5 first:pt-0">
                <span className="text-neutral-600"><IconPhone /></span>
                <span className="text-neutral-500 text-sm flex-1">Телефон</span>
                <span className="text-neutral-300 text-sm font-medium">{form.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 py-2.5 last:pb-0">
                <span className="text-neutral-600"><IconMapPin /></span>
                <span className="text-neutral-500 text-sm flex-1">Місто</span>
                <span className="text-neutral-300 text-sm font-medium">{MOCK_USER.city}</span>
              </div>
            </div>
          </div>

          {/* Logout */}
          <button className="w-full flex items-center justify-center gap-2 border border-neutral-800 hover:border-red-900 bg-transparent hover:bg-red-950/40 text-red-500 text-sm rounded-lg py-2.5 transition-colors">
            <IconLogout />
            Вийти з акаунту
          </button>
        </aside>

        {/* ── Main ── */}
        <main className="flex flex-col gap-8">

          {/* Edit form */}
          <section>
            <p className="text-[10px] tracking-widest uppercase text-neutral-600 mb-3">Редагувати профіль</p>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Input label="Нікнейм"        value={form.nickname}   onChange={handleChange("nickname")}   />
                <Input label="Номер телефону"  type="tel" value={form.phone} onChange={handleChange("phone")} />
                <Input label="Вік"             type="number" value={form.age} onChange={handleChange("age")} />
                <Input label="Досвід"          placeholder="напр. 2 роки" value={form.experience} onChange={handleChange("experience")} />
                <div className="sm:col-span-2">
                  <Textarea
                    label="Нотатка (необов'язково)"
                    placeholder="Особливі побажання, спорядження..."
                    value={form.note}
                    onChange={handleChange("note")}
                  />
                </div>
              </div>
              <button
                onClick={handleSave}
                className="bg-neutral-100 hover:bg-white text-neutral-950 text-sm font-semibold rounded-lg px-6 py-2.5 transition-colors"
              >
                {saved ? "Збережено ✓" : "Зберегти зміни"}
              </button>
            </div>
          </section>

          {/* Games list */}
          <section>
            <p className="text-[10px] tracking-widest uppercase text-neutral-600 mb-3">Мої записи на ігри</p>
            <div className="flex flex-col gap-2.5">
              {MOCK_GAMES.map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
              {MOCK_GAMES.length === 0 && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-center">
                  <p className="text-neutral-600 text-sm">Ти ще не записаний на жодну гру</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 flex justify-around py-2.5 pb-5">
        <button onClick={onBack} className="flex flex-col items-center gap-1 text-neutral-500 text-[10px]">
          <IconFlag />
          Доступні ігри
        </button>
        <button className="flex flex-col items-center gap-1 text-neutral-200 text-[10px]">
          <IconUser />
          Профіль
        </button>
      </nav>
    </div>
  );
}
