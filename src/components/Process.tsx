
import React from "react";
import { Search, Settings, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-16 h-16 text-brand-purple" />,
    title: "Анализ бизнеса",
    desc: "Изучаем ваши процессы",
    duration: "1-2 дня"
  },
  {
    icon: <Settings className="w-16 h-16 text-brand-orange" />,
    title: "Настройка ИИ",
    desc: "Создаём ассистента под потребности",
    duration: "3-5 дней"
  },
  {
    icon: <Rocket className="w-16 h-16 text-brand-purple" />,
    title: "Запуск",
    desc: "Подключаем к системам",
    duration: "1 день"
  },
  {
    icon: <TrendingUp className="w-16 h-16 text-brand-orange" />,
    title: "Оптимизация",
    desc: "Анализируем результаты",
    duration: "Постоянно"
  }
];

const Process: React.FC = () => (
  <div className="max-w-7xl mx-auto px-8 animate-fade-in">
    <div className="text-center mb-20">
      <h2 className="text-6xl lg:text-7xl font-bold mb-12 text-brand-darkBlue">
        Как мы внедряем ИИ в ваш бизнес
      </h2>
      <p className="text-3xl lg:text-4xl text-gray-600 max-w-5xl mx-auto">
        Простой процесс от анализа до результата
      </p>
    </div>
    
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
      {steps.map((step, i) => (
        <div key={i} className="relative">
          {/* Соединительная линия только для больших экранов */}
          {i < steps.length - 1 && (
            <div className="hidden lg:block absolute top-20 left-full w-full h-2 bg-gradient-to-r from-brand-orange/30 to-transparent transform translate-x-4" />
          )}
          
          <div className="bg-white/80 rounded-3xl p-12 text-center hover:bg-white/95 transition-all shadow-xl border border-white/40 backdrop-blur-sm">
            <div className="mb-8 flex justify-center">
              {step.icon}
            </div>
            <div className="text-xl font-semibold text-brand-orange mb-6">
              Шаг {i + 1}
            </div>
            <h3 className="font-bold text-3xl lg:text-4xl mb-6 text-brand-darkBlue">
              {step.title}
            </h3>
            <p className="text-2xl lg:text-3xl text-gray-600 mb-8">
              {step.desc}
            </p>
            <div className="text-xl lg:text-2xl bg-brand-purple/10 text-brand-purple px-6 py-4 rounded-full">
              {step.duration}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Process;
