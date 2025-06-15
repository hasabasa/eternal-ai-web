import React from "react";
import { Zap, MessageSquare, Users, CheckCheck } from "lucide-react";

const solutionsData = [{
  icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-orange" />,
  title: "Автоматизация продаж",
  description: "Быстрые ответы на вопросы и приём заказов без участия менеджера."
}, {
  icon: <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-purple" />,
  title: "Поддержка 24/7",
  description: "Ответы клиентам в любое время суток без выходных."
}, {
  icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-orange" />,
  title: "Привлечение лидов",
  description: "Сбор заявок и автоматическая запись на консультации."
}, {
  icon: <CheckCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-purple" />,
  title: "Персональные предложения",
  description: "Настраиваемые акции и рекомендации для каждого клиента."
}, {
  icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-orange" />,
  title: "Оптимизация маркетинга",
  description: "Автоматические рассылки и напоминания для роста продаж."
}, {
  icon: <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-purple" />,
  title: "Аналитика и отчётность",
  description: "Простая статистика по заявкам и консультациям."
}];

const Solutions = () => {
  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-16 py-4 sm:py-6 md:py-8 animate-section-entrance">
      <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
          Наши решения
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
        {solutionsData.map((solution, index) => (
          <div 
            key={index} 
            className={`bg-white/80 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/40 shadow-xl p-2 sm:p-3 md:p-4 lg:p-6 hover:bg-white/95 transition-all backdrop-blur-sm hover-lift will-animate animate-card-wave stagger-${index + 1} flex flex-col`}
          >
            <div className="flex items-center justify-center h-8 sm:h-10 md:h-12 lg:h-16 mb-2 sm:mb-3 md:mb-4 animate-icon-bounce will-animate">
              {solution.icon}
            </div>
            <h3 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-1 sm:mb-2 md:mb-3 lg:mb-4 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
              {solution.title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-2 sm:mb-3 md:mb-4 lg:mb-6 animate-description-fade-up stagger-2 will-animate">
              {solution.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Solutions;