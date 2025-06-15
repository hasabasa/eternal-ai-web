
import React from "react";
import { Search, Settings, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-4 h-4 sm:w-5 sm:h-5 text-aurora5" />,
    title: "Анализ бизнеса",
    desc: "Изучаем ваши процессы и задачи",
    duration: "1-2 дня"
  },
  {
    icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-aurora2" />,
    title: "Настройка ИИ",
    desc: "Создаём ассистента под потребности",
    duration: "3-5 дней"
  },
  {
    icon: <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-aurora3" />,
    title: "Запуск",
    desc: "Подключаем к системам и запускаем",
    duration: "1 день"
  },
  {
    icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-aurora4" />,
    title: "Оптимизация",
    desc: "Анализируем и улучшаем результаты",
    duration: "Постоянно"
  }
];

const Process: React.FC = () => (
  <section className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 h-full flex flex-col justify-center bg-gradient-to-br from-white/40 to-white/20 rounded-lg sm:rounded-2xl mx-2">
    <div className="text-center mb-4 sm:mb-6">
      <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 text-primary leading-tight">
        Как мы внедряем ИИ в ваш бизнес
      </h2>
      <p className="text-xs sm:text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Простой процесс от анализа до результата
      </p>
    </div>
    
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 flex-1">
      {steps.map((step, i) => (
        <div key={i} className="relative h-full">
          {/* Соединительная линия только для больших экранов */}
          {i < steps.length - 1 && (
            <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-aurora5/30 to-transparent transform translate-x-2 -translate-y-1/2" />
          )}
          
          <div className="bg-white/80 rounded-lg p-2 sm:p-3 text-center hover:bg-white/90 transition-all shadow-lg h-full flex flex-col">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
              {step.icon}
            </div>
            <div className="text-xs font-semibold text-aurora4 mb-1">
              Шаг {i + 1}
            </div>
            <h3 className="font-bold text-xs sm:text-sm mb-1 sm:mb-2 text-primary line-clamp-2">
              {step.title}
            </h3>
            <p className="text-xs text-muted-foreground mb-2 leading-relaxed line-clamp-2 flex-1">
              {step.desc}
            </p>
            <div className="text-xs bg-aurora5/10 text-aurora5 px-2 py-1 rounded-full mt-auto">
              {step.duration}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Process;
