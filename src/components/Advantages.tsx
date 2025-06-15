import React from "react";
import { Zap, TrendingUp, MessageSquare, Users, Clock, Shield } from "lucide-react";

const advantages = [{
  icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-brand-orange" />,
  title: "Автоматизация 24/7",
  desc: "Работает без перерывов",
  benefit: "Никогда не упустите клиента"
}, {
  icon: <Users className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-brand-purple" />,
  title: "Снижение затрат",
  desc: "Один ИИ заменяет 3-5 операторов",
  benefit: "Экономия до 70%"
}, {
  icon: <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-brand-orange" />,
  title: "Интеграция в мессенджеры",
  desc: "Telegram, WhatsApp, Instagram",
  benefit: "Без установки приложений"
}, {
  icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-brand-purple" />,
  title: "Машинное обучение",
  desc: "Становится эффективнее каждый день",
  benefit: "Постоянное улучшение"
}, {
  icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-brand-orange" />,
  title: "Мгновенная реакция",
  desc: "Отвечает за секунды",
  benefit: "Клиенты не ждут"
}, {
  icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-brand-purple" />,
  title: "Защита данных",
  desc: "Полное соответствие безопасности",
  benefit: "Данные в безопасности"
}];

const Advantages: React.FC = () => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 animate-section-entrance">
    <div className="text-center mb-6 sm:mb-8 md:mb-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
        Почему ИИ-ассистенты эффективнее людей
      </h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
      {advantages.map((item, i) => (
        <div 
          key={i} 
          className={`bg-white/80 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 shadow-xl border border-white/40 hover:bg-white/95 transition-all backdrop-blur-sm text-center hover-lift will-animate animate-card-wave stagger-${i + 1}`}
        >
          <div className="mb-3 sm:mb-4 md:mb-6 flex justify-center will-animate animate-icon-bounce stagger-1">
            {item.icon}
          </div>
          <h3 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl mb-2 sm:mb-3 md:mb-4 text-brand-darkBlue animate-title-wave stagger-2 will-animate">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-3 sm:mb-4 md:mb-6 animate-description-fade-up stagger-3 will-animate">
            {item.desc}
          </p>
          <div className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-brand-orange bg-brand-orange/10 px-3 sm:px-4 md:px-6 py-2 sm:py-2 md:py-3 rounded-full animate-text-reveal stagger-4 will-animate">
            {item.benefit}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Advantages;