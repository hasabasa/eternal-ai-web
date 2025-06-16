import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const [employees, setEmployees] = useState('');
  const [salary, setSalary] = useState('');
  const [results, setResults] = useState({
    annualSalary: 0,
    efficiency: 20,
    potentialBenefitPerEmployee: 0,
    potentialBenefitAll: 0,
    finalBenefit: 0,
    roi: 0,
    profitStartDate: ""
  });
  const [isEconomyCalculated, setIsEconomyCalculated] = useState(false);

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
    const numEmployees = parseInt(employees);
    const numSalary = parseFloat(salary.replace(/[^\d.,]/g, '').replace(',', '.'));
    
    if (isNaN(numEmployees) || isNaN(numSalary) || numEmployees <= 0 || numSalary <= 0) {
      return;
    }

    const annualSalary = numEmployees * numSalary * 12;
    const potentialBenefitPerEmployee = numSalary * 12 * 0.2; // 20% экономия времени
    const potentialBenefitAll = potentialBenefitPerEmployee * numEmployees;
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
    setIsEconomyCalculated(true);
  };

  const handleEconomyReset = () => {
    setEmployees('');
    setSalary('');
    setResults({
      annualSalary: 0,
      efficiency: 20,
      potentialBenefitPerEmployee: 0,
      potentialBenefitAll: 0,
      finalBenefit: 0,
      roi: 0,
      profitStartDate: ""
    });
    setIsEconomyCalculated(false);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-orange rounded-full mb-3">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-brand-darkBlue mb-2">
            Расчёт с клиентом
          </h1>
          <p className="text-gray-600">
            Выберите тип расчёта для работы с клиентами
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setActiveTab('simple')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'simple'
                  ? 'bg-brand-orange text-white'
                  : 'text-gray-600 hover:text-brand-orange'
              }`}
            >
              Простой калькулятор
            </button>
            <button
              onClick={() => setActiveTab('economy')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'economy'
                  ? 'bg-brand-orange text-white'
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
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-center text-brand-darkBlue mb-6">
                Калькулятор процентов
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Сумма продажи (₸)
                  </label>
                  <Input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Введите сумму"
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Процент (%)
                  </label>
                  <Input
                    type="text"
                    value={percent}
                    onChange={(e) => setPercent(e.target.value)}
                    placeholder="Введите процент"
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>

                <Button
                  onClick={handleCalculate}
                  className="w-full h-10 bg-brand-orange hover:bg-brand-orange/90 text-white font-medium"
                  disabled={!amount || !percent}
                >
                  Рассчитать
                </Button>

                {isCalculated && result !== null && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                    <div className="text-center">
                      <p className="text-sm text-green-700 mb-1">
                        Результат расчёта:
                      </p>
                      <p className="text-xl font-bold text-green-800">
                        {formatNumber(result)} ₸
                      </p>
                    </div>
                  </div>
                )}

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
          </div>
        )}

        {/* Economy Calculator - Table Style */}
        {activeTab === 'economy' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Левая часть - настройки */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-brand-darkBlue mb-4">Параметры расчёта</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Наименование отдела
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  >
                    {departments.map((dept) => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Кол-во сотрудников в отделе
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
                    Средний уровень заработной платы одного сотрудника (₸)
                  </label>
                  <Input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="Введите среднюю зарплату"
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

                {isEconomyCalculated && (
                  <Button
                    onClick={handleEconomyReset}
                    variant="outline"
                    className="w-full border border-gray-300"
                  >
                    Новый расчёт
                  </Button>
                )}
              </div>
            </div>

            {/* Правая часть - результаты в табличном стиле */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-brand-darkBlue mb-4">
                Результат:
              </h3>

              {!isEconomyCalculated ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Заполните параметры и нажмите "Рассчитать"</p>
                </div>
              ) : (
                /* Таблица результатов */
                <div className="space-y-1">
                  <div className="grid grid-cols-2 py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Годовая зарплата сотрудников отдела:</span>
                    <span className="text-sm font-medium text-right">{formatNumber(results.annualSalary)} ₸/год</span>
                  </div>
                  
                  <div className="grid grid-cols-2 py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Экономия времени с AI-ботом:</span>
                    <span className="text-sm font-medium text-right text-blue-600">{results.efficiency}%</span>
                  </div>
                  
                  <div className="grid grid-cols-2 py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Потенциальная выгода на 1 сотрудника в год:</span>
                    <span className="text-sm font-medium text-right text-green-600">{formatNumber(results.potentialBenefitPerEmployee)} ₸/год</span>
                  </div>
                  
                  <div className="grid grid-cols-2 py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Потенциальная выгода на всех сотрудников в год:</span>
                    <span className="text-sm font-medium text-right text-green-600">{formatNumber(results.potentialBenefitAll)} ₸/год</span>
                  </div>
                  
                  <div className="grid grid-cols-2 py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Стоимость разработки AI-бота «ПОД КЛЮЧ»:</span>
                    <span className="text-sm font-medium text-right text-brand-orange">500 000 ₸</span>
                  </div>
                  
                  <div className="grid grid-cols-2 py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Тариф «Стоимость доступа к платформе» в год:</span>
                    <span className="text-sm font-medium text-right text-brand-purple">180 000 ₸/год</span>
                  </div>
                  
                  {/* Ключевые результаты */}
                  <div className="grid grid-cols-2 py-3 border-b-2 border-green-200 bg-green-50">
                    <span className="text-sm font-semibold text-green-700">Итоговая выгода в год:</span>
                    <span className="text-lg font-bold text-right text-green-600">{formatNumber(results.finalBenefit)} ₸/год</span>
                  </div>
                  
                  <div className="grid grid-cols-2 py-2 border-b border-gray-100">
                    <span className="text-sm font-semibold text-brand-purple">ROI, %:</span>
                    <span className="text-lg font-bold text-right text-brand-purple">{results.roi}%</span>
                  </div>
                  
                  <div className="grid grid-cols-2 py-2">
                    <span className="text-sm font-semibold text-brand-orange">Возможный старт получения выгоды:</span>
                    <span className="text-sm font-bold text-right text-brand-orange">{results.profitStartDate}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

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