import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calculator, ArrowLeft, DollarSign, Percent, Equal, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const departments = [
  { value: "finance", label: "Финансовый отдел" },
  { value: "sales", label: "Отдел продаж" },
  { value: "marketing", label: "Маркетинговый отдел" },
  { value: "it", label: "IT-отдел" },
  { value: "hr", label: "HR-отдел" },
  { value: "legal", label: "Юридический отдел" },
  { value: "rnd", label: "Отдел исследований и разработок (R&D)" },
  { value: "production", label: "Производственный отдел" },
  { value: "logistics", label: "Логистический отдел" },
  { value: "procurement", label: "Отдел закупок" },
  { value: "customer_support", label: "Отдел клиентской поддержки" },
  { value: "quality", label: "Отдел качества" },
  { value: "admin", label: "Административный отдел" },
  { value: "pr", label: "PR-отдел" },
  { value: "internal_audit", label: "Отдел внутреннего аудита" },
  { value: "security", label: "Отдел безопасности" },
  { value: "risk_management", label: "Отдел управления рисками" },
  { value: "hr_work", label: "Отдел по работе с персоналом" },
  { value: "analytics", label: "Отдел аналитики" },
  { value: "corp_communications", label: "Отдел корпоративных коммуникаций" },
  { value: "project_management", label: "Отдел управления проектами" },
  { value: "export_import", label: "Отдел экспорта и импорта" },
  { value: "service", label: "Сервисный отдел" },
  { value: "planning", label: "Отдел планирования" },
  { value: "operations", label: "Отдел эксплуатации" },
  { value: "hse", label: "Отдел по охране труда и технике безопасности" },
  { value: "logistics_warehousing", label: "Отдел логистики и складирования" },
  { value: "foreign_trade", label: "Отдел внешнеэкономической деятельности (ВЭД)" },
  { value: "innovation", label: "Отдел инноваций" },
  { value: "supply_chain", label: "Отдел по управлению цепочками поставок" },
  { value: "asset_management", label: "Отдел управления активами" },
  { value: "transaction_support", label: "Отдел сопровождения сделок" },
  { value: "quality_control", label: "Отдел контроля качества" }
];

