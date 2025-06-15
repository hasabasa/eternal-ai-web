
import React from "react";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";

const kpi = {
  base: 60000,
  percent: 12,
  sales: 340000,
};

const calcIncome = () => {
  const percentValue = (kpi.sales * kpi.percent) / 100;
  return kpi.base + percentValue;
};

const Profile = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-aurora2/30 to-aurora4/30 px-4 py-10 animate-fade-in">
    <div className="max-w-md w-full bg-white/90 rounded-2xl shadow-xl border border-muted p-8 flex flex-col items-center">
      <Users className="w-12 h-12 mb-2 text-aurora5" />
      <h2 className="font-bold text-2xl mb-4">Мой профиль</h2>
      <div className="w-full flex flex-col gap-2 text-md">
        <div className="flex justify-between"><span>KPI за месяц</span><span>{kpi.sales.toLocaleString('ru-RU')} ₽</span></div>
        <div className="flex justify-between"><span>Базовый оклад</span><span>{kpi.base.toLocaleString('ru-RU')} ₽</span></div>
        <div className="flex justify-between"><span>Процент от продаж</span><span>{kpi.percent}%</span></div>
        <div className="flex justify-between font-semibold">
          <span>Сумма заработанных денег</span>
          <span>{calcIncome().toLocaleString('ru-RU')} ₽</span>
        </div>
        <div className="mt-2 text-muted-foreground text-sm">Общий расчёт ЗП: Оклад + процент от продаж</div>
      </div>
      <Link to="/" className="mt-6 px-5 py-2 font-medium rounded-lg bg-primary text-primary-foreground hover:bg-aurora4 transition">
        На главную
      </Link>
    </div>
  </div>
);

export default Profile;
