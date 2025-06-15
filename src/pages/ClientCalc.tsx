
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const ClientCalc = () => {
  const [amount, setAmount] = useState('');
  const [percent, setPercent] = useState('');
  const [result, setResult] = useState<null | number>(null);

  const handleCalc = () => {
    const num = parseFloat(amount.replace(',', '.'));
    const pct = parseFloat(percent.replace(',', '.'));
    if (!isNaN(num) && !isNaN(pct)) {
      setResult(num * (pct / 100));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-aurora1/30 to-aurora3/30 px-4 py-10 animate-fade-in">
      <div className="max-w-md w-full bg-white/95 rounded-2xl shadow-xl border border-muted p-8 flex flex-col items-center">
        <Check className="w-12 h-12 mb-2 text-aurora4" />
        <h2 className="font-bold text-2xl mb-6 text-center">Расчёт с клиентом</h2>
        <div className="w-full flex flex-col gap-3">
          <label className="text-md font-medium">Сумма продажи (₽)
            <input
              type="number"
              className="w-full mt-1 px-3 py-2 rounded-lg border border-muted bg-muted/40 focus:outline-none focus:ring-2 focus:ring-aurora5 transition"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Введите сумму"
              min="0"
            />
          </label>
          <label className="text-md font-medium">Процент (%)
            <input
              type="number"
              className="w-full mt-1 px-3 py-2 rounded-lg border border-muted bg-muted/40 focus:outline-none focus:ring-2 focus:ring-aurora2 transition"
              value={percent}
              onChange={e => setPercent(e.target.value)}
              placeholder="Процент"
              min="0"
              max="100"
            />
          </label>
          <button
            onClick={handleCalc}
            className="mt-4 px-6 py-2 font-medium rounded-lg bg-primary text-primary-foreground hover:bg-aurora4 transition"
          >
            Рассчитать
          </button>
          {result !== null && (
            <div className="mt-3 p-3 rounded-lg bg-aurora2/15 border border-aurora2 text-primary text-lg text-center">
              Клиенту: <span className="font-bold">{result.toLocaleString('ru-RU')} ₽</span>
            </div>
          )}
        </div>
        <Link to="/" className="mt-8 px-5 py-2 font-medium rounded-lg bg-aurora5 text-white hover:bg-aurora4 transition">
          На главную
        </Link>
      </div>
    </div>
  );
};

export default ClientCalc;
