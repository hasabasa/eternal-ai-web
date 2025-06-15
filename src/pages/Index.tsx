import AuroraBackground from "@/components/AuroraBackground";
import BurgerMenu from "@/components/BurgerMenu";
import Advantages from "@/components/Advantages";
import CaseRetail from "@/components/CaseRetail";
import CaseHoreca from "@/components/CaseHoreca";
import CaseServices from "@/components/CaseServices";
import Solutions from "@/components/Solutions";
import Process from "@/components/Process";
import Statistics from "@/components/Statistics";
import SimpleCarousel from "@/components/SimpleCarousel";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const slides = [
    // Главная секция с театральными анимациями
    <section key="main" className="h-full flex items-center justify-center responsive-padding bg-gradient-to-br from-white to-brand-orange/5 animate-slide-transition">
      <div className="max-w-7xl mx-auto text-center will-animate">
        {/* Логотип с драматичным появлением */}
        <div className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-brand-darkBlue tracking-tight mb-6 sm:mb-8 select-none drop-shadow-lg leading-none animate-logo-entrance will-animate">
          Вечный ИИ
        </div>
        
        {/* Тэглайн с slide-in эффектом */}
        <div className="text-sm sm:text-base lg:text-lg bg-gradient-to-r from-brand-orange to-brand-purple text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full font-medium mb-8 sm:mb-10 lg:mb-12 inline-block shadow-lg animate-tagline-slide will-animate">
          🚀 Революция в автоматизации бизнеса
        </div>

        {/* Заголовки с волновым появлением */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-darkBlue text-center leading-tight mb-6 sm:mb-8 animate-title-wave stagger-1 will-animate">
          Рост эффективности бизнеса —<br className="hidden sm:block" /> без затрат на сотрудников
        </h1>
        
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-brand-orange mb-8 sm:mb-10 lg:mb-12 animate-title-wave stagger-2 will-animate">
          ИИ, который работает за людей
        </h2>
        
        {/* Описание с fade-up эффектом */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 text-center max-w-6xl mx-auto leading-relaxed mb-8 sm:mb-10 lg:mb-12 animate-description-fade-up stagger-3 will-animate">
          Вечный ИИ — это цифровая экосистема интеллектуальных помощников, созданных под задачи реального бизнеса.<br className="hidden md:block" />
          Мы внедряем ИИ в мессенджеры (Telegram, WhatsApp, Instagram), автоматизируем общение, продажи, бронирования, рассылки.<br className="hidden lg:block" />
          <span className="font-semibold text-brand-darkBlue">Наши решения масштабируемы, настраиваются без кода и адаптируются под любой бизнес — от общепита до промышленности.</span>
        </p>
      </div>
    </section>,

    // Статистика
    <section key="statistics" className="h-full flex items-center justify-center py-8 sm:py-12 bg-gradient-to-br from-brand-purple/5 to-brand-orange/10">
      <Statistics />
    </section>,

    // Решения
    <section key="solutions" className="h-full flex items-center justify-center py-8 sm:py-12 bg-gradient-to-br from-brand-orange/5 to-brand-darkBlue/10">
      <Solutions />
    </section>,

    // Преимущества
    <section key="advantages" className="h-full flex items-center justify-center py-8 sm:py-12 bg-gradient-to-br from-brand-darkBlue/5 to-brand-purple/10">
      <Advantages />
    </section>,

    // Процесс работы
    <section key="process" className="h-full flex items-center justify-center py-8 sm:py-12 bg-gradient-to-br from-brand-purple/5 to-brand-orange/10">
      <Process />
    </section>,

    // Кейс - Ритейл
    <section key="case-retail" className="h-full flex items-center justify-center py-8 sm:py-12 bg-gradient-to-br from-brand-orange/5 to-brand-darkBlue/10">
      <CaseRetail />
    </section>,

    // Кейс - HoReCa
    <section key="case-horeca" className="h-full flex items-center justify-center py-8 sm:py-12 bg-gradient-to-br from-brand-darkBlue/5 to-brand-purple/10">
      <CaseHoreca />
    </section>,

    // Кейс - Услуги
    <section key="case-services" className="h-full flex items-center justify-center py-8 sm:py-12 bg-gradient-to-br from-brand-purple/5 to-brand-orange/10">
      <CaseServices />
    </section>,

    // Финальная секция
    <section key="final" className="h-full flex items-center justify-center py-8 sm:py-12 bg-gradient-to-br from-brand-darkBlue/5 to-brand-purple/10">
      <div className="max-w-5xl mx-auto responsive-padding text-center">
        <div className="bg-gradient-to-br from-white/95 to-white/80 rounded-2xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-gray-200 animate-section-entrance">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
            Будущее автоматизации — уже здесь
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto leading-relaxed animate-description-fade-up stagger-2 will-animate">
            Вечный ИИ трансформирует ваш бизнес, освобождая время для стратегических задач и обеспечивая стабильный рост без дополнительных затрат на персонал.
          </p>
          
          {/* Кнопка расчёта */}
          <Link to="/client-calc" className="animate-card-wave stagger-3 will-animate inline-block">
            <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg sm:text-xl lg:text-2xl px-6 sm:px-8 lg:px-12 py-4 sm:py-6 lg:py-8 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 mb-6 sm:mb-8">
              <Calculator className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 mr-2 sm:mr-3" />
              Сделать расчёт
            </Button>
          </Link>
          
          <div className="text-sm sm:text-base lg:text-lg text-gray-500 opacity-80 animate-text-reveal stagger-4 will-animate">
            © 2025 Вечный ИИ. Будущее автоматизации уже здесь.
          </div>
        </div>
      </div>
    </section>
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AuroraBackground />
      <BurgerMenu />
      <SimpleCarousel className="w-full h-full">
        {slides}
      </SimpleCarousel>
    </div>
  );
};

export default Index;