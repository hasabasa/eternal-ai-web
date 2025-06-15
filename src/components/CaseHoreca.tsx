
import React from "react";
import { Coffee, Calendar, CheckCircle, DollarSign } from "lucide-react";

const CaseHoreca: React.FC = () => (
  <div className="max-w-6xl mx-auto px-4 animate-fade-in">
    <div className="text-center mb-6 md:mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Coffee className="w-8 h-8 md:w-12 md:h-12 text-brand-orange" />
        <span className="px-3 md:px-4 py-1 md:py-2 bg-brand-orange/20 text-brand-orange rounded-full text-sm md:text-base font-semibold">
          HoReCa
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-brand-darkBlue">
        Сеть кафе
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
        Автоматизация бронирований и экономия 180 000₽ в месяц
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
      {/* Проблема */}
      <div className="bg-red-50/70 rounded-2xl md:rounded-3xl border border-red-200/50 shadow-lg p-4 md:p-6 lg:p-8 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-red-700">Проблема</h3>
        </div>
        <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
          Администраторы не успевали принимать брони по телефону. Много ошибок в записях, двойные бронирования.
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm md:text-base text-red-600">
            <Calendar className="w-4 h-4" />
            <span>Потерянные брони каждый день</span>
          </div>
          <div className="flex items-center gap-2 text-sm md:text-base text-red-600">
            <CheckCircle className="w-4 h-4" />
            <span>Высокий процент ошибок</span>
          </div>
        </div>
      </div>

      {/* Решение */}
      <div className="bg-blue-50/70 rounded-2xl md:rounded-3xl border border-blue-200/50 shadow-lg p-4 md:p-6 lg:p-8 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-700">Решение</h3>
        </div>
        <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
          ИИ-помощник для бронирования столиков и приёма заказов с интеграцией в систему управления.
        </p>
        <div className="space-y-2">
          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm font-medium inline-block mr-2">
            Автоматическое бронирование
          </div>
          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm font-medium inline-block mr-2">
            Приём заказов
          </div>
          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm font-medium inline-block">
            Контроль загрузки залов
          </div>
        </div>
      </div>
    </div>

    {/* Результаты */}
    <div className="bg-green-50/70 rounded-2xl md:rounded-3xl border border-green-200/50 shadow-lg p-4 md:p-6 lg:p-8 backdrop-blur-sm mb-6">
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-green-700">Результаты</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="text-center p-4 bg-white/50 rounded-xl">
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 mb-2">+90%</div>
          <div className="text-sm md:text-base text-gray-600">Сохранённых лидов</div>
        </div>
        <div className="text-center p-4 bg-white/50 rounded-xl">
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 mb-2">-95%</div>
          <div className="text-sm md:text-base text-gray-600">Сокращение ошибок</div>
        </div>
        <div className="text-center p-4 bg-white/50 rounded-xl">
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 mb-2">180К₽</div>
          <div className="text-sm md:text-base text-gray-600">Экономия в месяц</div>
        </div>
      </div>
    </div>

    {/* Отзыв */}
    <div className="bg-brand-purple/10 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border-l-4 md:border-l-8 border-brand-purple">
      <div className="text-center">
        <div className="text-4xl md:text-6xl text-brand-purple/20 mb-4">"</div>
        <p className="text-base md:text-lg lg:text-xl text-brand-darkBlue italic mb-4 max-w-2xl mx-auto leading-relaxed">
          Забыли про потерянные брони. ИИ точнее людей и работает без выходных. Клиенты довольны удобством бронирования.
        </p>
        <div className="text-sm md:text-base text-brand-purple font-semibold">
          — Управляющий сети кафе
        </div>
      </div>
    </div>
  </div>
);

export default CaseHoreca;
