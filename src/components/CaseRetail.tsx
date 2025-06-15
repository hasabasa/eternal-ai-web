
import React from "react";
import { Flower, TrendingUp, Users, Clock } from "lucide-react";

const CaseRetail: React.FC = () => (
  <div className="max-w-6xl mx-auto px-4 animate-fade-in">
    <div className="text-center mb-6 md:mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Flower className="w-8 h-8 md:w-12 md:h-12 text-brand-orange" />
        <span className="px-3 md:px-4 py-1 md:py-2 bg-brand-orange/20 text-brand-orange rounded-full text-sm md:text-base font-semibold">
          Ритейл
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-brand-darkBlue">
        Цветочный бизнес
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
        Как ИИ-ассистент увеличил продажи цветочного магазина на 150%
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
          60% лидов терялись из-за медленных ответов операторов. Клиенты не хотели ждать и уходили к конкурентам.
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm md:text-base text-red-600">
            <Clock className="w-4 h-4" />
            <span>Время ответа: 15+ минут</span>
          </div>
          <div className="flex items-center gap-2 text-sm md:text-base text-red-600">
            <Users className="w-4 h-4" />
            <span>Потеря 6 из 10 потенциальных клиентов</span>
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
          ИИ-ассистент: мгновенные ответы, обработка фото букетов, автоматический расчёт стоимости.
        </p>
        <div className="space-y-2">
          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm font-medium inline-block mr-2">
            Мгновенные ответы 24/7
          </div>
          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm font-medium inline-block mr-2">
            Обработка фото букетов
          </div>
          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm font-medium inline-block">
            Автоматический расчёт
          </div>
        </div>
      </div>
    </div>

    {/* Результаты */}
    <div className="bg-green-50/70 rounded-2xl md:rounded-3xl border border-green-200/50 shadow-lg p-4 md:p-6 lg:p-8 backdrop-blur-sm mb-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-green-700">Результаты</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="text-center p-4 bg-white/50 rounded-xl">
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 mb-2">+90%</div>
          <div className="text-sm md:text-base text-gray-600">Увеличение конверсии</div>
        </div>
        <div className="text-center p-4 bg-white/50 rounded-xl">
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 mb-2">80%</div>
          <div className="text-sm md:text-base text-gray-600">Автоматизация обращений</div>
        </div>
        <div className="text-center p-4 bg-white/50 rounded-xl">
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 mb-2">+150%</div>
          <div className="text-sm md:text-base text-gray-600">Рост продаж</div>
        </div>
      </div>
    </div>

    {/* Отзыв */}
    <div className="bg-brand-purple/10 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border-l-4 md:border-l-8 border-brand-purple">
      <div className="text-center">
        <div className="text-4xl md:text-6xl text-brand-purple/20 mb-4">"</div>
        <p className="text-base md:text-lg lg:text-xl text-brand-darkBlue italic mb-4 max-w-2xl mx-auto leading-relaxed">
          ИИ работает лучше менеджера. Клиенты довольны скоростью и точностью. Теперь мы обрабатываем заказы круглосуточно без выходных.
        </p>
        <div className="text-sm md:text-base text-brand-purple font-semibold">
          — Владелец цветочного магазина
        </div>
      </div>
    </div>
  </div>
);

export default CaseRetail;
