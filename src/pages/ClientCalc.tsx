import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ClientCalc = () => {
  const [employees, setEmployees] = useState('');
  const [monthlySalary, setMonthlySalary] = useState('');
  const [results, setResults] = useState({
    totalHumanCostMonthly: 0,
    totalHumanCostAnnual: 0,
    annualSavings: 0,
    monthlySavings: 0,
    roi: 0,
    isProfit: true
  });
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateResults = () => {
    const numEmployees = parseInt(employees);
    const numMonthlySalary = parseFloat(monthlySalary.replace(/[^\d.,]/g, '').replace(',', '.'));
    
    if (isNaN(numEmployees) || isNaN(numMonthlySalary) || numEmployees <= 0 || numMonthlySalary <= 0) {
      return;
    }

    // Формулы расчета:
    const totalHumanCostMonthly = numMonthlySalary * numEmployees; // месячные затраты на людей
    const totalHumanCostAnnual = totalHumanCostMonthly * 12; // годовые затраты на людей
    const aiCost = 500000; // стоимость ИИ (единоразово)
    
    const annualSavings = totalHumanCostAnnual - aiCost; // годовая экономия
    const monthlySavings = annualSavings / 12; // месячная экономия
    const roi = (annualSavings / aiCost) * 100; // ROI в процентах
    const isProfit = annualSavings > 0;

    setResults({
      totalHumanCostMonthly,
      totalHumanCostAnnual,
      annualSavings,
      monthlySavings,
      roi,
      isProfit
    });
    setIsCalculated(true);
  };

  const handleReset = () => {
    setEmployees('');
    setMonthlySalary('');
    setResults({
      totalHumanCostMonthly: 0,
      totalHumanCostAnnual: 0,
      annualSavings: 0,
      monthlySavings: 0,
      roi: 0,
      isProfit: true
    });
    setIsCalculated(false);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Math.abs(num));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-orange rounded-full mb-3">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-brand-darkBlue mb-2">
            Калькулятор экономии ИИ
          </h1>
          <p className="text-gray-600">
            Рассчитайте выгоду от внедрения ИИ-ассистента
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Левая часть - настройки */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-brand-darkBlue mb-4">Параметры расчёта</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Количество сотрудников
                </label>
                <Input
                  type="number"
                  value={employees}
                  onChange={(e) => setEmployees(e.target.value)}
                  placeholder="Введите количество сотрудников"
                  min="1"
                  max="1000"
                  className="w-full h-10 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Зарплата одного сотрудника в месяц (₸)
                </label>
                <Input
                  type="text"
                  value={monthlySalary}
                  onChange={(e) => setMonthlySalary(e.target.value)}
                  placeholder="Введите месячную зарплату"
                  className="w-full h-10 border border-gray-300 rounded-md"
                />
              </div>

              <Button
                onClick={calculateResults}
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-medium py-2"
                disabled={!employees || !monthlySalary}
              >
                Рассчитать
              </Button>

              {isCalculated && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full border border-gray-300"
                >
                  Новый расчёт
                </Button>
              )}
            </div>

            {/* Информация о стоимости ИИ */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Стоимость ИИ-решения:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>• Разработка ИИ-бота «ПОД КЛЮЧ»: <span className="font-semibold">500,000 ₸</span> (единоразово)</div>
                <div>• Тариф доступа к платформе: <span className="font-semibold">180,000 ₸/год</span></div>
              </div>
            </div>
          </div>

          {/* Правая часть - результаты */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-brand-darkBlue mb-4">
              Результат:
            </h3>

            {!isCalculated ? (
              <div className="text-center py-8 text-gray-500">
                <p>Заполните параметры и нажмите "Рассчитать"</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Затраты на людей */}
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-700 font-medium">Затраты на сотрудников в месяц:</div>
                    <div className="text-lg font-bold text-blue-800">{formatNumber(results.totalHumanCostMonthly)} ₸</div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-700 font-medium">Затраты на сотрудников в год:</div>
                    <div className="text-lg font-bold text-blue-800">{formatNumber(results.totalHumanCostAnnual)} ₸</div>
                  </div>
                </div>

                {/* Предупреждение если ИИ невыгоден */}
                {!results.isProfit && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-700 mb-2">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="font-semibold">Внимание!</span>
                    </div>
                    <p className="text-sm text-red-600">
                      При данных параметрах ИИ-решение будет дороже содержания сотрудников. 
                      Рекомендуем увеличить количество сотрудников или их зарплату для получения экономии.
                    </p>
                  </div>
                )}

                {/* Основные результаты */}
                <div className="space-y-3">
                  <div className={`p-4 rounded-lg border-2 ${
                    results.isProfit 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-red-300 bg-red-50'
                  }`}>
                    <div className={`text-sm font-semibold mb-1 ${
                      results.isProfit ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {results.isProfit ? '💰 Экономия в месяц:' : '📉 Убытки в месяц:'}
                    </div>
                    <div className={`text-2xl font-bold ${
                      results.isProfit ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {results.isProfit ? '' : '-'}{formatNumber(results.monthlySavings)} ₸
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg border-2 ${
                    results.isProfit 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-red-300 bg-red-50'
                  }`}>
                    <div className={`text-sm font-semibold mb-1 ${
                      results.isProfit ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {results.isProfit ? '🎯 Экономия в год:' : '📉 Убытки в год:'}
                    </div>
                    <div className={`text-2xl font-bold ${
                      results.isProfit ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {results.isProfit ? '' : '-'}{formatNumber(results.annualSavings)} ₸
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg border-2 ${
                    results.roi > 0 
                      ? 'border-purple-300 bg-purple-50' 
                      : 'border-red-300 bg-red-50'
                  }`}>
                    <div className={`text-sm font-semibold mb-1 ${
                      results.roi > 0 ? 'text-purple-700' : 'text-red-700'
                    }`}>
                      📊 ROI (возврат инвестиций):
                    </div>
                    <div className={`text-2xl font-bold ${
                      results.roi > 0 ? 'text-purple-600' : 'text-red-600'
                    }`}>
                      {results.roi > 0 ? '+' : ''}{formatNumber(results.roi)}%
                    </div>
                  </div>
                </div>

                {/* Рекомендация */}
                {results.isProfit && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700">
                      <span className="font-semibold">🎉 Отличный результат!</span> ИИ-решение окупится и будет приносить стабильную экономию.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link to="/">
            <Button
              variant="ghost"
              className="text-brand-darkBlue hover:text-brand-orange"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              На главную
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientCalc;