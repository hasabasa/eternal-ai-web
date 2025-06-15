import React from "react";
import { Flower, TrendingUp, Clock } from "lucide-react";

const CaseRetail: React.FC = () => (
  <div className="max-w-6xl mx-auto responsive-padding animate-section-entrance">
    <div className="text-center mb-8 sm:mb-12">
      <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 animate-title-wave stagger-1 will-animate">
        <Flower className="w-8 h-8 sm:w-12 sm:h-12 text-brand-orange animate-icon-bounce" />
        <span className="px-4 sm:px-8 py-2 sm:py-3 bg-brand-orange/20 text-brand-orange rounded-full text-base sm:text-lg font-semibold">
          Ритейл
        </span>
      </div>
      <h2 className="responsive-title font-bold mb-4 sm:mb-6 text-brand-darkBlue animate-title-wave stagger-2 will-animate">
        Цветочный бизнес
      </h2>
      <p className="responsive-text text-gray-600 max-w-4xl mx-auto animate-description-fade-up stagger-3 will-animate">
        Как ИИ-ассистент увеличил продажи на 150%
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
      {/* Проблема */}
      <div className="bg-red-50/70 rounded-2xl sm:rounded-3xl border border-red-200/50 p-4 sm:p-6 backdrop-blur-sm animate-card-wave stagger-1 will-animate">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full animate-icon-bounce"></div>
          <h3 className="font-bold text-lg sm:text-xl text-red-700 animate-title-wave">Проблема</h3>
        </div>
        <p className="responsive-text text-gray-700 mb-4 sm:mb-6 animate-text-reveal stagger-2 will-animate">
          60% лидов терялось из-за медленных ответов операторов
        </p>
        <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-red-600 animate-text-reveal stagger-3 will-animate">
          <Clock className="w-4 h-4 sm:w-6 sm:h-6" />
          <span>15+ минут ответа</span>
        </div>
      </div>
      
      {/* Решение */}
      <div className="bg-blue-50/70 rounded-2xl sm:rounded-3xl border border-blue-200/50 p-4 sm:p-6 backdrop-blur-sm animate-card-wave stagger-2 will-animate">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full animate-icon-bounce"></div>
          <h3 className="font-bold text-lg sm:text-xl text-blue-700 animate-title-wave">Решение</h3>
        </div>
        <p className="responsive-text text-gray-700 mb-4 sm:mb-6 animate-text-reveal stagger-2 will-animate">
          ИИ-ассистент: мгновенные ответы 24/7, обработка фото букетов
        </p>
        <div className="text-sm sm:text-base text-blue-600 animate-text-reveal stagger-3 will-animate">
          Автоматический расчёт стоимости
        </div>
      </div>
      
      {/* Результат */}
      <div className="bg-green-50/70 rounded-2xl sm:rounded-3xl border border-green-200/50 p-4 sm:p-6 backdrop-blur-sm animate-card-wave stagger-3 will-animate">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <TrendingUp className="w-5 h-5 sm:w-7 sm:h-7 text-green-600 animate-icon-bounce" />
          <h3 className="font-bold text-lg sm:text-xl text-green-700 animate-title-wave">Результат</h3>
        </div>
        <div className="space-y-3 sm:space-y-4">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 animate-number-pop stagger-2 will-animate">+150%</div>
            <div className="text-sm sm:text-lg text-gray-600 animate-text-reveal stagger-3 will-animate">Рост продаж</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 animate-number-pop stagger-4 will-animate">90%</div>
            <div className="text-sm sm:text-lg text-gray-600 animate-text-reveal stagger-5 will-animate">Конверсия</div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Отзыв */}
    <div className="bg-brand-purple/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-l-4 sm:border-l-8 border-brand-purple animate-card-wave stagger-4 will-animate">
      <div className="text-center">
        <p className="text-brand-darkBlue italic mb-4 sm:mb-6 leading-relaxed responsive-text animate-description-fade-up stagger-4 will-animate">
          "ИИ работает лучше менеджера. Клиенты довольны скоростью и точностью."
        </p>
        <div className="text-base sm:text-lg text-brand-purple font-semibold animate-title-wave stagger-4 will-animate">
          — Владелец цветочного магазина
        </div>
      </div>
    </div>
  </div>
);

export default CaseRetail;