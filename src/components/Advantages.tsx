import React from "react";
import { Zap, TrendingUp, MessageSquare, Users, Clock, Shield } from "lucide-react";

const advantages = [{
  icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-brand-orange" />,
  title: "Автоматизация 24/7",
  desc: "Работает без перерывов",
  benefit: "Никогда не упустите клиента"
}, {
  icon: <Users className="w-6 h-6 sm:w-8 sm:h-8 text-brand-purple" />,
  title: "Снижение затрат",
  desc: "Один ИИ заменяет 3-5 операторов",
  benefit: "Экономия до 70%"
}, {
  icon: <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-brand-orange" />,
  title: "Интеграция в мессенджеры",
  desc: "Telegram, WhatsApp, Instagram",
  benefit: "Без установки приложений"
}, {
  icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-brand-purple" />,
  title: "Машинное обучение",
  desc: "Становится эффективнее каждый день",
  benefit: "Постоянное улучшение"
}, {
  icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-brand-orange" />,
  title: "Мгновенная реакция",
  desc: "Отвечает за секунды",
  benefit: "Клиенты не ждут"
}, {
  icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-brand-purple" />,
  title: "Защита данных",
  desc: "Полное соответствие безопасности",
  benefit: "Данные в безопасности"
}];

const Advantages: React.FC = () => (
  <div className="w-full max-w-5xl mx-auto px-4">
    <div className="text-center mb-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-brand-darkBlue">
        Почему ИИ-ассистенты эффективнее людей
      </h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {advantages.map((item, i) => (
        <div 
          key={i} 
          className="bg-white/80 rounded-xl p-4 shadow-xl border border-white/40 hover:bg-white/95 transition-all backdrop-blur-sm text-center hover-lift"
        >
          <div className="mb-3 flex justify-center">
            {item.icon}
          </div>
          <h3 className="font-bold text-sm sm:text-base md:text-lg mb-2 text-brand-darkBlue">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-3">
            {item.desc}
          </p>
          <div className="text-xs sm:text-sm font-semibold text-brand-orange bg-brand-orange/10 px-3 py-2 rounded-full">
            {item.benefit}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Advantages;