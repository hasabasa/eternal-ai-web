
import React from "react";
import { Zap, TrendingUp, MessageSquare, Users, Clock, Shield } from "lucide-react";

const advantages = [
  {
    icon: <Zap className="w-12 h-12 text-brand-orange" />,
    title: "Автоматизация 24/7",
    desc: "Работает без перерывов",
    benefit: "Никогда не упустите клиента"
  },
  {
    icon: <Users className="w-12 h-12 text-brand-purple" />,
    title: "Снижение затрат",
    desc: "Один ИИ заменяет 3-5 операторов",
    benefit: "Экономия до 70%"
  },
  {
    icon: <MessageSquare className="w-12 h-12 text-brand-orange" />,
    title: "Интеграция в мессенджеры",
    desc: "Telegram, WhatsApp, Instagram",
    benefit: "Без установки приложений"
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-brand-purple" />,
    title: "Машинное обучение",
    desc: "Становится эффективнее каждый день",
    benefit: "Постоянное улучшение"
  },
  {
    icon: <Clock className="w-12 h-12 text-brand-orange" />,
    title: "Мгновенная реакция",
    desc: "Отвечает за секунды",
    benefit: "Клиенты не ждут"
  },
  {
    icon: <Shield className="w-12 h-12 text-brand-purple" />,
    title: "Защита данных",
    desc: "Полное соответствие безопасности",
    benefit: "Данные в безопасности"
  }
];

const Advantages: React.FC = () => (
  <div className="max-w-6xl mx-auto px-8 animate-slide-transition">
    <div className="text-center mb-12 animate-description-fade-up">
      <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-brand-darkBlue">
        Почему ИИ-ассистенты эффективнее людей
      </h2>
      <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto">
        Мы освобождаем людей от рутины для творческих задач.
      </p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {advantages.map((item, i) => (
        <div
          key={i}
          className={`bg-white/80 rounded-3xl p-6 shadow-xl border border-white/40 hover:bg-white/95 transition-all backdrop-blur-sm text-center hover-lift will-animate animate-card-wave stagger-${i + 1}`}
        >
          <div className="mb-6 flex justify-center will-animate">
            {item.icon}
          </div>
          <h3 className="font-bold text-xl lg:text-2xl mb-4 text-brand-darkBlue">
            {item.title}
          </h3>
          <p className="text-base lg:text-lg text-gray-600 mb-6">
            {item.desc}
          </p>
          <div className="text-base lg:text-lg font-semibold text-brand-orange bg-brand-orange/10 px-6 py-3 rounded-full">
            {item.benefit}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Advantages;
