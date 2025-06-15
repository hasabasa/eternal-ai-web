
import React from "react";
import { Zap, TrendingUp, MessageSquare, Users, Clock, Shield } from "lucide-react";

const advantages = [
  {
    icon: <Zap className="w-5 h-5 text-brand-orange" />,
    title: "Автоматизация 24/7",
    desc: "Работает без перерывов и отпусков",
    benefit: "Никогда не упустите клиента"
  },
  {
    icon: <Users className="w-5 h-5 text-brand-purple" />,
    title: "Снижение затрат",
    desc: "Один ИИ заменяет 3-5 операторов",
    benefit: "Экономия до 70%"
  },
  {
    icon: <MessageSquare className="w-5 h-5 text-brand-orange" />,
    title: "Интеграция в мессенджеры",
    desc: "Telegram, WhatsApp, Instagram",
    benefit: "Без установки приложений"
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-brand-purple" />,
    title: "Машинное обучение",
    desc: "Становится эффективнее каждый день",
    benefit: "Постоянное улучшение"
  },
  {
    icon: <Clock className="w-5 h-5 text-brand-orange" />,
    title: "Мгновенная реакция",
    desc: "Отвечает за секунды одновременно",
    benefit: "Клиенты не ждут"
  },
  {
    icon: <Shield className="w-5 h-5 text-brand-purple" />,
    title: "Защита данных",
    desc: "Полное соответствие безопасности",
    benefit: "Данные в безопасности"
  }
];

const Advantages: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 animate-fade-in">
    <div className="text-center mb-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-brand-darkBlue">
        Почему ИИ-ассистенты эффективнее людей
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Мы освобождаем людей от рутины для творческих задач.
      </p>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {advantages.map((item, i) => (
        <div
          key={i}
          className="bg-white/70 rounded-2xl p-3 shadow-lg border border-white/30 hover:bg-white/90 transition-all backdrop-blur-sm text-center"
        >
          <div className="mb-2">
            {item.icon}
          </div>
          <h3 className="font-bold text-sm mb-1 text-brand-darkBlue">
            {item.title}
          </h3>
          <p className="text-xs text-gray-600 mb-2">
            {item.desc}
          </p>
          <div className="text-xs font-semibold text-brand-orange bg-brand-orange/10 px-2 py-1 rounded-full">
            {item.benefit}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Advantages;
