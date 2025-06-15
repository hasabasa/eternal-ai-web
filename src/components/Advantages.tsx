import React from "react";
import { Zap, TrendingUp, MessageSquare, Users, Clock, Shield } from "lucide-react";

const advantages = [{
  icon: <Zap className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-brand-orange" />,
  title: "Автоматизация 24/7",
  desc: "Работает без перерывов",
  benefit: "Никогда не упустите клиента"
}, {
  icon: <Users className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-brand-purple" />,
  title: "Снижение затрат",
  desc: "Один ИИ заменяет 3-5 операторов",
  benefit: "Экономия до 70%"
}, {
  icon: <MessageSquare className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-brand-orange" />,
  title: "Интеграция в мессенджеры",
  desc: "Telegram, WhatsApp, Instagram",
  benefit: "Без установки приложений"
}, {
  icon: <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-brand-purple" />,
  title: "Машинное обучение",
  desc: "Становится эффективнее каждый день",
  benefit: "Постоянное улучшение"
}, {
  icon: <Clock className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-brand-orange" />,
  title: "Мгновенная реакция",
  desc: "Отвечает за секунды",
  benefit: "Клиенты не ждут"
}, {
  icon: <Shield className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-brand-purple" />,
  title: "Защита данных",
  desc: "Полное соответствие безопасности",
  benefit: "Данные в безопасности"
}];

const Advantages: React.FC = () => (
  <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-16 py-4 sm:py-6 md:py-8 animate-section-entrance">
    <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
        Почему ИИ-ассистенты эффективнее людей
      </h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
      {advantages.map((item, i) => (
        <div 
          key={i} 
          className={`bg-white/80 rounded-xl sm:rounded-2xl md:rounded-3xl p-2 sm:p-3 md:p-4 lg:p-6 shadow-xl border border-white/40 hover:bg-white/95 transition-all backdrop-blur-sm text-center hover-lift will-animate animate-card-wave stagger-${i + 1}`}
        >
          <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-6 flex justify-center will-animate animate-icon-bounce stagger-1">
            {item.icon}
          </div>
          <h3 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-1 sm:mb-2 md:mb-3 lg:mb-4 text-brand-darkBlue animate-title-wave stagger-2 will-animate">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-2 sm:mb-3 md:mb-4 lg:mb-6 animate-description-fade-up stagger-3 will-animate">
            {item.desc}
          </p>
          <div className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-brand-orange bg-brand-orange/10 px-2 sm:px-3 md:px-4 lg:px-6 py-1 sm:py-2 md:py-3 rounded-full animate-text-reveal stagger-4 will-animate">
            {item.benefit}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Advantages;