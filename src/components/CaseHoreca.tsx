
import React from "react";
import { Coffee, Calendar, CheckCircle } from "lucide-react";

const CaseHoreca: React.FC = () => (
  <div className="max-w-7xl mx-auto px-8 animate-fade-in">
    <div className="text-center mb-20">
      <div className="flex items-center justify-center gap-6 mb-8">
        <Coffee className="w-16 h-16 text-brand-orange" />
        <span className="px-8 py-4 bg-brand-orange/20 text-brand-orange rounded-full text-2xl font-semibold">
          HoReCa
        </span>
      </div>
      <h2 className="text-6xl lg:text-7xl font-bold mb-12 text-brand-darkBlue">
        Сеть кафе
      </h2>
      <p className="text-3xl lg:text-4xl text-gray-600 max-w-6xl mx-auto">
        Автоматизация бронирований и экономия 180 000₽ в месяц
      </p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-16 mb-20">
      {/* Проблема */}
      <div className="bg-red-50/70 rounded-3xl border border-red-200/50 p-16 backdrop-blur-sm">
        <div className="flex items-center gap-6 mb-10">
          <div className="w-8 h-8 bg-red-500 rounded-full"></div>
          <h3 className="font-bold text-3xl text-red-700">Проблема</h3>
        </div>
        <p className="text-2xl text-gray-700 mb-10">
          Администраторы не успевали принимать брони по телефону
        </p>
        <div className="flex items-center gap-6 text-xl text-red-600">
          <Calendar className="w-8 h-8" />
          <span>Потерянные брони</span>
        </div>
      </div>

      {/* Решение */}
      <div className="bg-blue-50/70 rounded-3xl border border-blue-200/50 p-16 backdrop-blur-sm">
        <div className="flex items-center gap-6 mb-10">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          <h3 className="font-bold text-3xl text-blue-700">Решение</h3>
        </div>
        <p className="text-2xl text-gray-700 mb-10">
          ИИ-помощник для бронирования столиков и приёма заказов
        </p>
        <div className="text-xl text-blue-600">
          Автоматическое управление залами
        </div>
      </div>

      {/* Результат */}
      <div className="bg-green-50/70 rounded-3xl border border-green-200/50 p-16 backdrop-blur-sm">
        <div className="flex items-center gap-6 mb-10">
          <CheckCircle className="w-10 h-10 text-green-600" />
          <h3 className="font-bold text-3xl text-green-700">Результат</h3>
        </div>
        <div className="space-y-8">
          <div className="text-center">
            <div className="text-5xl lg:text-6xl font-bold text-green-600">180К₽</div>
            <div className="text-2xl text-gray-600">Экономия/мес</div>
          </div>
          <div className="text-center">
            <div className="text-5xl lg:text-6xl font-bold text-green-600">-95%</div>
            <div className="text-2xl text-gray-600">Ошибок</div>
          </div>
        </div>
      </div>
    </div>

    {/* Отзыв */}
    <div className="bg-brand-purple/10 rounded-3xl p-16 border-l-8 border-brand-purple">
      <div className="text-center">
        <p className="text-brand-darkBlue italic mb-8 leading-relaxed text-3xl lg:text-4xl">
          "Забыли про потерянные брони. ИИ точнее людей и работает без выходных."
        </p>
        <div className="text-2xl text-brand-purple font-semibold">
          — Управляющий сети кафе
        </div>
      </div>
    </div>
  </div>
);

export default CaseHoreca;
