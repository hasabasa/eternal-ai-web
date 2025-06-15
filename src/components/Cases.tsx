import React from "react";

const cases = [
  {
    category: "Ритейл",
    name: "Цветочный бизнес",
    challenge: "60% лидов терялись из-за медленных ответов",
    solution: "ИИ-ассистент: мгновенные ответы, обработка фото, расчёт букетов",
    results: [
      "Увеличение конверсии на 90%",
      "Автоматизация 80% обращений", 
      "Рост продаж на 150%"
    ],
    testimonial: "ИИ работает лучше менеджера. Клиенты довольны скоростью."
  },
  {
    category: "HoReCa",
    name: "Сеть кафе",
    challenge: "Администраторы не успевали принимать брони",
    solution: "ИИ-помощник для бронирования столиков и приёма заказов",
    results: [
      "+90% сохранённых лидов",
      "Сокращение ошибок на 95%",
      "Экономия 180 000₽/мес"
    ],
    testimonial: "Забыли про потерянные брони. ИИ точнее людей."
  },
  {
    category: "Услуги",
    name: "Личный ассистент",
    challenge: "Руководитель тонул в задачах и переписках",
    solution: "ИИ-помощник: управление календарём, обработка входящих",
    results: [
      "+20 часов времени в неделю",
      "100% контроль дедлайнов",
      "Рост продуктивности на 40%"
    ],
    testimonial: "ИИ стал моей правой рукой. Теперь я занимаюсь стратегией."
  }
];

const Cases: React.FC = () => (
  <div className="max-w-6xl mx-auto responsive-padding animate-section-entrance">
    <div className="text-center mb-6 sm:mb-8 md:mb-12">
      <h2 className="responsive-title font-bold mb-3 md:mb-6 text-brand-darkBlue animate-title-wave stagger-1 will-animate">
        Реальные истории трансформации бизнеса
      </h2>
      <p className="responsive-text text-gray-600 max-w-3xl mx-auto animate-description-fade-up stagger-2 will-animate">
        Кейсы наших клиентов с конкретными цифрами и результатами
      </p>
    </div>
    
    <div className="space-y-4 md:space-y-6">
      {cases.map((caseItem, i) => (
        <div key={i} className={`bg-white/70 rounded-2xl md:rounded-3xl border border-white/30 shadow-lg p-4 md:p-6 lg:p-8 hover:bg-white/90 transition-all backdrop-blur-sm animate-card-wave stagger-${i + 1} will-animate`}>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <span className="px-2 md:px-3 py-1 bg-brand-orange/20 text-brand-orange rounded-full text-xs md:text-sm font-semibold animate-icon-bounce">
                  {caseItem.category}
                </span>
                <h3 className="font-bold text-sm md:text-lg lg:text-xl text-brand-darkBlue animate-title-wave stagger-1 will-animate">
                  {caseItem.name}
                </h3>
              </div>
              
              <div className="space-y-2 md:space-y-3">
                <div>
                  <h4 className="font-semibold text-red-600 mb-1 text-xs md:text-sm animate-text-reveal stagger-2 will-animate">Проблема:</h4>
                  <p className="text-gray-600 text-xs md:text-sm lg:text-base animate-text-reveal stagger-3 will-animate">{caseItem.challenge}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-600 mb-1 text-xs md:text-sm animate-text-reveal stagger-4 will-animate">Решение:</h4>
                  <p className="text-gray-600 text-xs md:text-sm lg:text-base animate-text-reveal stagger-5 will-animate">{caseItem.solution}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-green-600 mb-2 md:mb-3 text-xs md:text-sm animate-text-reveal stagger-6 will-animate">Результаты:</h4>
              <div className="space-y-1 md:space-y-2 mb-3 md:mb-4">
                {caseItem.results.map((result, j) => (
                  <div key={j} className={`flex items-center gap-2 animate-text-reveal stagger-${7 + j} will-animate`}>
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="font-medium text-green-700 text-xs md:text-sm lg:text-base">{result}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-brand-purple/10 rounded-xl md:rounded-2xl p-3 md:p-4 border-l-2 md:border-l-4 border-brand-purple animate-card-wave stagger-10 will-animate">
                <p className="text-brand-darkBlue italic text-xs md:text-sm lg:text-base">"{caseItem.testimonial}"</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Cases;