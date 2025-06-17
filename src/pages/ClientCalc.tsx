import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, Download, Share2, BarChart3, CheckCircle, Star } from "lucide-react";
import { CheckedState } from "@radix-ui/react-checkbox";

interface CalculationResult {
  totalCost: number;
  monthlyCost: number;
  annualCost: number;
}

const initialResult: CalculationResult = {
  totalCost: 0,
  monthlyCost: 0,
  annualCost: 0,
};

const ClientCalc = () => {
  const [pages, setPages] = useState<number>(5);
  const [design, setDesign] = useState<number>(5000);
  const [developmentComplexity, setDevelopmentComplexity] = useState<string>("средняя");
  const [supportMonths, setSupportMonths] = useState<number>(3);
  const [integration, setIntegration] = useState<boolean>(false);
  const [analytics, setAnalytics] = useState<boolean>(false);
  const [multiLang, setMultiLang] = useState<boolean>(false);
  const [customization, setCustomization] = useState<boolean>(false);
  const [result, setResult] = useState<CalculationResult>(initialResult);

  useEffect(() => {
    calculateCost();
  }, [pages, design, developmentComplexity, supportMonths, integration, analytics, multiLang, customization]);

  const handleCheckboxChange = (stateSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
    return (checked: CheckedState) => {
      stateSetter(checked === true);
    };
  };

  const calculateCost = () => {
    let baseDevelopmentCost = pages * 1000;

    switch (developmentComplexity) {
      case "низкая":
        baseDevelopmentCost *= 0.8;
        break;
      case "высокая":
        baseDevelopmentCost *= 1.5;
        break;
      default:
        break;
    }

    let additionalFeaturesCost = 0;
    if (integration) additionalFeaturesCost += baseDevelopmentCost * 0.2;
    if (analytics) additionalFeaturesCost += baseDevelopmentCost * 0.15;
    if (multiLang) additionalFeaturesCost += baseDevelopmentCost * 0.1;
    if (customization) additionalFeaturesCost += baseDevelopmentCost * 0.25;

    const totalDevelopmentCost = baseDevelopmentCost + design + additionalFeaturesCost;
    const monthlySupportCost = (totalDevelopmentCost * 0.01) * supportMonths;
    const annualSupportCost = monthlySupportCost * 12;

    setResult({
      totalCost: totalDevelopmentCost,
      monthlyCost: monthlySupportCost,
      annualCost: annualSupportCost,
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ru-RU").format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="container max-w-6xl mx-auto py-12">
        <header className="text-center mb-8">
          <Card className="inline-block">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-brand-darkBlue flex items-center gap-2">
                <Calculator className="w-6 h-6 text-brand-orange" />
                Калькулятор стоимости разработки
              </CardTitle>
              <CardDescription>Оценка стоимости разработки вашего проекта</CardDescription>
            </CardHeader>
          </Card>
        </header>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Основные параметры */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-brand-darkBlue flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-brand-orange" />
                  Основные параметры
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pages">Количество страниц</Label>
                    <Input
                      type="number"
                      id="pages"
                      value={pages}
                      onChange={(e) => setPages(Number(e.target.value))}
                      min="1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="design">Стоимость дизайна</Label>
                    <Input
                      type="number"
                      id="design"
                      value={design}
                      onChange={(e) => setDesign(Number(e.target.value))}
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="complexity">Сложность разработки</Label>
                  <Select onValueChange={setDevelopmentComplexity}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите сложность" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="низкая">Низкая</SelectItem>
                      <SelectItem value="средняя">Средняя</SelectItem>
                      <SelectItem value="высокая">Высокая</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="support">Месяцы поддержки</Label>
                  <Input
                    type="number"
                    id="support"
                    value={supportMonths}
                    onChange={(e) => setSupportMonths(Number(e.target.value))}
                    min="0"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Дополнительные функции */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-brand-darkBlue flex items-center gap-2">
                  <Star className="w-5 h-5 text-brand-orange" />
                  Дополнительные функции
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="integration"
                      checked={integration}
                      onCheckedChange={handleCheckboxChange(setIntegration)}
                    />
                    <Label htmlFor="integration" className="text-sm">
                      Интеграция с CRM (+20%)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="analytics"
                      checked={analytics}
                      onCheckedChange={handleCheckboxChange(setAnalytics)}
                    />
                    <Label htmlFor="analytics" className="text-sm">
                      Продвинутая аналитика (+15%)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="multiLang"
                      checked={multiLang}
                      onCheckedChange={handleCheckboxChange(setMultiLang)}
                    />
                    <Label htmlFor="multiLang" className="text-sm">
                      Многоязычность (+10%)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="customization"
                      checked={customization}
                      onCheckedChange={handleCheckboxChange(setCustomization)}
                    />
                    <Label htmlFor="customization" className="text-sm">
                      Кастомизация (+25%)
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Описание проекта */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-brand-darkBlue flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-orange" />
                  Описание проекта
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Количество страниц:</strong> {pages}
                  </li>
                  <li>
                    <strong>Стоимость дизайна:</strong> {formatNumber(design)} ₸
                  </li>
                  <li>
                    <strong>Сложность разработки:</strong> {developmentComplexity}
                  </li>
                  <li>
                    <strong>Месяцы поддержки:</strong> {supportMonths}
                  </li>
                  {integration && <li>Интеграция с CRM</li>}
                  {analytics && <li>Продвинутая аналитика</li>}
                  {multiLang && <li>Многоязычность</li>}
                  {customization && <li>Кастомизация</li>}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Результаты */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-brand-darkBlue flex items-center gap-2">
                  <Badge variant="secondary">Результаты</Badge>
                  Оценка стоимости
                </CardTitle>
                <CardDescription>Предварительная оценка стоимости разработки</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Общая стоимость:</span>
                    <span className="font-semibold text-brand-orange">{formatNumber(result.totalCost)} ₸</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Ежемесячная поддержка:</span>
                    <span className="font-semibold text-brand-orange">{formatNumber(result.monthlyCost)} ₸</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Годовая поддержка:</span>
                    <span className="font-semibold text-brand-orange">{formatNumber(result.annualCost)} ₸</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Скачать смету
                  </Button>
                  <Button>
                    <Share2 className="w-4 h-4 mr-2" />
                    Поделиться
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCalc;
