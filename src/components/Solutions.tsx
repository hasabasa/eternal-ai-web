import React from "react";
import { Zap, MessageSquare, Users, CheckCheck } from "lucide-react";

const solutionsData = [{
  icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-brand-orange" />,
  title: "Автоматизация продаж",
  description: "Быстрые ответы на вопросы и приём заказов без участия менеджера."
}, {
  icon: <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-brand-purple" />,
  title: "Поддержка 24/7",
  description: "Ответы клиентам в любое время суток без выходных."
}, {
  icon: <Users className="w-6 h-6 sm:w-8 sm:h-8 text-brand-orange" />,
  title: "Привлечение лидов",
  description: "Сбор заявок и автоматическая запись на консультации."
}, {
  icon: <CheckCheck className="w-6 h-6 sm:w-8 sm:h-8 text-brand-purple" />,
  title: "Персональные предложения",
  description: "Настраиваемые акции и рекомендации для каждого клиента."
}, {
  icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-brand-orange" />,
  title: "Оптимизация маркетинга",
  description: "Автоматические рассылки и напоминания для роста продаж."
}, {
  icon: <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-brand-purple" />,
  title: "Аналитика и отчётность",
  description: "Простая статистика по заявкам и консультациям."
}];

const Solutions = () => {
  return (
    <div className="max-w-6xl mx-auto responsive-padding animate-section-entrance">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="responsive-title font-bold mb-4 sm:mb-6 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
          Наши решения
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {solutionsData.map((solution, index) => (
          <div 
            key={index} 
            className={`bg-white/80 rounded-2xl sm:rounded-3xl border border-white/40 shadow-xl p-4 sm:p-6 hover:bg-white/95 transition-all backdrop-blur-sm hover-lift will-animate animate-card-wave stagger-${index + 1} flex flex-col`}
          >
            <div className="flex items-center justify-center h-12 sm:h-16 mb-3 sm:mb-4 animate-icon-bounce will-animate">
              {solution.icon}
            </div>
            <h3 className="font-bold text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
              {solution.title}
            </h3>
            <p className="responsive-text text-gray-600 mb-4 sm:mb-6 animate-description-fade-up stagger-2 will-animate">
              {solution.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Solutions;