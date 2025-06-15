import React from "react";
import { Zap, MessageSquare, Users, CheckCheck } from "lucide-react";

const solutionsData = [{
  icon: <Zap className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-orange" />,
  title: "Автоматизация продаж",
  description: "Быстрые ответы на вопросы и приём заказов без участия менеджера."
}, {
  icon: <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-purple" />,
  title: "Поддержка 24/7",
  description: "Ответы клиентам в любое время суток без выходных."
}, {
  icon: <Users className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-orange" />,
  title: "Привлечение лидов",
  description: "Сбор заявок и автоматическая запись на консультации."
}, {
  icon: <CheckCheck className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-purple" />,
  title: "Персональные предложения",
  description: "Настраиваемые акции и рекомендации для каждого клиента."
}, {
  icon: <Zap className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-orange" />,
  title: "Оптимизация маркетинга",
  description: "Автоматические рассылки и напоминания для роста продаж."
}, {
  icon: <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-brand-purple" />,
  title: "Аналитика и отчётность",
  description: "Простая статистика по заявкам и консультациям."
}];

const Solutions = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 md:p-6 animate-section-entrance">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-3 sm:mb-4 md:mb-6">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-1 sm:mb-2 md:mb-3 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
            Наши решения
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {solutionsData.map((solution, index) => (
            <div 
              key={index} 
              className={`bg-white/80 rounded-lg sm:rounded-xl md:rounded-2xl border border-white/40 shadow-xl p-2 sm:p-3 md:p-4 hover:bg-white/95 transition-all backdrop-blur-sm hover-lift will-animate animate-card-wave stagger-${index + 1} flex flex-col`}
            >
              <div className="flex items-center justify-center h-6 sm:h-8 md:h-10 lg:h-12 mb-2 sm:mb-3 animate-icon-bounce will-animate">
                {solution.icon}
              </div>
              <h3 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-1 sm:mb-2 md:mb-3 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
                {solution.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-3 animate-description-fade-up stagger-2 will-animate">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solutions;