const ClientCalc = () => {
  // Простой калькулятор
  const [amount, setAmount] = useState('');
  const [percent, setPercent] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  // Калькулятор экономии
  const [selectedDepartment, setSelectedDepartment] = useState("sales");
  const [employees, setEmployees] = useState(50);
  const [salary, setSalary] = useState(250000);
  const [results, setResults] = useState({
    annualSalary: 0,
    efficiency: 20,
    potentialBenefitPerEmployee: 0,
    potentialBenefitAll: 0,
    finalBenefit: 0,
    roi: 0,
    profitStartDate: ""
  });

  const [activeTab, setActiveTab] = useState<'simple' | 'economy'>('simple');

  const handleCalculate = () => {
    const numAmount = parseFloat(amount.replace(/[^\d.,]/g, '').replace(',', '.'));
    const numPercent = parseFloat(percent.replace(/[^\d.,]/g, '').replace(',', '.'));
    
    if (!isNaN(numAmount) && !isNaN(numPercent) && numAmount > 0 && numPercent >= 0) {
      const calculatedResult = (numAmount * numPercent) / 100;
      setResult(calculatedResult);
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setAmount('');
    setPercent('');
    setResult(null);
    setIsCalculated(false);
  };

  const calculateResults = () => {
    const annualSalary = employees * salary * 12;
    const potentialBenefitPerEmployee = salary * 12 * 0.2; // 20% экономия времени
    const potentialBenefitAll = potentialBenefitPerEmployee * employees;
    const developmentCost = 500000;
    const platformCost = 180000;
    const totalCost = developmentCost + platformCost;
    const finalBenefit = potentialBenefitAll - totalCost;
    const roi = Math.round((finalBenefit / totalCost) * 100);
    
    // Дата начала получения выгоды (через 3 месяца)
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() + 3);
    const profitStartDate = startDate.toLocaleDateString('ru-RU');

    setResults({
      annualSalary,
      efficiency: 20,
      potentialBenefitPerEmployee,
      potentialBenefitAll,
      finalBenefit,
      roi,
      profitStartDate
    });
  };

  useEffect(() => {
    calculateResults();
  }, [employees, salary]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-purple/10 via-white to-brand-orange/10 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-orange rounded-full mb-4 shadow-lg">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-brand-darkBlue mb-2">
            Расчёт с клиентом
          </h1>
          <p className="text-gray-600">
            Выберите тип расчёта для работы с клиентами
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-lg border">
            <button
              onClick={() => setActiveTab('simple')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'simple'
                  ? 'bg-brand-orange text-white shadow-md'
                  : 'text-gray-600 hover:text-brand-orange'
              }`}
            >
              Простой калькулятор
            </button>
            <button
              onClick={() => setActiveTab('economy')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'economy'
                  ? 'bg-brand-orange text-white shadow-md'
                  : 'text-gray-600 hover:text-brand-orange'
              }`}
            >
              Калькулятор экономии ИИ
            </button>
          </div>
        </div>

        {/* Simple Calculator */}
        {activeTab === 'simple' && (
          <div className="max-w-md mx-auto">
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-center text-brand-darkBlue">
                  Калькулятор процентов
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-brand-orange" />
                    Сумма продажи
                  </label>
                  <Input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Введите сумму"
                    className="text-lg h-12 border-2 focus:border-brand-orange"
                  />
                </div>

                {/* Percent Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Percent className="w-4 h-4 text-brand-purple" />
                    Процент
                  </label>
                  <Input
                    type="text"
                    value={percent}
                    onChange={(e) => setPercent(e.target.value)}
                    placeholder="Введите процент"
                    className="text-lg h-12 border-2 focus:border-brand-purple"
                  />
                </div>

                {/* Calculate Button */}
                <Button
                  onClick={handleCalculate}
                  className="w-full h-12 text-lg bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold shadow-lg"
                  disabled={!amount || !percent}
                >
                  <Equal className="w-5 h-5 mr-2" />
                  Рассчитать
                </Button>

                {/* Result */}
                {isCalculated && result !== null && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border-l-4 border-green-500 animate-fade-in">
                    <div className="text-center">
                      <p className="text-sm text-green-700 font-medium mb-1">
                        Результат расчёта:
                      </p>
                      <p className="text-2xl font-bold text-green-800">
                        {formatNumber(result)} ₸
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        {percent}% от {formatNumber(parseFloat(amount.replace(/[^\d.,]/g, '').replace(',', '.')))} ₸
                      </p>
                    </div>
                  </div>
                )}

                {/* Reset Button */}
                {isCalculated && (
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="w-full border-2 border-gray-300 hover:border-brand-purple hover:text-brand-purple"
                  >
                    Новый расчёт
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Economy Calculator */}
        {activeTab === 'economy' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Левая часть - настройки */}
            <Card className="bg-white/80 shadow-xl border border-white/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-brand-darkBlue">Параметры расчёта</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Выбор отдела */}
                <div>
                  <label className="block text-sm font-semibold text-brand-darkBlue mb-2">
                    Наименование отдела
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all"
                  >
                    {departments.map((dept) => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Количество сотрудников */}
                <div>
                  <label className="block text-sm font-semibold text-brand-darkBlue mb-2">
                    Кол-во сотрудников в отделе: <span className="text-brand-orange">{employees}</span>
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={employees}
                      onChange={(e) => setEmployees(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #FE9C2D 0%, #FE9C2D ${employees}%, #e5e7eb ${employees}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1</span>
                      <span>100</span>
                    </div>
                  </div>
                </div>

                {/* Зарплата */}
                <div>
                  <label className="block text-sm font-semibold text-brand-darkBlue mb-2">
                    Средний уровень заработной платы одного сотрудника <span className="text-gray-500">(в рублях)</span>: <span className="text-brand-orange">{formatNumber(salary)}</span>
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="10000"
                      max="500000"
                      step="10000"
                      value={salary}
                      onChange={(e) => setSalary(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #FE9C2D 0%, #FE9C2D ${((salary - 10000) / (500000 - 10000)) * 100}%, #e5e7eb ${((salary - 10000) / (500000 - 10000)) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>10 000</span>
                      <span>500 000</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={calculateResults}
                  className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  Рассчитать
                </Button>
              </CardContent>
            </Card>

            {/* Правая часть - результаты */}
            <Card className="bg-white/80 shadow-xl border border-white/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-brand-darkBlue flex items-center gap-2">
                  <span>Результат:</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Годовая зарплата */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Годовая зарплата сотрудников отдела:</h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-brand-darkBlue">{formatNumber(results.annualSalary)}</span>
                      <span className="text-sm text-gray-500">₽/год</span>
                    </div>
                  </div>

                  {/* Экономия времени */}
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Экономия времени с AI-ботом:</h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-blue-600">{results.efficiency}</span>
                      <span className="text-sm text-gray-500">%</span>
                    </div>
                  </div>

                  {/* Потенциальная выгода на 1 сотрудника */}
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Потенциальная выгода на 1 сотрудника с AI-ботом, в год:</h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-green-600">{formatNumber(results.potentialBenefitPerEmployee)}</span>
                      <span className="text-sm text-gray-500">₽/год</span>
                    </div>
                  </div>

                  {/* Потенциальная выгода на всех */}
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Потенциальная выгода на всех сотрудников с AI-ботом, в год:</h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-green-600">{formatNumber(results.potentialBenefitAll)}</span>
                      <span className="text-sm text-gray-500">₽/год</span>
                    </div>
                  </div>

                  {/* Стоимость разработки */}
                  <div className="bg-orange-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Стоимость разработки AI-бота «ПОД КЛЮЧ»:</h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-brand-orange">500 000</span>
                      <span className="text-sm text-gray-500">₽</span>
                    </div>
                  </div>

                  {/* Тариф платформы */}
                  <div className="bg-purple-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Тариф «Стоимость доступа к платформе», в год:</h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-brand-purple">180 000</span>
                      <span className="text-sm text-gray-500">₽/год</span>
                    </div>
                  </div>

                  {/* Итоговая выгода */}
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border-l-4 border-green-500">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="text-sm font-semibold text-green-700">Итоговая выгода в год:</h4>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-green-600">{formatNumber(results.finalBenefit)}</span>
                      <span className="text-sm text-gray-500">₽/год</span>
                    </div>
                  </div>

                  {/* ROI */}
                  <div className="bg-gradient-to-r from-brand-purple/10 to-brand-purple/20 rounded-xl p-4 border-l-4 border-brand-purple">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-brand-purple" />
                      <h4 className="text-sm font-semibold text-brand-purple">ROI, %:</h4>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-brand-purple">{results.roi}</span>
                      <span className="text-sm text-gray-500">%</span>
                    </div>
                  </div>

                  {/* Дата старта */}
                  <div className="bg-gradient-to-r from-brand-orange/10 to-brand-orange/20 rounded-xl p-4 border-l-4 border-brand-orange">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-brand-orange" />
                      <h4 className="text-sm font-semibold text-brand-orange">Возможный старт получения выгоды:</h4>
                    </div>
                    <div className="text-2xl font-bold text-brand-orange">{results.profitStartDate}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link to="/">
            <Button
              variant="ghost"
              className="text-brand-darkBlue hover:text-brand-orange hover:bg-brand-orange/10"
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