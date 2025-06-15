
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
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const scrollToSlide = (slideIndex: number) => {
    const slideElement = document.getElementById(`slide-${slideIndex}`);
    if (slideElement) {
      slideElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToSlide(currentSlide);
  }, [currentSlide]);

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
  }, [currentSlide]);

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden snap-y snap-mandatory">
      <AuroraBackground />
      <BurgerMenu />

      {/* Навигационные стрелки */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50">
        <Button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 disabled:opacity-30"
        >
          <ChevronLeft className="w-6 h-6 text-brand-darkBlue" />
        </Button>
      </div>

      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        <Button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 disabled:opacity-30"
        >
          <ChevronRight className="w-6 h-6 text-brand-darkBlue" />
        </Button>
      </div>

      {/* Индикатор слайдов */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex space-x-3">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-brand-orange scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Слайд 1: Главная секция */}
      <section id="slide-0" className="relative min-h-screen flex items-center justify-center px-4 snap-start animate-presentation-entrance">
        <div className="max-w-4xl mx-auto text-center">
          {/* Логотип */}
          <div className="font-extrabold text-[48px] sm:text-[64px] text-brand-darkBlue tracking-tight mb-8 select-none drop-shadow leading-none">
            Вечный ИИ
          </div>
          
          {/* Тэглайн */}
          <div className="text-base sm:text-lg bg-gradient-to-r from-brand-orange to-brand-purple text-white px-6 py-3 rounded-full font-medium mb-8">
            🚀 Революция в автоматизации бизнеса
          </div>

          {/* Заголовок */}
          <h1 className="text-[2.5rem] sm:text-[3.5rem] font-bold text-brand-darkBlue text-center leading-tight mb-6">
            Рост эффективности бизнеса —<br className="hidden sm:block"/> без затрат на сотрудников
          </h1>
          
          <h2 className="text-[2rem] sm:text-[2.8rem] font-bold text-brand-orange mb-8">
            ИИ, который работает за людей
          </h2>
          
          {/* Описание */}
          <p className="text-xl sm:text-2xl text-gray-600 text-center max-w-4xl mx-auto leading-relaxed mb-12">
            Вечный ИИ — это цифровая экосистема интеллектуальных помощников, созданных под задачи реального бизнеса.<br />
            Мы внедряем ИИ в мессенджеры (Telegram, WhatsApp, Instagram, Threads), автоматизируем общение, продажи, бронирования, рассылки.<br />
            <span className="font-semibold text-brand-darkBlue">Наши решения масштабируемы, настраиваются без кода и адаптируются под любой бизнес — от общепита до промышленности.</span>
          </p>
        </div>
      </section>

      {/* Слайд 2: Статистика */}
      <section id="slide-1" className="min-h-screen flex items-center justify-center snap-start bg-gradient-to-br from-brand-purple/5 to-brand-orange/5">
        <Statistics />
      </section>

      {/* Слайд 3: Решения */}
      <section id="slide-2" className="min-h-screen flex items-center justify-center snap-start bg-gradient-to-br from-brand-orange/5 to-brand-darkBlue/5">
        <Solutions />
      </section>

      {/* Слайд 4: Преимущества */}
      <section id="slide-3" className="min-h-screen flex items-center justify-center snap-start bg-gradient-to-br from-brand-darkBlue/5 to-brand-purple/5">
        <Advantages />
      </section>

      {/* Слайд 5: Процесс работы */}
      <section id="slide-4" className="min-h-screen flex items-center justify-center snap-start bg-gradient-to-br from-brand-purple/5 to-brand-orange/5">
        <Process />
      </section>

      {/* Слайд 6: Кейсы */}
      <section id="slide-5" className="min-h-screen flex items-center justify-center snap-start bg-gradient-to-br from-brand-orange/5 to-brand-darkBlue/5">
        <Cases />
      </section>

      {/* Слайд 7: Финальный слайд с кнопкой расчёта */}
      <section id="slide-6" className="min-h-screen flex items-center justify-center snap-start bg-gradient-to-br from-brand-darkBlue/5 to-brand-purple/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-white/90 to-white/70 rounded-3xl p-12 md:p-16 shadow-xl border border-gray-200">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-brand-darkBlue">
              Будущее автоматизации — уже здесь
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Вечный ИИ трансформирует ваш бизнес, освобождая время для стратегических задач и обеспечивая стабильный рост без дополнительных затрат на персонал.
            </p>
            
            {/* Кнопка расчёта */}
            <Link to="/client-calc">
              <Button 
                size="lg" 
                className="bg-brand-orange hover:bg-brand-orange/90 text-white text-xl px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all mb-8"
              >
                <Calculator className="w-6 h-6 mr-3" />
                Сделать расчёт
              </Button>
            </Link>
            
            <div className="text-lg text-gray-500 opacity-80">
              © 2025 Вечный ИИ. Будущее автоматизации уже здесь.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
