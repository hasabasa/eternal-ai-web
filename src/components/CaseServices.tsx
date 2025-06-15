
import React from "react";
import { Briefcase, Clock, Target, TrendingUp } from "lucide-react";

const CaseServices: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 animate-fade-in">
    <div className="text-center mb-6">
      <div className="flex items-center justify-center gap-3 mb-3">
        <Briefcase className="w-6 h-6 text-brand-orange" />
        <span className="px-3 py-1 bg-brand-orange/20 text-brand-orange rounded-full text-sm font-semibold">
          Услуги
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-brand-darkBlue">
        Личный ассистент
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        ИИ-помощник освободил 20 часов в неделю для стратегических задач
      </p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      {/* Проблема */}
      <div className="bg-red-50/70 rounded-xl border border-red-200/50 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <h3 className="font-bold text-red-700">Проблема</h3>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          Руководитель тонул в рутинных задачах и переписках
        </p>
        <div className="flex items-center gap-2 text-xs text-red-600">
          <Clock className="w-3 h-3" />
          <span>60+ часов рутины</span>
        </div>
      </div>

      {/* Решение */}
      <div className="bg-blue-50/70 rounded-xl border border-blue-200/50 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <h3 className="font-bold text-blue-700">Решение</h3>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          ИИ-помощник: управление календарём, обработка входящих
        </p>
        <div className="text-xs text-blue-600">
          Планирование и контроль дедлайнов
        </div>
      </div>

      {/* Результат */}
      <div className="bg-green-50/70 rounded-xl border border-green-200/50 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <h3 className="font-bold text-green-700">Результат</h3>
        </div>
        <div className="space-y-2">
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">+20ч</div>
            <div className="text-xs text-gray-600">Времени/неделю</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">+40%</div>
            <div className="text-xs text-gray-600">Продуктивность</div>
          </div>
        </div>
      </div>
    </div>

    {/* Отзыв */}
    <div className="bg-brand-purple/10 rounded-xl p-4 border-l-4 border-brand-purple">
      <div className="text-center">
        <p className="text-brand-darkBlue italic mb-2 leading-relaxed">
          "ИИ стал моей правой рукой. Теперь я занимаюсь стратегией, а не рутиной."
        </p>
        <div className="text-sm text-brand-purple font-semibold">
          — Руководитель компании
        </div>
      </div>
    </div>
  </div>
);

export default CaseServices;
