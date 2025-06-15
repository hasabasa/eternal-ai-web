
import React from "react";
import { Search, Settings, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-8 h-8 text-brand-purple" />,
    title: "Анализ бизнеса",
    desc: "Изучаем ваши процессы",
    duration: "1-2 дня"
  },
  {
    icon: <Settings className="w-8 h-8 text-brand-orange" />,
    title: "Настройка ИИ",
    desc: "Создаём ассистента под потребности",
    duration: "3-5 дней"
  },
  {
    icon: <Rocket className="w-8 h-8 text-brand-purple" />,
    title: "Запуск",
    desc: "Подключаем к системам",
    duration: "1 день"
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-brand-orange" />,
    title: "Оптимизация",
    desc: "Анализируем результаты",
    duration: "Постоянно"
  }
];

const Process: React.FC = () => (
  <div className="max-w-6xl mx-auto px-8 sm:px-12 animate-fade-in">
    <div className="text-center mb-10">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-brand-darkBlue">
        Как мы внедряем ИИ в ваш бизнес
      </h2>
      <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto">
        Простой процесс от анализа до результата
      </p>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {steps.map((step, i) => (
        <div key={i} className="relative">
          {/* Соединительная линия только для больших экранов */}
          {i < steps.length - 1 && (
            <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-brand-orange/30 to-transparent transform translate-x-1" />
          )}
          
          <div className="bg-white/80 rounded-xl p-6 text-center hover:bg-white/95 transition-all shadow-lg border border-white/40 backdrop-blur-sm">
            <div className="mb-4 flex justify-center">
              {step.icon}
            </div>
            <div className="text-sm font-semibold text-brand-orange mb-2">
              Шаг {i + 1}
            </div>
            <h3 className="font-bold text-lg lg:text-xl mb-3 text-brand-darkBlue">
              {step.title}
            </h3>
            <p className="text-base lg:text-lg text-gray-600 mb-4">
              {step.desc}
            </p>
            <div className="text-sm lg:text-base bg-brand-purple/10 text-brand-purple px-3 py-2 rounded-full">
              {step.duration}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Process;
