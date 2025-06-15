
import React from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

const menuItems = [
  { name: "Мой профиль", to: "/profile" },
  { name: "Расчёт с клиентом", to: "/client-calc" },
];

const BurgerMenu: React.FC = () => {
  return (
    <div className="fixed top-6 right-6 z-30">
      <Sheet>
        <SheetTrigger asChild>
          <button
            aria-label="Меню"
            className="w-12 h-12 rounded-full bg-white/80 shadow-lg flex items-center justify-center hover:scale-105 transition-all border border-muted"
          >
            <Menu size={32} className="text-primary" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64 sm:w-80 bg-white/95 shadow-xl flex flex-col gap-4 pt-8">
          <span className="text-lg font-semibold mb-2 text-primary">Меню</span>
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-4 py-2 rounded-lg hover:bg-accent transition text-md font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BurgerMenu;
