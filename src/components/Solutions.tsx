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
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-brand-darkBlue">
          Наши решения
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {solutionsData.map((solution, index) => (
          <div 
            key={index} 
            className="bg-white/80 rounded-xl border border-white/40 shadow-xl p-4 hover:bg-white/95 transition-all backdrop-blur-sm hover-lift flex flex-col"
          >
            <div className="flex items-center justify-center h-12 mb-3">
              {solution.icon}
            </div>
            <h3 className="font-bold text-sm sm:text-base md:text-lg mb-2 text-brand-darkBlue text-center">
              {solution.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 text-center">
              {solution.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Solutions;