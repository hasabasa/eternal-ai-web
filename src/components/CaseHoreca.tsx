import React from "react";
import { Coffee, Calendar, CheckCircle } from "lucide-react";

const CaseHoreca: React.FC = () => (
  <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-16 py-4 sm:py-6 md:py-8 animate-section-entrance">
    <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
      <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8 animate-title-wave stagger-1 will-animate">
        <Coffee className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-brand-orange animate-icon-bounce" />
        <span className="px-3 sm:px-4 md:px-6 lg:px-8 py-1 sm:py-2 md:py-3 bg-brand-orange/20 text-brand-orange rounded-full text-sm sm:text-base md:text-lg font-semibold">
          HoReCa
        </span>
      </div>
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-brand-darkBlue animate-title-wave stagger-2 will-animate">
        Сеть кафе
      </h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto animate-description-fade-up stagger-3 will-animate">
        Автоматизация бронирований и экономия 180 000₽ в месяц
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-6 md:mb-8 lg:mb-12">
      {/* Проблема */}
      <div className="bg-red-50/70 rounded-xl sm:rounded-2xl md:rounded-3xl border border-red-200/50 p-2 sm:p-3 md:p-4 lg:p-6 backdrop-blur-sm animate-card-wave stagger-1 will-animate">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4 lg:mb-6">
          <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-red-500 rounded-full animate-icon-bounce"></div>
          <h3 className="font-bold text-base sm:text-lg md:text-xl text-red-700 animate-title-wave">Проблема</h3>
        </div>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 mb-2 sm:mb-3 md:mb-4 lg:mb-6 animate-text-reveal stagger-2 will-animate">
          Администраторы не успевали принимать брони по телефону
        </p>
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 text-xs sm:text-sm md:text-base text-red-600 animate-text-reveal stagger-3 will-animate">
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          <span>Потерянные брони</span>
        </div>
      </div>
      
      {/* Решение */}
      <div className="bg-blue-50/70 rounded-xl sm:rounded-2xl md:rounded-3xl border border-blue-200/50 p-2 sm:p-3 md:p-4 lg:p-6 backdrop-blur-sm animate-card-wave stagger-2 will-animate">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4 lg:mb-6">
          <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-blue-500 rounded-full animate-icon-bounce"></div>
          <h3 className="font-bold text-base sm:text-lg md:text-xl text-blue-700 animate-title-wave">Решение</h3>
        </div>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 mb-2 sm:mb-3 md:mb-4 lg:mb-6 animate-text-reveal stagger-2 will-animate">
          ИИ-помощник для бронирования столиков и приёма заказов
        </p>
        <div className="text-xs sm:text-sm md:text-base text-blue-600 animate-text-reveal stagger-3 will-animate">
          Автоматическое управление залами
        </div>
      </div>
      
      {/* Результат */}
      <div className="bg-green-50/70 rounded-xl sm:rounded-2xl md:rounded-3xl border border-green-200/50 p-2 sm:p-3 md:p-4 lg:p-6 backdrop-blur-sm animate-card-wave stagger-3 will-animate">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4 lg:mb-6">
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-green-600 animate-icon-bounce" />
          <h3 className="font-bold text-base sm:text-lg md:text-xl text-green-700 animate-title-wave">Результат</h3>
        </div>
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <div className="text-center">
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-green-600 animate-number-pop stagger-2 will-animate">180К₽</div>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 animate-text-reveal stagger-3 will-animate">Экономия/мес</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-green-600 animate-number-pop stagger-4 will-animate">-95%</div>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 animate-text-reveal stagger-5 will-animate">Ошибок</div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Отзыв */}
    <div className="bg-brand-purple/10 rounded-xl sm:rounded-2xl md:rounded-3xl p-2 sm:p-3 md:p-4 lg:p-6 border-l-2 sm:border-l-4 md:border-l-8 border-brand-purple animate-card-wave stagger-4 will-animate">
      <div className="text-center">
        <p className="text-brand-darkBlue italic mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl animate-description-fade-up stagger-4 will-animate">
          "Забыли про потерянные брони. ИИ точнее людей и работает без выходных."
        </p>
        <div className="text-sm sm:text-base md:text-lg text-brand-purple font-semibold animate-title-wave stagger-4 will-animate">
          — Управляющий сети кафе
        </div>
      </div>
    </div>
  </div>
);

export default CaseHoreca;