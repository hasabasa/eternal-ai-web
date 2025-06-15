
import React from "react";
import { Briefcase, Clock, TrendingUp } from "lucide-react";

const CaseServices: React.FC = () => (
  <div className="max-w-6xl mx-auto px-8 animate-fade-in">
    <div className="text-center mb-16">
      <div className="flex items-center justify-center gap-6 mb-8">
        <Briefcase className="w-14 h-14 text-brand-orange" />
        <span className="px-8 py-3 bg-brand-orange/20 text-brand-orange rounded-full text-xl font-semibold">
          Услуги
        </span>
      </div>
      <h2 className="text-5xl lg:text-6xl font-bold mb-8 text-brand-darkBlue">
        Личный ассистент
      </h2>
      <p className="text-2xl lg:text-3xl text-gray-600 max-w-5xl mx-auto">
        ИИ-помощник освободил 20 часов в неделю для стратегических задач
      </p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-12 mb-16">
      {/* Проблема */}
      <div className="bg-red-50/70 rounded-3xl border border-red-200/50 p-12 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-6 h-6 bg-red-500 rounded-full"></div>
          <h3 className="font-bold text-2xl text-red-700">Проблема</h3>
        </div>
        <p className="text-xl text-gray-700 mb-8">
          Руководитель тонул в рутинных задачах и переписках
        </p>
        <div className="flex items-center gap-4 text-lg text-red-600">
          <Clock className="w-7 h-7" />
          <span>60+ часов рутины</span>
        </div>
      </div>

      {/* Решение */}
      <div className="bg-blue-50/70 rounded-3xl border border-blue-200/50 p-12 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
          <h3 className="font-bold text-2xl text-blue-700">Решение</h3>
        </div>
        <p className="text-xl text-gray-700 mb-8">
          ИИ-помощник: управление календарём, обработка входящих
        </p>
        <div className="text-lg text-blue-600">
          Планирование и контроль дедлайнов
        </div>
      </div>

      {/* Результат */}
      <div className="bg-green-50/70 rounded-3xl border border-green-200/50 p-12 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-8">
          <TrendingUp className="w-8 h-8 text-green-600" />
          <h3 className="font-bold text-2xl text-green-700">Результат</h3>
        </div>
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-green-600">+20ч</div>
            <div className="text-xl text-gray-600">Времени/неделю</div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-green-600">+40%</div>
            <div className="text-xl text-gray-600">Продуктивность</div>
          </div>
        </div>
      </div>
    </div>

    {/* Отзыв */}
    <div className="bg-brand-purple/10 rounded-3xl p-12 border-l-8 border-brand-purple">
      <div className="text-center">
        <p className="text-brand-darkBlue italic mb-6 leading-relaxed text-2xl lg:text-3xl">
          "ИИ стал моей правой рукой. Теперь я занимаюсь стратегией, а не рутиной."
        </p>
        <div className="text-xl text-brand-purple font-semibold">
          — Руководитель компании
        </div>
      </div>
    </div>
  </div>
);

export default CaseServices;
