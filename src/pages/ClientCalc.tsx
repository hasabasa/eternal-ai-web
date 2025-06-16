import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ClientCalc = () => {
  const [employees, setEmployees] = useState('');
  const [salary, setSalary] = useState('');
  const [results, setResults] = useState({
    annualSavings: 0,
    monthlySavings: 0,
    roi: 0
  });
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateResults = () => {
    const numEmployees = parseInt(employees);
    const numSalary = parseFloat(salary.replace(/[^\d.,]/g, '').replace(',', '.'));
    
    if (isNaN(numEmployees) || isNaN(numSalary) || numEmployees <= 0 || numSalary <= 0) {
      return;
    }

    // Формулы расчета согласно вашему описанию:
    const total_human_cost = numSalary * numEmployees;
    const savings = total_human_cost - 500000;
    const monthly_savings = savings / 12;
    const roi = (savings / 500000) * 100;

    setResults({
      annualSavings: savings,
      monthlySavings: monthly_savings,
      roi: roi
    });
    setIsCalculated(true);
  };

  const handleReset = () => {
    setEmployees('');
    setSalary('');
    setResults({
      annualSavings: 0,
      monthlySavings: 0,
      roi: 0
    });
    setIsCalculated(false);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
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
                  Зарплата одного сотрудника в год (₸)
                </label>
                <Input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="Введите годовую зарплату"
                  className="w-full h-10 border border-gray-300 rounded-md"
                />
              </div>

              <Button
                onClick={calculateResults}
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-medium py-2"
                disabled={!employees || !salary}
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
              /* Таблица результатов */
              <div className="space-y-1">
                <div className="grid grid-cols-2 py-3 border-b border-green-200 bg-green-50">
                  <span className="text-sm font-semibold text-green-700">Годовая экономия:</span>
                  <span className="text-lg font-bold text-right text-green-600">{formatNumber(results.annualSavings)} ₸</span>
                </div>
                
                <div className="grid grid-cols-2 py-3 border-b border-blue-200 bg-blue-50">
                  <span className="text-sm font-semibold text-blue-700">Ежемесячная экономия:</span>
                  <span className="text-lg font-bold text-right text-blue-600">{formatNumber(results.monthlySavings)} ₸</span>
                </div>
                
                <div className="grid grid-cols-2 py-3 border-b border-purple-200 bg-purple-50">
                  <span className="text-sm font-semibold text-purple-700">ROI в процентах:</span>
                  <span className="text-lg font-bold text-right text-purple-600">{formatNumber(results.roi)}%</span>
                </div>
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