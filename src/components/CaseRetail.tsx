import React from "react";
import { Flower, TrendingUp, Clock } from "lucide-react";

const CaseRetail: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 md:p-6 animate-section-entrance">
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-3 sm:mb-4 md:mb-6">
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4 animate-title-wave stagger-1 will-animate">
          <Flower className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-brand-orange animate-icon-bounce" />
          <span className="px-2 sm:px-3 md:px-4 lg:px-6 py-1 sm:py-1.5 md:py-2 bg-brand-orange/20 text-brand-orange rounded-full text-xs sm:text-sm md:text-base font-semibold">
            Ритейл
          </span>
        </div>
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-1 sm:mb-2 md:mb-3 text-brand-darkBlue animate-title-wave stagger-2 will-animate">
          Цветочный бизнес
        </h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 animate-description-fade-up stagger-3 will-animate">
          Как ИИ-ассистент увеличил продажи на 150%
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
        {/* Проблема */}
        <div className="bg-red-50/70 rounded-lg sm:rounded-xl md:rounded-2xl border border-red-200/50 p-2 sm:p-3 md:p-4 backdrop-blur-sm animate-card-wave stagger-1 will-animate">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 mb-2 sm:mb-3">
            <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-red-500 rounded-full animate-icon-bounce"></div>
            <h3 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg text-red-700 animate-title-wave">Проблема</h3>
          </div>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-2 sm:mb-3 animate-text-reveal stagger-2 will-animate">
            60% лидов терялось из-за медленных ответов операторов
          </p>
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-red-600 animate-text-reveal stagger-3 will-animate">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            <span>15+ минут ответа</span>
          </div>
        </div>
        
        {/* Решение */}
        <div className="bg-blue-50/70 rounded-lg sm:rounded-xl md:rounded-2xl border border-blue-200/50 p-2 sm:p-3 md:p-4 backdrop-blur-sm animate-card-wave stagger-2 will-animate">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 mb-2 sm:mb-3">
            <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-blue-500 rounded-full animate-icon-bounce"></div>
            <h3 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg text-blue-700 animate-title-wave">Решение</h3>
          </div>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-2 sm:mb-3 animate-text-reveal stagger-2 will-animate">
            ИИ-ассистент: мгновенные ответы 24/7, обработка фото букетов
          </p>
          <div className="text-xs sm:text-sm text-blue-600 animate-text-reveal stagger-3 will-animate">
            Автоматический расчёт стоимости
          </div>
        </div>
        
        {/* Результат */}
        <div className="bg-green-50/70 rounded-lg sm:rounded-xl md:rounded-2xl border border-green-200/50 p-2 sm:p-3 md:p-4 backdrop-blur-sm animate-card-wave stagger-3 will-animate">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 mb-2 sm:mb-3">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-green-600 animate-icon-bounce" />
            <h3 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg text-green-700 animate-title-wave">Результат</h3>
          </div>
          <div className="space-y-1 sm:space-y-2">
            <div className="text-center">
              <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-green-600 animate-number-pop stagger-2 will-animate">+150%</div>
              <div className="text-xs sm:text-sm text-gray-600 animate-text-reveal stagger-3 will-animate">Рост продаж</div>
            </div>
            <div className="text-center">
              <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-green-600 animate-number-pop stagger-4 will-animate">90%</div>
              <div className="text-xs sm:text-sm text-gray-600 animate-text-reveal stagger-5 will-animate">Конверсия</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Отзыв */}
      <div className="bg-brand-purple/10 rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 border-l-2 sm:border-l-3 md:border-l-4 border-brand-purple animate-card-wave stagger-4 will-animate">
        <div className="text-center">
          <p className="text-brand-darkBlue italic mb-1 sm:mb-2 md:mb-3 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg animate-description-fade-up stagger-4 will-animate">
            "ИИ работает лучше менеджера. Клиенты довольны скоростью и точностью."
          </p>
          <div className="text-xs sm:text-sm md:text-base text-brand-purple font-semibold animate-title-wave stagger-4 will-animate">
            — Владелец цветочного магазина
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CaseRetail;