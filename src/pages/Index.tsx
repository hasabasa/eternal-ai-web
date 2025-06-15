
import AuroraBackground from "@/components/AuroraBackground";
import BurgerMenu from "@/components/BurgerMenu";
import Advantages from "@/components/Advantages";
import Cases from "@/components/Cases";

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
        {/* Заголовок */}
        <h1 className="text-[2rem] sm:text-[2.6rem] font-bold text-black text-center leading-tight mb-4">
          Рост эффективности бизнеса —<br className="hidden sm:block"/> без затрат на сотрудников. <br className="hidden sm:block"/>
          <span className="block text-aurora4 mt-1">ИИ, который работает за людей.</span>
        </h1>
        {/* Описание */}
        <p className="text-lg sm:text-xl text-muted-foreground text-center max-w-2xl mb-6">
          Вечный ИИ — это цифровая экосистема интеллектуальных помощников, созданных под задачи реального бизнеса.<br />
          Мы внедряем ИИ в мессенджеры (Telegram, WhatsApp, Instagram, Threads), автоматизируем общение, продажи, бронирования, рассылки.<br />
          Наши решения масштабируемы, настраиваются без кода и адаптируются под любой бизнес — от общепита до промышленности.
        </p>
        {/* CTA кнопка */}
        <a
          href="https://t.me/vechniy_ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 text-lg font-semibold bg-primary text-primary-foreground rounded-xl shadow-lg bg-gradient-to-r from-aurora5 to-aurora4 hover:scale-105 transition-all hover:shadow-2xl"
        >
          Связаться по Telegram
        </a>
      </section>

      {/* Блок преимуществ */}
      <Advantages />

      {/* Блок кейсов */}
      <Cases />

      {/* Небольшой футер */}
      <footer className="mt-20 mb-8 text-center text-xs text-muted-foreground opacity-80">
        © 2024 Вечный ИИ. Сделано с любовью и ИИ.
      </footer>
    </div>
  );
};

export default Index;
