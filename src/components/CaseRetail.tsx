
import React from "react";
import { Flower, TrendingUp, Clock } from "lucide-react";

const CaseRetail: React.FC = () => (
  <div className="max-w-5xl mx-auto px-8 animate-fade-in">
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-6 mb-8">
        <Flower className="w-12 h-12 text-brand-orange" />
        <span className="px-8 py-3 bg-brand-orange/20 text-brand-orange rounded-full text-lg font-semibold">
          Ритейл
        </span>
      </div>
      <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-brand-darkBlue">
        Цветочный бизнес
      </h2>
      <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto">
        Как ИИ-ассистент увеличил продажи на 150%
      </p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-8 mb-12">
      {/* Проблема */}
      <div className="bg-red-50/70 rounded-3xl border border-red-200/50 p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-5 h-5 bg-red-500 rounded-full"></div>
          <h3 className="font-bold text-xl text-red-700">Проблема</h3>
        </div>
        <p className="text-lg text-gray-700 mb-6">
          60% лидов терялось из-за медленных ответов операторов
        </p>
        <div className="flex items-center gap-3 text-base text-red-600">
          <Clock className="w-6 h-6" />
          <span>15+ минут ответа</span>
        </div>
      </div>

      {/* Решение */}
      <div className="bg-blue-50/70 rounded-3xl border border-blue-200/50 p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
          <h3 className="font-bold text-xl text-blue-700">Решение</h3>
        </div>
        <p className="text-lg text-gray-700 mb-6">
          ИИ-ассистент: мгновенные ответы 24/7, обработка фото букетов
        </p>
        <div className="text-base text-blue-600">
          Автоматический расчёт стоимости
        </div>
      </div>

      {/* Результат */}
      <div className="bg-green-50/70 rounded-3xl border border-green-200/50 p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-6">
          <TrendingUp className="w-7 h-7 text-green-600" />
          <h3 className="font-bold text-xl text-green-700">Результат</h3>
        </div>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-green-600">+150%</div>
            <div className="text-lg text-gray-600">Рост продаж</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-green-600">90%</div>
            <div className="text-lg text-gray-600">Конверсия</div>
          </div>
        </div>
      </div>
    </div>

    {/* Отзыв */}
    <div className="bg-brand-purple/10 rounded-3xl p-8 border-l-8 border-brand-purple">
      <div className="text-center">
        <p className="text-brand-darkBlue italic mb-6 leading-relaxed text-xl lg:text-2xl">
          "ИИ работает лучше менеджера. Клиенты довольны скоростью и точностью."
        </p>
        <div className="text-lg text-brand-purple font-semibold">
          — Владелец цветочного магазина
        </div>
      </div>
    </div>
  </div>
);

export default CaseRetail;
