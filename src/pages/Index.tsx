
import AuroraBackground from "@/components/AuroraBackground";
import BurgerMenu from "@/components/BurgerMenu";
import Advantages from "@/components/Advantages";
import Cases from "@/components/Cases";
import Solutions from "@/components/Solutions";
import Process from "@/components/Process";
import Statistics from "@/components/Statistics";

const Index = () => {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <AuroraBackground />
      <BurgerMenu />

      {/* Главная секция */}
      <section className="relative max-w-4xl mx-auto px-4 py-24 md:py-36 flex flex-col gap-8 items-center animate-fade-in">
        {/* Логотип */}
        <div className="font-extrabold text-[36px] sm:text-[48px] text-primary tracking-tight mb-6 select-none drop-shadow leading-none">
          Вечный ИИ
        </div>
        
        {/* Тэглайн */}
        <div className="text-sm sm:text-base bg-gradient-to-r from-aurora5 to-aurora4 text-white px-4 py-2 rounded-full font-medium mb-4">
          🚀 Революция в автоматизации бизнеса
        </div>

        {/* Заголовок */}
        <h1 className="text-[2rem] sm:text-[2.6rem] font-bold text-black text-center leading-tight mb-4">
          Рост эффективности бизнеса —<br className="hidden sm:block"/> без затрат на сотрудников. <br className="hidden sm:block"/>
          <span className="block text-aurora4 mt-1">ИИ, который работает за людей.</span>
        </h1>
        
        {/* Описание */}
        <p className="text-lg sm:text-xl text-muted-foreground text-center max-w-3xl mb-8 leading-relaxed">
          Вечный ИИ — это цифровая экосистема интеллектуальных помощников, созданных под задачи реального бизнеса.<br />
          Мы внедряем ИИ в мессенджеры (Telegram, WhatsApp, Instagram, Threads), автоматизируем общение, продажи, бронирования, рассылки.<br />
          <span className="font-semibold text-primary">Наши решения масштабируемы, настраиваются без кода и адаптируются под любой бизнес — от общепита до промышленности.</span>
        </p>
        
        {/* CTA кнопки */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="https://t.me/vechniy_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 text-lg font-semibold text-white rounded-xl shadow-lg bg-gradient-to-r from-aurora5 to-aurora4 hover:scale-105 transition-all hover:shadow-2xl"
          >
            Получить консультацию
          </a>
          <button className="px-6 py-3 text-primary border-2 border-primary rounded-xl hover:bg-primary hover:text-white transition-all font-medium">
            Смотреть демо
          </button>
        </div>
      </section>

      {/* Статистика */}
      <Statistics />

      {/* Блок решений */}
      <Solutions />

      {/* Блок преимуществ */}
      <Advantages />

      {/* Процесс работы */}
      <Process />

      {/* Блок кейсов */}
      <Cases />

      {/* Финальный CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center animate-fade-in">
        <div className="bg-gradient-to-br from-white/90 to-white/70 rounded-3xl p-8 md:p-12 shadow-xl border border-muted">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-primary">
            Готовы автоматизировать свой бизнес?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Начните с бесплатной консультации. Мы проанализируем ваши процессы и предложим оптимальное ИИ-решение.
          </p>
          <a
            href="https://t.me/vechniy_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 text-lg font-semibold text-white rounded-xl shadow-lg bg-gradient-to-r from-aurora5 to-aurora4 hover:scale-105 transition-all hover:shadow-2xl"
          >
            Связаться сейчас
          </a>
        </div>
      </section>

      {/* Футер */}
      <footer className="mt-20 mb-8 text-center text-xs text-muted-foreground opacity-80">
        © 2025 Вечный ИИ. Будущее автоматизации уже здесь.
      </footer>
    </div>
  );
};

export default Index;
