
import AuroraBackground from "@/components/AuroraBackground";
import BurgerMenu from "@/components/BurgerMenu";
import Advantages from "@/components/Advantages";
import Cases from "@/components/Cases";
import Solutions from "@/components/Solutions";
import Process from "@/components/Process";
import Statistics from "@/components/Statistics";
import { Button } from "@/components/ui/button";
import { Calculator, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 7;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  // Обработка клавиш
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        nextSlide();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AuroraBackground />
      <BurgerMenu />

      {/* Контейнер слайдов */}
      <div 
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {/* Слайд 1: Главная секция */}
        <div className="w-full h-full flex-shrink-0 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-brand-orange/5">
          <div className="max-w-5xl mx-auto text-center">
            {/* Логотип */}
            <div className="font-extrabold text-3xl sm:text-5xl lg:text-7xl text-brand-darkBlue tracking-tight mb-4 sm:mb-8 select-none drop-shadow-lg leading-none">
              Вечный ИИ
            </div>
            
            {/* Тэглайн */}
            <div className="text-sm sm:text-base lg:text-lg bg-gradient-to-r from-brand-orange to-brand-purple text-white px-4 sm:px-8 py-2 sm:py-4 rounded-full font-medium mb-6 sm:mb-12 inline-block shadow-lg">
              🚀 Революция в автоматизации бизнеса
            </div>

            {/* Заголовок */}
            <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold text-brand-darkBlue text-center leading-tight mb-4 sm:mb-8">
              Рост эффективности бизнеса —<br className="hidden sm:block"/> без затрат на сотрудников
            </h1>
            
            <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold text-brand-orange mb-6 sm:mb-12">
              ИИ, который работает за людей
            </h2>
            
            {/* Описание */}
            <p className="text-sm sm:text-lg lg:text-xl text-gray-600 text-center max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-16">
              Вечный ИИ — это цифровая экосистема интеллектуальных помощников, созданных под задачи реального бизнеса.<br />
              Мы внедряем ИИ в мессенджеры (Telegram, WhatsApp, Instagram, Threads), автоматизируем общение, продажи, бронирования, рассылки.<br />
              <span className="font-semibold text-brand-darkBlue">Наши решения масштабируемы, настраиваются без кода и адаптируются под любой бизнес — от общепита до промышленности.</span>
            </p>

            {/* Кнопка расчёта на главном слайде */}
            <Link to="/client-calc">
              <Button 
                size="lg" 
                className="bg-brand-orange hover:bg-brand-orange/90 text-white text-base sm:text-xl px-6 sm:px-10 py-4 sm:py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <Calculator className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                Сделать расчёт
              </Button>
            </Link>
          </div>
        </div>

        {/* Слайд 2: Статистика */}
        <div className="w-full h-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-brand-purple/5 to-brand-orange/10">
          <Statistics />
        </div>

        {/* Слайд 3: Решения */}
        <div className="w-full h-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-brand-orange/5 to-brand-darkBlue/10">
          <Solutions />
        </div>

        {/* Слайд 4: Преимущества */}
        <div className="w-full h-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-brand-darkBlue/5 to-brand-purple/10">
          <Advantages />
        </div>

        {/* Слайд 5: Процесс работы */}
        <div className="w-full h-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-brand-purple/5 to-brand-orange/10">
          <Process />
        </div>

        {/* Слайд 6: Кейсы */}
        <div className="w-full h-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-brand-orange/5 to-brand-darkBlue/10">
          <Cases />
        </div>

        {/* Слайд 7: Финальный слайд */}
        <div className="w-full h-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-brand-darkBlue/5 to-brand-purple/10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-gradient-to-br from-white/95 to-white/80 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl border border-gray-200">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-brand-darkBlue">
                Будущее автоматизации — уже здесь
              </h2>
              <p className="text-base sm:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
                Вечный ИИ трансформирует ваш бизнес, освобождая время для стратегических задач и обеспечивая стабильный рост без дополнительных затрат на персонал.
              </p>
              
              {/* Кнопка расчёта */}
              <Link to="/client-calc">
                <Button 
                  size="lg" 
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white text-base sm:text-xl px-6 sm:px-10 py-4 sm:py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 mb-6 sm:mb-8"
                >
                  <Calculator className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                  Сделать расчёт
                </Button>
              </Link>
              
              <div className="text-sm sm:text-lg text-gray-500 opacity-80">
                © 2025 Вечный ИИ. Будущее автоматизации уже здесь.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Навигационные стрелки */}
      <div className="fixed left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-[100]">
        <Button
          onClick={prevSlide}
          variant="outline"
          size="icon"
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-sm border-brand-orange/50 hover:bg-brand-orange hover:text-white shadow-lg transition-all"
        >
          <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
        </Button>
      </div>

      <div className="fixed right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-[100]">
        <Button
          onClick={nextSlide}
          variant="outline"
          size="icon"
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-sm border-brand-orange/50 hover:bg-brand-orange hover:text-white shadow-lg transition-all"
        >
          <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
        </Button>
      </div>

      {/* Индикатор слайдов */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-[100] flex space-x-2 sm:space-x-3">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all shadow-lg ${
              index === currentSlide 
                ? 'bg-brand-orange scale-125 shadow-brand-orange/50' 
                : 'bg-white/70 hover:bg-white/90'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
