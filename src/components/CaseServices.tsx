
import React from "react";
import { Briefcase, Clock, Target, TrendingUp } from "lucide-react";

const CaseServices: React.FC = () => (
  <div className="max-w-6xl mx-auto px-4 animate-fade-in">
    <div className="text-center mb-8 md:mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-brand-orange" />
        <span className="px-3 py-1 bg-brand-orange/20 text-brand-orange rounded-full text-sm font-semibold">
          Услуги
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-brand-darkBlue">
        Личный ассистент
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
        ИИ-помощник освободил 20 часов в неделю для стратегических задач
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {/* Проблема */}
      <div className="bg-red-50/70 rounded-2xl border border-red-200/50 shadow-lg p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <h3 className="text-lg md:text-xl font-bold text-red-700">Проблема</h3>
        </div>
        <p className="text-base text-gray-700 leading-relaxed mb-4">
          Руководитель тонул в рутинных задачах и переписках. Нет времени на стратегическое развитие бизнеса.
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-red-600">
            <Clock className="w-4 h-4" />
            <span>60+ часов рутины в неделю</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-red-600">
            <Target className="w-4 h-4" />
            <span>Пропущенные дедлайны</span>
          </div>
        </div>
      </div>

      {/* Решение */}
      <div className="bg-blue-50/70 rounded-2xl border border-blue-200/50 shadow-lg p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <h3 className="text-lg md:text-xl font-bold text-blue-700">Решение</h3>
        </div>
        <p className="text-base text-gray-700 leading-relaxed mb-4">
          ИИ-помощник: управление календарём, обработка входящих сообщений, планирование задач.
        </p>
        <div className="space-y-2">
          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium inline-block mr-2">
            Управление календарём
          </div>
          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium inline-block mr-2">
            Фильтрация сообщений
          </div>
          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium inline-block">
            Контроль дедлайнов
          </div>
        </div>
      </div>
    </div>

    {/* Результаты */}
    <div className="bg-green-50/70 rounded-2xl border border-green-200/50 shadow-lg p-6 backdrop-blur-sm mb-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-green-600" />
        <h3 className="text-lg md:text-xl font-bold text-green-700">Результаты</h3>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-white/50 rounded-xl">
          <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">+20ч</div>
          <div className="text-sm text-gray-600">Времени в неделю</div>
        </div>
        <div className="text-center p-4 bg-white/50 rounded-xl">
          <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">100%</div>
          <div className="text-sm text-gray-600">Контроль дедлайнов</div>
        </div>
        <div className="text-center p-4 bg-white/50 rounded-xl">
          <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">+40%</div>
          <div className="text-sm text-gray-600">Рост продуктивности</div>
        </div>
      </div>
    </div>

    {/* Отзыв */}
    <div className="bg-brand-purple/10 rounded-2xl p-6 border-l-4 border-brand-purple">
      <div className="text-center">
        <div className="text-4xl text-brand-purple/20 mb-4">"</div>
        <p className="text-lg text-brand-darkBlue italic mb-4 max-w-2xl mx-auto leading-relaxed">
          ИИ стал моей правой рукой. Теперь я занимаюсь стратегией, а не рутиной. Продуктивность выросла в разы.
        </p>
        <div className="text-sm text-brand-purple font-semibold">
          — Руководитель компании
        </div>
      </div>
    </div>
  </div>
);

export default CaseServices;
