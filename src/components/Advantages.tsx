
import React from "react";
import { Zap, TrendingUp, MessageSquare, Users, Clock, Shield } from "lucide-react";

const advantages = [
  {
    icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-aurora5" />,
    title: "Автоматизация 24/7",
    desc: "Работает без перерывов, отпусков и больничных.",
    benefit: "Никогда не упустите клиента"
  },
  {
    icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 text-aurora2" />,
    title: "Снижение затрат",
    desc: "Один ИИ заменяет 3-5 операторов.",
    benefit: "Экономия до 70%"
  },
  {
    icon: <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-aurora3" />,
    title: "Интеграция в мессенджеры",
    desc: "Telegram, WhatsApp, Instagram Direct.",
    benefit: "Без установки приложений"
  },
  {
    icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-aurora4" />,
    title: "Машинное обучение",
    desc: "Становится эффективнее с каждым днём.",
    benefit: "Постоянное улучшение"
  },
  {
    icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-aurora5" />,
    title: "Мгновенная реакция",
    desc: "Отвечает за секунды одновременно.",
    benefit: "Клиенты не ждут"
  },
  {
    icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-aurora2" />,
    title: "Защита данных",
    desc: "Полное соответствие требованиям безопасности.",
    benefit: "Данные в безопасности"
  }
];

const Advantages: React.FC = () => (
  <section className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 h-full flex flex-col justify-center">
    <div className="text-center mb-4 sm:mb-6">
      <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 text-primary leading-tight">
        Почему ИИ-ассистенты эффективнее людей
      </h2>
      <p className="text-xs sm:text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Мы освобождаем людей от рутины для творческих задач.
      </p>
    </div>
    
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 flex-1">
      {advantages.map((item, i) => (
        <div
          key={i}
          className="bg-white/90 rounded-lg p-2 sm:p-3 shadow-lg border border-muted hover:shadow-xl transition-all group h-full flex flex-col"
        >
          <div className="group-hover:scale-110 transition-transform mb-2">
            {item.icon}
          </div>
          <h3 className="font-bold text-xs sm:text-sm lg:text-base mb-1 sm:mb-2 text-primary line-clamp-2">
            {item.title}
          </h3>
          <p className="text-xs text-muted-foreground mb-2 leading-relaxed line-clamp-2 flex-1">
            {item.desc}
          </p>
          <div className="text-xs font-semibold text-aurora4 bg-aurora4/10 px-2 py-1 rounded-full text-center mt-auto">
            {item.benefit}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Advantages;
