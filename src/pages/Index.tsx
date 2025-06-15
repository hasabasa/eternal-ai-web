
import AuroraBackground from "@/components/AuroraBackground";
import BurgerMenu from "@/components/BurgerMenu";
import Advantages from "@/components/Advantages";
import CaseRetail from "@/components/CaseRetail";
import CaseHoreca from "@/components/CaseHoreca";
import CaseServices from "@/components/CaseServices";
import Solutions from "@/components/Solutions";
import Process from "@/components/Process";
import Statistics from "@/components/Statistics";
import { Button } from "@/components/ui/button";
import { Calculator, ChevronUp, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const scrollToSection = (direction: 'up' | 'down') => {
    const sections = document.querySelectorAll('section');
    const currentSection = Array.from(sections).find(section => {
      const rect = section.getBoundingClientRect();
      return rect.top >= -100 && rect.top <= 100;
    });
    
    if (currentSection) {
      const currentIndex = Array.from(sections).indexOf(currentSection);
      let targetIndex;
      
      if (direction === 'up' && currentIndex > 0) {
        targetIndex = currentIndex - 1;
      } else if (direction === 'down' && currentIndex < sections.length - 1) {
        targetIndex = currentIndex + 1;
      }
      
      if (targetIndex !== undefined) {
        sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-y-auto">
      <AuroraBackground />
      <BurgerMenu />

      {/* Навигационные стрелки */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4">
        <button
          onClick={() => scrollToSection('up')}
          className="w-16 h-16 bg-brand-orange/90 hover:bg-brand-orange text-white rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110"
        >
          <ChevronUp className="w-8 h-8" />
        </button>
      </div>
      
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4">
        <button
          onClick={() => scrollToSection('down')}
          className="w-16 h-16 bg-brand-orange/90 hover:bg-brand-orange text-white rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>

      {/* Основной контейнер с вертикальным скроллингом */}
      <div className="relative z-10">
        {/* Главная секция */}
        <section className="min-h-screen flex items-center justify-center px-8 lg:px-16 bg-gradient-to-br from-white to-brand-orange/5">
          <div className="max-w-7xl mx-auto text-center">
            {/* Логотип */}
            <div className="font-extrabold text-6xl lg:text-8xl text-brand-darkBlue tracking-tight mb-8 select-none drop-shadow-lg leading-none">
              Вечный ИИ
            </div>
            
            {/* Тэглайн */}
            <div className="text-lg bg-gradient-to-r from-brand-orange to-brand-purple text-white px-8 py-4 rounded-full font-medium mb-12 inline-block shadow-lg">
              🚀 Революция в автоматизации бизнеса
            </div>

            {/* Заголовок */}
            <h1 className="text-4xl lg:text-6xl font-bold text-brand-darkBlue text-center leading-tight mb-8">
              Рост эффективности бизнеса —<br /> без затрат на сотрудников
            </h1>
            
            <h2 className="text-3xl lg:text-5xl font-bold text-brand-orange mb-12">
              ИИ, который работает за людей
            </h2>
            
            {/* Описание */}
            <p className="text-xl lg:text-2xl text-gray-600 text-center max-w-6xl mx-auto leading-relaxed mb-12">
              Вечный ИИ — это цифровая экосистема интеллектуальных помощников, созданных под задачи реального бизнеса.<br />
              Мы внедряем ИИ в мессенджеры (Telegram, WhatsApp, Instagram), автоматизируем общение, продажи, бронирования, рассылки.<br />
              <span className="font-semibold text-brand-darkBlue">Наши решения масштабируемы, настраиваются без кода и адаптируются под любой бизнес — от общепита до промышленности.</span>
            </p>

            {/* Кнопка расчёта */}
            <Link to="/client-calc">
              
            </Link>
          </div>
        </section>

        {/* Статистика */}
        <section className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-brand-purple/5 to-brand-orange/10">
          <Statistics />
        </section>

        {/* Решения */}
        <section className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-brand-orange/5 to-brand-darkBlue/10">
          <Solutions />
        </section>

        {/* Преимущества */}
        <section className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-brand-darkBlue/5 to-brand-purple/10">
          <Advantages />
        </section>

        {/* Процесс работы */}
        <section className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-brand-purple/5 to-brand-orange/10">
          <Process />
        </section>

        {/* Кейс - Ритейл */}
        <section className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-brand-orange/5 to-brand-darkBlue/10">
          <CaseRetail />
        </section>

        {/* Кейс - HoReCa */}
        <section className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-brand-darkBlue/5 to-brand-purple/10">
          <CaseHoreca />
        </section>

        {/* Кейс - Услуги */}
        <section className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-brand-purple/5 to-brand-orange/10">
          <CaseServices />
        </section>

        {/* Финальная секция */}
        <section className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-brand-darkBlue/5 to-brand-purple/10">
          <div className="max-w-6xl mx-auto px-8 text-center">
            <div className="bg-gradient-to-br from-white/95 to-white/80 rounded-2xl p-16 shadow-2xl border border-gray-200">
              <h2 className="text-5xl lg:text-6xl font-bold mb-8 text-brand-darkBlue">
                Будущее автоматизации — уже здесь
              </h2>
              <p className="text-2xl lg:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                Вечный ИИ трансформирует ваш бизнес, освобождая время для стратегических задач и обеспечивая стабильный рост без дополнительных затрат на персонал.
              </p>
              
              {/* Кнопка расчёта */}
              <Link to="/client-calc">
                <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white text-2xl px-12 py-8 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 mb-8">
                  <Calculator className="w-7 h-7 mr-3" />
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
    </div>
  );
};

export default Index;
