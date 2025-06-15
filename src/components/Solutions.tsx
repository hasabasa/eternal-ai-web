import React from "react";
import { Zap, MessageSquare, Users, CheckCheck } from "lucide-react";

const solutionsData = [
  {
    icon: <Zap className="w-8 h-8 text-brand-orange" />,
    title: "Автоматизация продаж",
    description: "Автоматизируйте ответы на часто задаваемые вопросы, обработку заказов и консультации, чтобы увеличить конверсию и снизить нагрузку на менеджеров.",
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-brand-purple" />,
    title: "Поддержка клиентов 24/7",
    description: "Обеспечьте круглосуточную поддержку клиентов, отвечая на вопросы, решая проблемы и предоставляя информацию в любое время.",
  },
  {
    icon: <Users className="w-8 h-8 text-brand-orange" />,
    title: "Привлечение лидов",
    description: "Собирайте контактные данные потенциальных клиентов, квалифицируйте лидов и назначайте встречи, чтобы расширить базу клиентов.",
  },
  {
    icon: <CheckCheck className="w-8 h-8 text-brand-purple" />,
    title: "Персонализированные предложения",
    description: "Анализируйте данные о клиентах, чтобы предлагать персонализированные продукты, услуги и акции, повышая лояльность и продажи.",
  },
  {
    icon: <Zap className="w-8 h-8 text-brand-orange" />,
    title: "Оптимизация маркетинга",
    description: "Автоматизируйте email-маркетинг, рассылки в мессенджерах и таргетированную рекламу, чтобы повысить эффективность маркетинговых кампаний.",
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-brand-purple" />,
    title: "Аналитика и отчетность",
    description: "Собирайте данные о взаимодействии с клиентами, анализируйте тренды и создавайте отчеты, чтобы принимать обоснованные решения и улучшать бизнес-процессы.",
  },
];

const Solutions = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-curtain-reveal">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
          Наши решения
        </h2>
        <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto animate-description-fade-up stagger-2 will-animate">
          Идеальные сценарии под ваш бизнес
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {solutionsData.map((solution, index) => (
          <div
            key={index}
            className={`bg-white/80 rounded-3xl border border-white/40 shadow-xl p-6 hover:bg-white/95 transition-all backdrop-blur-sm hover-lift will-animate animate-card-wave stagger-${
              index + 1
            } flex flex-col`}
          >
            <div className="flex items-center justify-center h-16 mb-4">
              {solution.icon}
            </div>
            <h3 className="font-bold text-xl lg:text-2xl mb-4 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
              {solution.title}
            </h3>
            <p className="text-base lg:text-lg text-gray-600 mb-6 animate-description-fade-up stagger-2 will-animate">
              {solution.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Solutions;
