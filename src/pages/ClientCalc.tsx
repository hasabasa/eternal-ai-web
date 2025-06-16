import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, ArrowLeft, AlertTriangle, Settings, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const ClientCalc = () => {
  const [activeTab, setActiveTab] = useState('economy'); // 'economy' или 'development'
  
  // Состояние для калькулятора экономии
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

  // Состояние для калькулятора разработки
  const [socialNetworks, setSocialNetworks] = useState({
    instagram: false,
    telegram: false,
    threads: false,
    whatsapp: false
  });
  const [imageProcessing, setImageProcessing] = useState(false);
  const [googleSheets, setGoogleSheets] = useState(false);
  const [crmIntegration, setCrmIntegration] = useState(false);
  const [salesAnalysis, setSalesAnalysis] = useState(false);

  const calculateResults = () => {
    const numEmployees = parseInt(employees);
    const numMonthlySalary = parseFloat(monthlySalary.replace(/[^\d.,]/g, '').replace(',', '.'));
    
    if (isNaN(numEmployees) || isNaN(numMonthlySalary) || numEmployees <= 0 || numMonthlySalary <= 0) {
      return;
    }

    const totalHumanCostMonthly = numMonthlySalary * numEmployees;
    const totalHumanCostAnnual = totalHumanCostMonthly * 12;
    const aiCost = 500000;
    
    const annualSavings = totalHumanCostAnnual - aiCost;
    const monthlySavings = annualSavings / 12;
    const roi = (annualSavings / aiCost) * 100;
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

  // Расчет стоимости разработки
  const calculateDevelopmentCost = () => {
    let totalCost = 0;
    
    // Подсчет социальных сетей
    const selectedNetworks = Object.values(socialNetworks).filter(Boolean).length;
    if (selectedNetworks > 0) {
      totalCost += 250000; // Первая соц сеть
      if (selectedNetworks > 1) {
        totalCost += 100000; // Вторая соц сеть
      }
      if (selectedNetworks > 2) {
        totalCost += 50000; // Третья соц сеть
      }
      if (selectedNetworks > 3) {
        totalCost += 50000; // Четвертая соц сеть
      }
    }
    
    // Дополнительные функции
    if (imageProcessing) totalCost += 170000;
    if (googleSheets) totalCost += 50000;
    if (crmIntegration) totalCost += 120000;
    if (salesAnalysis) totalCost += 200000;
    
    return totalCost;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Math.abs(num));
  };

  const handleSocialNetworkChange = (network: string, checked: boolean) => {
    setSocialNetworks(prev => ({
      ...prev,
      [network]: checked
    }));
  };

  const selectedNetworksCount = Object.values(socialNetworks).filter(Boolean).length;
  const developmentCost = calculateDevelopmentCost();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-orange rounded-full mb-3">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-brand-darkBlue mb-2">
            Калькуляторы ИИ-решений
          </h1>
          <p className="text-gray-600">
            Рассчитайте экономию и стоимость разработки ИИ-ассистента
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setActiveTab('economy')}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                activeTab === 'economy'
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'text-gray-600 hover:text-brand-orange'
              }`}
            >
              Калькулятор экономии
            </button>
            <button
              onClick={() => setActiveTab('development')}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                activeTab === 'development'
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'text-gray-600 hover:text-brand-orange'
              }`}
            >
              Стоимость разработки
            </button>
          </div>
        </div>

        {/* Economy Calculator */}
        {activeTab === 'economy' && (
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
        )}

        {/* Development Cost Calculator */}
        {activeTab === 'development' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Левая часть - конфигурация */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-brand-orange" />
                <h3 className="text-lg font-semibold text-brand-darkBlue">Конфигурация ИИ-ассистента</h3>
              </div>
              
              <div className="space-y-6">
                {/* Социальные сети */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Социальные сети</h4>
                  <div className="space-y-3">
                    {[
                      { key: 'instagram', label: 'Instagram', icon: '📷' },
                      { key: 'telegram', label: 'Telegram', icon: '✈️' },
                      { key: 'threads', label: 'Threads', icon: '🧵' },
                      { key: 'whatsapp', label: 'WhatsApp', icon: '💬' }
                    ].map((network) => (
                      <div key={network.key} className="flex items-center space-x-3">
                        <Checkbox
                          id={network.key}
                          checked={socialNetworks[network.key as keyof typeof socialNetworks]}
                          onCheckedChange={(checked) => 
                            handleSocialNetworkChange(network.key, checked as boolean)
                          }
                        />
                        <label 
                          htmlFor={network.key}
                          className="text-sm font-medium text-gray-700 cursor-pointer flex items-center gap-2"
                        >
                          <span>{network.icon}</span>
                          {network.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  {selectedNetworksCount > 0 && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-blue-700">
                        <div>• 1-я соц. сеть: <span className="font-semibold">250,000 ₸</span></div>
                        {selectedNetworksCount > 1 && (
                          <div>• 2-я соц. сеть: <span className="font-semibold">+100,000 ₸</span></div>
                        )}
                        {selectedNetworksCount > 2 && (
                          <div>• 3-я соц. сеть: <span className="font-semibold">+50,000 ₸</span></div>
                        )}
                        {selectedNetworksCount > 3 && (
                          <div>• 4-я соц. сеть: <span className="font-semibold">+50,000 ₸</span></div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Дополнительные функции */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Дополнительные функции</h4>
                  <div className="space-y-4">
                    {/* Обработка изображений */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Checkbox
                          id="imageProcessing"
                          checked={imageProcessing}
                          onCheckedChange={setImageProcessing}
                        />
                        <label htmlFor="imageProcessing" className="font-medium text-gray-700 cursor-pointer">
                          🖼️ Обработка изображений
                        </label>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">
                        ИИ сможет анализировать и обрабатывать изображения от клиентов
                      </p>
                      {imageProcessing && (
                        <div className="mt-2 ml-6 text-sm font-semibold text-brand-orange">
                          +170,000 ₸
                        </div>
                      )}
                    </div>

                    {/* Google Таблицы */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Checkbox
                          id="googleSheets"
                          checked={googleSheets}
                          onCheckedChange={setGoogleSheets}
                        />
                        <label htmlFor="googleSheets" className="font-medium text-gray-700 cursor-pointer">
                          📊 Интеграция с Google Таблицами
                        </label>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">
                        Автоматическое заполнение и обновление данных в таблицах
                      </p>
                      {googleSheets && (
                        <div className="mt-2 ml-6 text-sm font-semibold text-brand-orange">
                          +50,000 ₸
                        </div>
                      )}
                    </div>

                    {/* CRM системы */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Checkbox
                          id="crmIntegration"
                          checked={crmIntegration}
                          onCheckedChange={setCrmIntegration}
                        />
                        <label htmlFor="crmIntegration" className="font-medium text-gray-700 cursor-pointer">
                          🔗 Интеграция с CRM системами
                        </label>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">
                        Синхронизация с популярными CRM системами (AmoCRM, Битрикс24, и др.)
                      </p>
                      {crmIntegration && (
                        <div className="mt-2 ml-6 text-sm font-semibold text-brand-orange">
                          +120,000 ₸
                        </div>
                      )}
                    </div>

                    {/* Анализ продаж */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Checkbox
                          id="salesAnalysis"
                          checked={salesAnalysis}
                          onCheckedChange={setSalesAnalysis}
                        />
                        <label htmlFor="salesAnalysis" className="font-medium text-gray-700 cursor-pointer">
                          📈 Анализ продаж от ИИ
                        </label>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">
                        Собирает базу данных клиентов, делает регулярные рассылки, 
                        дополнительные продажи и сохраняет лояльность клиентов
                      </p>
                      {salesAnalysis && (
                        <div className="mt-2 ml-6 text-sm font-semibold text-brand-orange">
                          +200,000 ₸
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Правая часть - итоговая стоимость */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-brand-darkBlue mb-4">
                Итоговая стоимость разработки
              </h3>

              {developmentCost === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Выберите конфигурацию для расчета стоимости</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Детализация стоимости */}
                  <div className="space-y-3">
                    {selectedNetworksCount > 0 && (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-sm text-blue-700 font-medium mb-1">
                          Социальные сети ({selectedNetworksCount} шт.):
                        </div>
                        <div className="text-lg font-bold text-blue-800">
                          {formatNumber(
                            250000 + 
                            (selectedNetworksCount > 1 ? 100000 : 0) +
                            (selectedNetworksCount > 2 ? 50000 : 0) +
                            (selectedNetworksCount > 3 ? 50000 : 0)
                          )} ₸
                        </div>
                      </div>
                    )}

                    {imageProcessing && (
                      <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="text-sm text-purple-700 font-medium">Обработка изображений:</div>
                        <div className="text-lg font-bold text-purple-800">170,000 ₸</div>
                      </div>
                    )}

                    {googleSheets && (
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-sm text-green-700 font-medium">Google Таблицы:</div>
                        <div className="text-lg font-bold text-green-800">50,000 ₸</div>
                      </div>
                    )}

                    {crmIntegration && (
                      <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="text-sm text-orange-700 font-medium">CRM интеграция:</div>
                        <div className="text-lg font-bold text-orange-800">120,000 ₸</div>
                      </div>
                    )}

                    {salesAnalysis && (
                      <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="text-sm text-red-700 font-medium">Анализ продаж:</div>
                        <div className="text-lg font-bold text-red-800">200,000 ₸</div>
                      </div>
                    )}
                  </div>

                  {/* Итоговая стоимость */}
                  <div className="p-6 bg-gradient-to-r from-brand-orange/10 to-brand-purple/10 rounded-lg border-2 border-brand-orange">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-brand-orange mb-2">
                        💰 ИТОГОВАЯ СТОИМОСТЬ РАЗРАБОТКИ:
                      </div>
                      <div className="text-3xl font-bold text-brand-darkBlue">
                        {formatNumber(developmentCost)} ₸
                      </div>
                      <div className="text-sm text-gray-600 mt-2">
                        Единоразовая оплата «под ключ»
                      </div>
                    </div>
                  </div>

                  {/* Дополнительная информация */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Что входит в стоимость:</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>Полная настройка ИИ-ассистента</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>Обучение на ваших данных</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>Тестирование и запуск</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>Техническая поддержка 30 дней</span>
                      </div>
                    </div>
                  </div>

                  {/* Дополнительные расходы */}
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="text-sm text-yellow-800">
                      <span className="font-semibold">⚠️ Не забудьте:</span> Ежегодная плата за доступ к платформе составляет <span className="font-semibold">180,000 ₸/год</span>
                    </div>
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