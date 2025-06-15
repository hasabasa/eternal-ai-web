
import React from "react";
import { Search, Settings, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-aurora5" />,
    title: "Анализ бизнеса",
    desc: "Изучаем ваши процессы, целевую аудиторию и задачи",
    duration: "1-2 дня"
  },
  {
    icon: <Settings className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-aurora2" />,
    title: "Настройка ИИ",
    desc: "Создаём и обучаем ассистента под ваши потребности",
    duration: "3-5 дней"
  },
  {
    icon: <Rocket className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-aurora3" />,
    title: "Запуск и интеграция",
    desc: "Подключаем к вашим системам и запускаем в работу",
    duration: "1 день"
  },
  {
    icon: <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-aurora4" />,
    title: "Оптимизация",
    desc: "Анализируем результаты и улучшаем эффективность",
    duration: "Постоянно"
  }
];

const Process: React.FC = () => (
  <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 animate-fade-in bg-gradient-to-br from-white/40 to-white/20 rounded-2xl sm:rounded-3xl mx-4">
    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-primary leading-tight">
        Как мы внедряем ИИ в ваш бизнес
      </h2>
      <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Простой и прозрачный процесс от анализа до результата
      </p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {steps.map((step, i) => (
        <div key={i} className="relative">
          {/* Соединительная линия */}
          {i < steps.length - 1 && (
            <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-aurora5/30 to-transparent transform translate-x-4 -translate-y-1/2" />
          )}
          
          <div className="bg-white/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:bg-white/90 transition-all shadow-lg">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-md">
              {step.icon}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-aurora4 mb-1 sm:mb-2">
              Шаг {i + 1}
            </div>
            <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-2 sm:mb-3 text-primary">
              {step.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 leading-relaxed">
              {step.desc}
            </p>
            <div className="text-xs bg-aurora5/10 text-aurora5 px-2 sm:px-3 py-1 rounded-full inline-block">
              {step.duration}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Process;
