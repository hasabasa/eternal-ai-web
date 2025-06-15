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
    // Главная секция
    <section key="main" className="h-screen w-full flex items-center justify-center px-4 bg-gradient-to-br from-white to-brand-orange/5 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <div className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-brand-darkBlue tracking-tight mb-4 sm:mb-6 select-none drop-shadow-lg leading-tight animate-logo-entrance">
          Вечный ИИ
        </div>
        
        <div className="text-xs sm:text-sm md:text-base bg-gradient-to-r from-brand-orange to-brand-purple text-white px-4 py-2 rounded-full font-medium mb-6 inline-block shadow-lg animate-tagline-slide">
          🚀 Революция в автоматизации бизнеса
        </div>

        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-brand-darkBlue text-center leading-tight mb-4 animate-title-wave">
          Рост эффективности бизнеса —<br className="hidden sm:block" /> без затрат на сотрудников
        </h1>
        
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-brand-orange mb-6 animate-title-wave">
          ИИ, который работает за людей
        </h2>
        
        <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center max-w-4xl mx-auto leading-relaxed animate-description-fade-up">
          Вечный ИИ — это цифровая экосистема интеллектуальных помощников, созданных под задачи реального бизнеса.
          <br className="hidden md:block" />
          Мы внедряем ИИ в мессенджеры, автоматизируем общение, продажи, бронирования.
        </p>
      </div>
    </section>,

    // Статистика - страница 2
    <section key="statistics" className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-brand-purple/5 to-brand-orange/10 overflow-hidden">
      <div className="animate-section-entrance">
        <Statistics />
      </div>
    </section>,

    // Решения - страница 3
    <section key="solutions" className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-brand-orange/5 to-brand-darkBlue/10 overflow-hidden">
      <div className="animate-section-entrance">
        <Solutions />
      </div>
    </section>,

    // Преимущества - страница 4
    <section key="advantages" className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-brand-darkBlue/5 to-brand-purple/10 overflow-hidden">
      <div className="animate-section-entrance">
        <Advantages />
      </div>
    </section>,

    // Процесс работы - страница 5
    <section key="process" className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-brand-purple/5 to-brand-orange/10 overflow-hidden">
      <div className="animate-section-entrance">
        <Process />
      </div>
    </section>,

    // Кейс - Ритейл - страница 6
    <section key="case-retail" className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-brand-orange/5 to-brand-darkBlue/10 overflow-hidden">
      <div className="animate-section-entrance">
        <CaseRetail />
      </div>
    </section>,

    // Кейс - HoReCa - страница 7
    <section key="case-horeca" className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-brand-darkBlue/5 to-brand-purple/10 overflow-hidden">
      <div className="animate-section-entrance">
        <CaseHoreca />
      </div>
    </section>,

    // Кейс - Услуги - страница 8
    <section key="case-services" className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-brand-purple/5 to-brand-orange/10 overflow-hidden">
      <div className="animate-section-entrance">
        <CaseServices />
      </div>
    </section>,

    // Финальная секция
    <section key="final" className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-brand-darkBlue/5 to-brand-purple/10 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center animate-section-entrance">
        <div className="bg-gradient-to-br from-white/95 to-white/80 rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-200">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-brand-darkBlue">
            Будущее автоматизации — уже здесь
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
            Вечный ИИ трансформирует ваш бизнес, освобождая время для стратегических задач.
          </p>
          
          <Link to="/client-calc" className="inline-block">
            <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white text-base sm:text-lg px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 mb-4">
              <Calculator className="w-5 h-5 mr-2" />
              Сделать расчёт
            </Button>
          </Link>
          
          <div className="text-sm text-gray-500 opacity-80">
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