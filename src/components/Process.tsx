
import React from "react";
import { Search, Settings, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-4 h-4 text-aurora5" />,
    title: "Анализ бизнеса",
    desc: "Изучаем ваши процессы и задачи",
    duration: "1-2 дня"
  },
  {
    icon: <Settings className="w-4 h-4 text-aurora2" />,
    title: "Настройка ИИ",
    desc: "Создаём ассистента под потребности",
    duration: "3-5 дней"
  },
  {
    icon: <Rocket className="w-4 h-4 text-aurora3" />,
    title: "Запуск",
    desc: "Подключаем к системам и запускаем",
    duration: "1 день"
  },
  {
    icon: <TrendingUp className="w-4 h-4 text-aurora4" />,
    title: "Оптимизация",
    desc: "Анализируем и улучшаем результаты",
    duration: "Постоянно"
  }
];

const Process: React.FC = () => (
  <section className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-4 h-full flex flex-col justify-center bg-gradient-to-br from-white/40 to-white/20 rounded-lg mx-2">
    <div className="text-center mb-2 sm:mb-4">
      <h2 className="text-base sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 text-primary leading-tight">
        Как мы внедряем ИИ в ваш бизнес
      </h2>
      <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Простой процесс от анализа до результата
      </p>
    </div>
    
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
      {steps.map((step, i) => (
        <div key={i} className="relative h-full">
          {/* Соединительная линия только для больших экранов */}
          {i < steps.length - 1 && (
            <div className="hidden sm:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-aurora5/30 to-transparent transform translate-x-1 -translate-y-1/2" />
          )}
          
          <div className="bg-white/80 rounded-lg p-2 text-center hover:bg-white/90 transition-all shadow-lg h-full flex flex-col">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-1 shadow-md">
              {step.icon}
            </div>
            <div className="text-xs font-semibold text-aurora4 mb-1">
              Шаг {i + 1}
            </div>
            <h3 className="font-bold text-xs mb-1 text-primary line-clamp-2">
              {step.title}
            </h3>
            <p className="text-xs text-muted-foreground mb-1 leading-relaxed line-clamp-2 flex-1">
              {step.desc}
            </p>
            <div className="text-xs bg-aurora5/10 text-aurora5 px-1.5 py-0.5 rounded-full mt-auto">
              {step.duration}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Process;
