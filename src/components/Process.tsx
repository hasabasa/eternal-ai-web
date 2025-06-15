
import React from "react";
import { Search, Settings, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-6 h-6 sm:w-8 sm:h-8 text-brand-purple" />,
    title: "Анализ бизнеса",
    desc: "Изучаем ваши процессы и задачи",
    duration: "1-2 дня"
  },
  {
    icon: <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-brand-orange" />,
    title: "Настройка ИИ",
    desc: "Создаём ассистента под потребности",
    duration: "3-5 дней"
  },
  {
    icon: <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-brand-purple" />,
    title: "Запуск",
    desc: "Подключаем к системам и запускаем",
    duration: "1 день"
  },
  {
    icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-brand-orange" />,
    title: "Оптимизация",
    desc: "Анализируем и улучшаем результаты",
    duration: "Постоянно"
  }
];

const Process: React.FC = () => (
  <div className="max-w-6xl mx-auto px-4 animate-fade-in">
    <div className="text-center mb-8 md:mb-16">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-brand-darkBlue">
        Как мы внедряем ИИ в ваш бизнес
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
        Простой процесс от анализа до результата
      </p>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {steps.map((step, i) => (
        <div key={i} className="relative">
          {/* Соединительная линия только для больших экранов */}
          {i < steps.length - 1 && (
            <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-brand-orange/30 to-transparent transform translate-x-2" />
          )}
          
          <div className="bg-white/70 rounded-3xl p-4 md:p-6 text-center hover:bg-white/90 transition-all shadow-lg border border-white/30 backdrop-blur-sm">
            <div className="mb-3 md:mb-4">
              {step.icon}
            </div>
            <div className="text-sm font-semibold text-brand-orange mb-2">
              Шаг {i + 1}
            </div>
            <h3 className="font-bold text-base md:text-lg mb-2 text-brand-darkBlue">
              {step.title}
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-3">
              {step.desc}
            </p>
            <div className="text-xs md:text-sm bg-brand-purple/10 text-brand-purple px-2 py-1 rounded-full">
              {step.duration}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Process;
