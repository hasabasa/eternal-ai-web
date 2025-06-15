
import React from "react";
import { Zap, TrendingUp, MessageSquare, Users, Clock, Shield } from "lucide-react";

const advantages = [
  {
    icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-brand-orange" />,
    title: "Автоматизация 24/7",
    desc: "Работает без перерывов и отпусков",
    benefit: "Никогда не упустите клиента"
  },
  {
    icon: <Users className="w-6 h-6 sm:w-8 sm:h-8 text-brand-purple" />,
    title: "Снижение затрат",
    desc: "Один ИИ заменяет 3-5 операторов",
    benefit: "Экономия до 70%"
  },
  {
    icon: <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-brand-orange" />,
    title: "Интеграция в мессенджеры",
    desc: "Telegram, WhatsApp, Instagram",
    benefit: "Без установки приложений"
  },
  {
    icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-brand-purple" />,
    title: "Машинное обучение",
    desc: "Становится эффективнее каждый день",
    benefit: "Постоянное улучшение"
  },
  {
    icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-brand-orange" />,
    title: "Мгновенная реакция",
    desc: "Отвечает за секунды одновременно",
    benefit: "Клиенты не ждут"
  },
  {
    icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-brand-purple" />,
    title: "Защита данных",
    desc: "Полное соответствие безопасности",
    benefit: "Данные в безопасности"
  }
];

const Advantages: React.FC = () => (
  <div className="max-w-6xl mx-auto px-4 animate-fade-in">
    <div className="text-center mb-8 md:mb-16">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-brand-darkBlue">
        Почему ИИ-ассистенты эффективнее людей
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
        Мы освобождаем людей от рутины для творческих задач.
      </p>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {advantages.map((item, i) => (
        <div
          key={i}
          className="bg-white/70 rounded-3xl p-4 md:p-6 shadow-lg border border-white/30 hover:bg-white/90 transition-all backdrop-blur-sm text-center"
        >
          <div className="mb-3 md:mb-4">
            {item.icon}
          </div>
          <h3 className="font-bold text-base md:text-lg mb-2 text-brand-darkBlue">
            {item.title}
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-3">
            {item.desc}
          </p>
          <div className="text-xs md:text-sm font-semibold text-brand-orange bg-brand-orange/10 px-2 py-1 rounded-full">
            {item.benefit}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Advantages;
