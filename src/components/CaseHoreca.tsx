import React from "react";
import { Coffee, Calendar, CheckCircle } from "lucide-react";

const CaseHoreca: React.FC = () => (
  <div className="max-w-6xl mx-auto responsive-padding animate-section-entrance">
    <div className="text-center mb-8 sm:mb-12">
      <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 animate-title-wave stagger-1 will-animate">
        <Coffee className="w-8 h-8 sm:w-12 sm:h-12 text-brand-orange animate-icon-bounce" />
        <span className="px-4 sm:px-8 py-2 sm:py-3 bg-brand-orange/20 text-brand-orange rounded-full text-base sm:text-lg font-semibold">
          HoReCa
        </span>
      </div>
      <h2 className="responsive-title font-bold mb-4 sm:mb-6 text-brand-darkBlue animate-title-wave stagger-2 will-animate">
        Сеть кафе
      </h2>
      <p className="responsive-text text-gray-600 max-w-4xl mx-auto animate-description-fade-up stagger-3 will-animate">
        Автоматизация бронирований и экономия 180 000₽ в месяц
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
          Администраторы не успевали принимать брони по телефону
        </p>
        <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-red-600 animate-text-reveal stagger-3 will-animate">
          <Calendar className="w-4 h-4 sm:w-6 sm:h-6" />
          <span>Потерянные брони</span>
        </div>
      </div>
      
      {/* Решение */}
      <div className="bg-blue-50/70 rounded-2xl sm:rounded-3xl border border-blue-200/50 p-4 sm:p-6 backdrop-blur-sm animate-card-wave stagger-2 will-animate">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full animate-icon-bounce"></div>
          <h3 className="font-bold text-lg sm:text-xl text-blue-700 animate-title-wave">Решение</h3>
        </div>
        <p className="responsive-text text-gray-700 mb-4 sm:mb-6 animate-text-reveal stagger-2 will-animate">
          ИИ-помощник для бронирования столиков и приёма заказов
        </p>
        <div className="text-sm sm:text-base text-blue-600 animate-text-reveal stagger-3 will-animate">
          Автоматическое управление залами
        </div>
      </div>
      
      {/* Результат */}
      <div className="bg-green-50/70 rounded-2xl sm:rounded-3xl border border-green-200/50 p-4 sm:p-6 backdrop-blur-sm animate-card-wave stagger-3 will-animate">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <CheckCircle className="w-5 h-5 sm:w-7 sm:h-7 text-green-600 animate-icon-bounce" />
          <h3 className="font-bold text-lg sm:text-xl text-green-700 animate-title-wave">Результат</h3>
        </div>
        <div className="space-y-3 sm:space-y-4">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 animate-number-pop stagger-2 will-animate">180К₽</div>
            <div className="text-sm sm:text-lg text-gray-600 animate-text-reveal stagger-3 will-animate">Экономия/мес</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 animate-number-pop stagger-4 will-animate">-95%</div>
            <div className="text-sm sm:text-lg text-gray-600 animate-text-reveal stagger-5 will-animate">Ошибок</div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Отзыв */}
    <div className="bg-brand-purple/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-l-4 sm:border-l-8 border-brand-purple animate-card-wave stagger-4 will-animate">
      <div className="text-center">
        <p className="text-brand-darkBlue italic mb-4 sm:mb-6 leading-relaxed responsive-text animate-description-fade-up stagger-4 will-animate">
          "Забыли про потерянные брони. ИИ точнее людей и работает без выходных."
        </p>
        <div className="text-base sm:text-lg text-brand-purple font-semibold animate-title-wave stagger-4 will-animate">
          — Управляющий сети кафе
        </div>
      </div>
    </div>
  </div>
);

export default CaseHoreca;