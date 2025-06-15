import React from "react";
import { Zap, TrendingUp, MessageSquare, Users, Clock, Shield } from "lucide-react";

const advantages = [{
  icon: <Zap className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-orange" />,
  title: "Автоматизация 24/7",
  desc: "Работает без перерывов",
  benefit: "Никогда не упустите клиента"
}, {
  icon: <Users className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-purple" />,
  title: "Снижение затрат",
  desc: "Один ИИ заменяет 3-5 операторов",
  benefit: "Экономия до 70%"
}, {
  icon: <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-orange" />,
  title: "Интеграция в мессенджеры",
  desc: "Telegram, WhatsApp, Instagram",
  benefit: "Без установки приложений"
}, {
  icon: <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-purple" />,
  title: "Машинное обучение",
  desc: "Становится эффективнее каждый день",
  benefit: "Постоянное улучшение"
}, {
  icon: <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-orange" />,
  title: "Мгновенная реакция",
  desc: "Отвечает за секунды",
  benefit: "Клиенты не ждут"
}, {
  icon: <Shield className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-purple" />,
  title: "Защита данных",
  desc: "Полное соответствие безопасности",
  benefit: "Данные в безопасности"
}];

const Advantages: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 md:p-6 animate-section-entrance">
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-3 sm:mb-4 md:mb-6">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-1 sm:mb-2 md:mb-3 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
          Почему ИИ-ассистенты эффективнее людей
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        {advantages.map((item, i) => (
          <div 
            key={i} 
            className={`bg-white/80 rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 shadow-xl border border-white/40 hover:bg-white/95 transition-all backdrop-blur-sm text-center hover-lift will-animate animate-card-wave stagger-${i + 1}`}
          >
            <div className="mb-2 sm:mb-3 md:mb-4 flex justify-center will-animate animate-icon-bounce stagger-1">
              {item.icon}
            </div>
            <h3 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-1 sm:mb-2 md:mb-3 text-brand-darkBlue animate-title-wave stagger-2 will-animate">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-3 md:mb-4 animate-description-fade-up stagger-3 will-animate">
              {item.desc}
            </p>
            <div className="text-xs sm:text-sm md:text-base font-semibold text-brand-orange bg-brand-orange/10 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full animate-text-reveal stagger-4 will-animate">
              {item.benefit}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Advantages;