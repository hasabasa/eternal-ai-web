
import React from "react";

const cases = [
  {
    name: "Цветочный бизнес",
    desc: (
      <>
        Лиды → CRM → WhatsApp/Instagram → общение, обработка изображений, дожим, рассылки.<br />
        <span className="inline-block mt-2 text-green-600">➜ Увеличение продаж, автоматизация клиента.</span>
      </>
    )
  },
  {
    name: "Общепит",
    desc: (
      <>
        Вместо администратора: брони, доставка, чаты — всё ИИ.<br />
        <span className="inline-block mt-2 text-green-600">➜ +90% сохранённых лидов с Instagram и таргета.</span>
      </>
    )
  },
  {
    name: "Личный ассистент",
    desc: (
      <>
        Предприниматель не успевал вести задачи и документы. ИИ стал его digital-менеджером: дедлайны, переписки, файлы.<br />
        <span className="inline-block mt-2 text-green-600">➜ +20 часов в неделю свободного времени.</span>
      </>
    )
  },
];

const Cases = () => (
  <section className="max-w-5xl mx-auto my-16 md:my-28 px-4 animate-fade-in">
    <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-primary text-center">
      <span className="block">Реальные кейсы внедрения ИИ</span>
    </h2>
    <div className="flex flex-col md:flex-row gap-7">
      {cases.map((c) => (
        <div key={c.name} className="flex-1 bg-white/85 rounded-2xl border border-muted shadow-md p-6 min-w-[260px] hover:shadow-xl transition">
          <div className="font-semibold text-lg mb-2">{c.name}</div>
          <div className="text-base text-muted-foreground">{c.desc}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Cases;
