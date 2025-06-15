
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
  <div className="max-w-6xl mx-auto px-4 animate-fade-in">
    <div className="text-center mb-8 md:mb-16">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-brand-darkBlue">
        Реальные истории трансформации бизнеса
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
        Кейсы наших клиентов с конкретными цифрами и результатами
      </p>
    </div>
    
    <div className="space-y-6 md:space-y-8">
      {cases.map((caseItem, i) => (
        <div key={i} className="bg-white/70 rounded-3xl border border-white/30 shadow-lg p-6 md:p-8 hover:bg-white/90 transition-all backdrop-blur-sm">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-brand-orange/20 text-brand-orange rounded-full text-sm font-semibold">
                  {caseItem.category}
                </span>
                <h3 className="font-bold text-lg md:text-xl text-brand-darkBlue">
                  {caseItem.name}
                </h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-red-600 mb-1">Проблема:</h4>
                  <p className="text-gray-600 text-sm md:text-base">{caseItem.challenge}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-600 mb-1">Решение:</h4>
                  <p className="text-gray-600 text-sm md:text-base">{caseItem.solution}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-green-600 mb-3">Результаты:</h4>
              <div className="space-y-2 mb-4">
                {caseItem.results.map((result, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-green-700 text-sm md:text-base">{result}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-brand-purple/10 rounded-2xl p-4 border-l-4 border-brand-purple">
                <p className="text-brand-darkBlue italic text-sm md:text-base">"{caseItem.testimonial}"</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Cases;
