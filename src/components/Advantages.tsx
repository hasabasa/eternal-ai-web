
import React from "react";
import { Zap, TrendingUp, Check, MessageSquare, Users } from "lucide-react";

const icons = [
  <Zap key="zap" className="w-8 h-8 text-aurora5 mb-2"/>,
  <Users key="users" className="w-8 h-8 text-aurora2 mb-2"/>,
  <MessageSquare key="msg" className="w-8 h-8 text-aurora3 mb-2"/>,
  <TrendingUp key="trending" className="w-8 h-8 text-aurora4 mb-2"/>,
];

const items = [
  {
    title: "Автоматизация 24/7",
    desc: "Работает без перерывов и ошибок",
    icon: icons[0],
  },
  {
    title: "Снижение затрат",
    desc: "Меньше найма, больше точности",
    icon: icons[1],
  },
  {
    title: "Интеграция в мессенджеры",
    desc: "Там, где уже есть ваши клиенты",
    icon: icons[2],
  },
  {
    title: "Аналитика и адаптация",
    desc: "Обучение на ваших данных",
    icon: icons[3],
  },
];

const Advantages: React.FC = () => (
  <section className="max-w-5xl mx-auto my-12 md:my-20 px-4 animate-fade-in">
    <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-primary text-center">
      <span className="block">Чем полезен ИИ‑ассистент</span>
      <span className="block">вашему бизнесу</span>
    </h2>
    <div className="grid md:grid-cols-4 gap-6">
      {items.map((item, i) => (
        <div
          key={item.title}
          className="bg-white/90 rounded-2xl border border-muted shadow-md p-6 flex flex-col items-center justify-start text-center hover:shadow-xl transition"
        >
          {item.icon}
          <div className="font-semibold text-lg mb-1">{item.title}</div>
          <div className="text-muted-foreground text-base">{item.desc}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Advantages;
