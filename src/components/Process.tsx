import React from "react";
import { Search, Settings, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-6 h-6 sm:w-8 sm:h-8 text-brand-purple" />,
    title: "Анализ бизнеса",
    desc: "Изучаем ваши процессы",
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
    desc: "Подключаем к системам",
    duration: "1 день"
  },
  {
    icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-brand-orange" />,
    title: "Оптимизация",
    desc: "Анализируем результаты",
    duration: "Постоянно"
  }
];

const Process: React.FC = () => (
  <div className="w-full max-w-5xl mx-auto px-4">
    <div className="text-center mb-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-brand-darkBlue">
        Как мы внедряем ИИ в ваш бизнес
      </h2>
      <p className="text-sm sm:text-base text-gray-600">
        Простой процесс от анализа до результата
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {steps.map((step, i) => (
        <div key={i} className="relative">
          {i < steps.length - 1 && (
            <div className="hidden lg:block absolute top-8 left-full w-full h-1 bg-gradient-to-r from-brand-orange/30 to-transparent" />
          )}
          <div className="bg-white/80 rounded-xl p-4 text-center hover:bg-white/95 transition-all shadow-xl border border-white/40 backdrop-blur-sm h-full flex flex-col justify-between hover-lift">
            <div>
              <div className="mb-3 flex justify-center">
                {step.icon}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-brand-orange mb-2">
                Шаг {i + 1}
              </div>
              <h3 className="font-bold text-sm sm:text-base md:text-lg mb-2 text-brand-darkBlue">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3">
                {step.desc}
              </p>
            </div>
            <div className="text-xs sm:text-sm bg-brand-purple/10 text-brand-purple px-3 py-2 rounded-full mt-auto">
              {step.duration}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Process;