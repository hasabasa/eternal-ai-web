import React from "react";
import { Coffee, Calendar, CheckCircle } from "lucide-react";

const CaseHoreca: React.FC = () => (
  <div className="w-full max-w-5xl mx-auto px-4">
    <div className="text-center mb-6">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Coffee className="w-8 h-8 text-brand-orange" />
        <span className="px-4 py-2 bg-brand-orange/20 text-brand-orange rounded-full text-sm font-semibold">
          HoReCa
        </span>
      </div>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-brand-darkBlue">
        Сеть кафе
      </h2>
      <p className="text-sm sm:text-base text-gray-600">
        Автоматизация бронирований и экономия 180 000₽ в месяц
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Проблема */}
      <div className="bg-red-50/70 rounded-xl border border-red-200/50 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <h3 className="font-bold text-base text-red-700">Проблема</h3>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          Администраторы не успевали принимать брони по телефону
        </p>
        <div className="flex items-center gap-2 text-sm text-red-600">
          <Calendar className="w-4 h-4" />
          <span>Потерянные брони</span>
        </div>
      </div>
      
      {/* Решение */}
      <div className="bg-blue-50/70 rounded-xl border border-blue-200/50 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <h3 className="font-bold text-base text-blue-700">Решение</h3>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          ИИ-помощник для бронирования столиков и приёма заказов
        </p>
        <div className="text-sm text-blue-600">
          Автоматическое управление залами
        </div>
      </div>
      
      {/* Результат */}
      <div className="bg-green-50/70 rounded-xl border border-green-200/50 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <h3 className="font-bold text-base text-green-700">Результат</h3>
        </div>
        <div className="space-y-2">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">180К₽</div>
            <div className="text-sm text-gray-600">Экономия/мес</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">-95%</div>
            <div className="text-sm text-gray-600">Ошибок</div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Отзыв */}
    <div className="bg-brand-purple/10 rounded-xl p-4 border-l-4 border-brand-purple">
      <div className="text-center">
        <p className="text-brand-darkBlue italic mb-3 leading-relaxed text-sm sm:text-base">
          "Забыли про потерянные брони. ИИ точнее людей и работает без выходных."
        </p>
        <div className="text-sm text-brand-purple font-semibold">
          — Управляющий сети кафе
        </div>
      </div>
    </div>
  </div>
);

export default CaseHoreca;