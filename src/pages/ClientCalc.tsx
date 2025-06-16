import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, ArrowLeft, DollarSign, Percent, Equal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ClientCalc = () => {
  const [amount, setAmount] = useState('');
  const [percent, setPercent] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-purple/10 via-white to-brand-orange/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-orange rounded-full mb-4 shadow-lg">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-brand-darkBlue mb-2">
            Расчёт с клиентом
          </h1>
          <p className="text-gray-600 text-sm">
            Быстрый расчёт процента от суммы
          </p>
        </div>

        {/* Calculator Card */}
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