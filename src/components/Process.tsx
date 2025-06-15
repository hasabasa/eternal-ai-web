
import React from "react";
import { Search, Settings, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-5 h-5 text-brand-purple" />,
    title: "Анализ бизнеса",
    desc: "Изучаем ваши процессы",
    duration: "1-2 дня"
  },
  {
    icon: <Settings className="w-5 h-5 text-brand-orange" />,
    title: "Настройка ИИ",
    desc: "Создаём ассистента под потребности",
    duration: "3-5 дней"
  },
  {
    icon: <Rocket className="w-5 h-5 text-brand-purple" />,
    title: "Запуск",
    desc: "Подключаем к системам",
    duration: "1 день"
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-brand-orange" />,
    title: "Оптимизация",
    desc: "Анализируем результаты",
    duration: "Постоянно"
  }
];

const Process: React.FC = () => (
  <div className="max-w-5xl mx-auto px-8 sm:px-12 animate-fade-in">
    <div className="text-center mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-brand-darkBlue">
        Как мы внедряем ИИ в ваш бизнес
      </h2>
      <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
        Простой процесс от анализа до результата
      </p>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {steps.map((step, i) => (
        <div key={i} className="relative">
          {/* Соединительная линия только для больших экранов */}
          {i < steps.length - 1 && (
            <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-brand-orange/30 to-transparent transform translate-x-1" />
          )}
          
          <div className="bg-white/80 rounded-xl p-4 text-center hover:bg-white/95 transition-all shadow-lg border border-white/40 backdrop-blur-sm">
            <div className="mb-3 flex justify-center">
              {step.icon}
            </div>
            <div className="text-xs font-semibold text-brand-orange mb-2">
              Шаг {i + 1}
            </div>
            <h3 className="font-bold text-sm mb-2 text-brand-darkBlue">
              {step.title}
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              {step.desc}
            </p>
            <div className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-1 rounded-full">
              {step.duration}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Process;
