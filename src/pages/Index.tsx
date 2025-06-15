
import AuroraBackground from "@/components/AuroraBackground";
import BurgerMenu from "@/components/BurgerMenu";
import Advantages from "@/components/Advantages";
import Cases from "@/components/Cases";
import Solutions from "@/components/Solutions";
import Process from "@/components/Process";
import Statistics from "@/components/Statistics";

const Index = () => {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden snap-y snap-mandatory">
      <AuroraBackground />
      <BurgerMenu />

      {/* Слайд 1: Главная секция */}
      <section className="relative min-h-screen flex items-center justify-center px-4 snap-start animate-fade-in">
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
          <p className="text-xl sm:text-2xl text-gray-600 text-center max-w-4xl mx-auto leading-relaxed">
            Вечный ИИ — это цифровая экосистема интеллектуальных помощников, созданных под задачи реального бизнеса.<br />
            Мы внедряем ИИ в мессенджеры (Telegram, WhatsApp, Instagram, Threads), автоматизируем общение, продажи, бронирования, рассылки.<br />
            <span className="font-semibold text-brand-darkBlue">Наши решения масштабируемы, настраиваются без кода и адаптируются под любой бизнес — от общепита до промышленности.</span>
          </p>
        </div>
      </section>

      {/* Слайд 2: Статистика */}
      <section className="min-h-screen flex items-center justify-center snap-start">
        <Statistics />
      </section>

      {/* Слайд 3: Решения */}
      <section className="min-h-screen flex items-center justify-center snap-start">
        <Solutions />
      </section>

      {/* Слайд 4: Преимущества */}
      <section className="min-h-screen flex items-center justify-center snap-start">
        <Advantages />
      </section>

      {/* Слайд 5: Процесс работы */}
      <section className="min-h-screen flex items-center justify-center snap-start">
        <Process />
      </section>

      {/* Слайд 6: Кейсы */}
      <section className="min-h-screen flex items-center justify-center snap-start">
        <Cases />
      </section>

      {/* Слайд 7: Финальный слайд */}
      <section className="min-h-screen flex items-center justify-center snap-start">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-white/90 to-white/70 rounded-3xl p-12 md:p-16 shadow-xl border border-gray-200">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-brand-darkBlue">
              Будущее автоматизации — уже здесь
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Вечный ИИ трансформирует ваш бизнес, освобождая время для стратегических задач и обеспечивая стабильный рост без дополнительных затрат на персонал.
            </p>
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
