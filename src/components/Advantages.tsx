
import React from "react";
import { Zap, TrendingUp, MessageSquare, Users, Clock, Shield } from "lucide-react";

const advantages = [
  {
    icon: <Zap className="w-8 h-8 text-aurora5 mb-3" />,
    title: "Автоматизация 24/7",
    desc: "Работает без перерывов, отпусков и больничных. Мгновенные ответы в любое время суток.",
    benefit: "Никогда не упустите клиента"
  },
  {
    icon: <Users className="w-8 h-8 text-aurora2 mb-3" />,
    title: "Снижение затрат на персонал",
    desc: "Один ИИ-ассистент заменяет 3-5 операторов. Экономия до 70% на зарплатах.",
    benefit: "Больше прибыли, меньше расходов"
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-aurora3 mb-3" />,
    title: "Интеграция в мессенджеры",
    desc: "Работает там, где уже есть ваши клиенты. Telegram, WhatsApp, Instagram Direct.",
    benefit: "Без установки приложений"
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-aurora4 mb-3" />,
    title: "Машинное обучение",
    desc: "Анализирует диалоги, изучает клиентов и становится эффективнее с каждым днём.",
    benefit: "Постоянное улучшение"
  },
  {
    icon: <Clock className="w-8 h-8 text-aurora5 mb-3" />,
    title: "Мгновенная реакция",
    desc: "Отвечает за секунды, обрабатывает несколько диалогов одновременно.",
    benefit: "Клиенты не ждут"
  },
  {
    icon: <Shield className="w-8 h-8 text-aurora2 mb-3" />,
    title: "Защита данных",
    desc: "Полное соответствие требованиям безопасности и конфиденциальности.",
    benefit: "Ваши данные в безопасности"
  }
];

const Advantages: React.FC = () => (
  <section className="max-w-6xl mx-auto my-16 md:my-24 px-4 animate-fade-in">
    <div className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">
        Почему ИИ-ассистенты эффективнее людей
      </h2>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        Мы не заменяем людей ради замены. Мы освобождаем их от рутины для творческих и стратегических задач.
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {advantages.map((item, i) => (
        <div
          key={i}
          className="bg-white/90 rounded-2xl border border-muted shadow-lg p-8 hover:shadow-xl transition-all group"
        >
          <div className="group-hover:scale-110 transition-transform">
            {item.icon}
          </div>
          <h3 className="font-bold text-xl mb-3 text-primary">
            {item.title}
          </h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {item.desc}
          </p>
          <div className="text-sm font-semibold text-aurora4 bg-aurora4/10 px-3 py-1 rounded-full inline-block">
            {item.benefit}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Advantages;
