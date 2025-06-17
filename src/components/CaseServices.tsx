
import React from "react";
import { User, TrendingUp, Clock } from "lucide-react";

const CaseServices: React.FC = () => (
  <div className="w-full max-w-5xl mx-auto px-4">
    <div className="text-center mb-6">
      <div className="flex items-center justify-center gap-3 mb-4">
        <User className="w-8 h-8 text-brand-darkBlue" />
        <span className="px-4 py-2 bg-brand-darkBlue/20 text-brand-darkBlue rounded-full text-sm font-semibold">
          Услуги
        </span>
      </div>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-brand-darkBlue">
        Личный ассистент
      </h2>
      <p className="text-sm sm:text-base text-gray-600">
        Управление календарём и задачами руководителя
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
          Руководитель тонул в задачах и переписках
        </p>
        <div className="flex items-center gap-2 text-sm text-red-600">
          <Clock className="w-4 h-4" />
          <span>60+ часов в неделю</span>
        </div>
      </div>
      
      {/* Решение */}
      <div className="bg-blue-50/70 rounded-xl border border-blue-200/50 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <h3 className="font-bold text-base text-blue-700">Решение</h3>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          ИИ-помощник для управления календарём и задачами
        </p>
        <div className="text-sm text-blue-600">
          Фильтрация входящих сообщений
        </div>
      </div>
      
      {/* Результат */}
      <div className="bg-green-50/70 rounded-xl border border-green-200/50 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <h3 className="font-bold text-base text-green-700">Результат</h3>
        </div>
        <div className="space-y-2">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">+20</div>
            <div className="text-sm text-gray-600">Часов в неделю</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">40%</div>
            <div className="text-sm text-gray-600">Рост продуктивности</div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Отзыв */}
    <div className="bg-brand-darkBlue/10 rounded-xl p-4 border-l-4 border-brand-darkBlue">
      <div className="text-center">
        <p className="text-brand-darkBlue italic mb-3 leading-relaxed text-sm sm:text-base">
          "ИИ стал моей правой рукой. Теперь я занимаюсь только стратегией."
        </p>
        <div className="text-sm text-brand-darkBlue font-semibold">
          — Руководитель компании
        </div>
      </div>
    </div>
  </div>
);

export default CaseServices;
