
import React from "react";

const cases = [
  {
    category: "Ритейл",
    name: "Цветочный бизнес",
    challenge: "Много лидов из Instagram, но 60% терялись из-за медленных ответов",
    solution: "ИИ-ассистент в WhatsApp/Instagram: мгновенные ответы, обработка фото, расчёт букетов, напоминания о праздниках",
    results: [
      "Увеличение конверсии на 90%",
      "Автоматизация 80% обращений", 
      "Рост продаж на 150%"
    ],
    testimonial: "ИИ работает лучше менеджера. Клиенты довольны скоростью, а я сосредоточился на творчестве."
  },
  {
    category: "HoReCa",
    name: "Сеть кафе 'Уютное место'",
    challenge: "Администраторы не успевали принимать брони, много ошибок в заказах",
    solution: "ИИ-помощник для бронирования столиков, приёма заказов на доставку, уведомлений о готовности",
    results: [
      "+90% сохранённых лидов с таргета",
      "Сокращение ошибок в заказах на 95%",
      "Экономия 180 000₽/мес на зарплатах"
    ],
    testimonial: "Забыли про потерянные брони. ИИ точнее людей и работает круглосуточно."
  },
  {
    category: "Услуги",
    name: "Личный ассистент предпринимателя",
    challenge: "Руководитель тонул в задачах, переписках и документообороте",
    solution: "ИИ-помощник: управление календарём, обработка входящих, напоминания, составление отчётов",
    results: [
      "+20 часов свободного времени в неделю",
      "100% контроль дедлайнов",
      "Рост продуктивности команды на 40%"
    ],
    testimonial: "ИИ стал моей правой рукой. Теперь я занимаюсь стратегией, а не тушением пожаров."
  }
];

const Cases: React.FC = () => (
  <section className="max-w-6xl mx-auto my-16 md:my-28 px-4 animate-fade-in">
    <div className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">
        Реальные истории трансформации бизнеса
      </h2>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        Кейсы наших клиентов с конкретными цифрами и результатами внедрения ИИ-решений
      </p>
    </div>
    
    <div className="space-y-8">
      {cases.map((caseItem, i) => (
        <div key={i} className="bg-white/90 rounded-3xl border border-muted shadow-lg p-8 md:p-12 hover:shadow-xl transition-all">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-aurora4/20 text-aurora4 rounded-full text-sm font-semibold">
                  {caseItem.category}
                </span>
                <h3 className="font-bold text-xl text-primary">
                  {caseItem.name}
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">Проблема:</h4>
                  <p className="text-muted-foreground">{caseItem.challenge}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Решение:</h4>
                  <p className="text-muted-foreground">{caseItem.solution}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-green-600 mb-4">Результаты:</h4>
              <div className="space-y-3 mb-6">
                {caseItem.results.map((result, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-green-700">{result}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-aurora5/10 rounded-xl p-4 border-l-4 border-aurora5">
                <p className="text-aurora5 italic">"{caseItem.testimonial}"</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Cases;
