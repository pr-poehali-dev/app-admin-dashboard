import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const systems = {
  TSI: {
    name: "ТСИ",
    code: "2934",
    criticality: "mission critical",
    description: "Технические системы информации",
    status: "online",
    environments: ["ПРОД", "ПСИ", "НТ"],
  },
  VIS: {
    name: "ВИС",
    code: "1491_12",
    criticality: "business critical",
    description: "Внешние информационные системы",
    status: "online",
    environments: ["ПРОД", "ПСИ", "НТ"],
  },
  MIL_MORTGAGE: {
    name: "Военная Ипотека",
    code: "2115",
    criticality: "business critical",
    description: "Система военной ипотеки",
    status: "online",
    environments: ["ПРОД", "ПСИ", "НТ"],
  },
  OPS_SUPPORT: {
    name: "ОПС Обеспечение",
    code: "3303",
    criticality: "business critical",
    description: "Обязательное пенсионное страхование",
    status: "online",
    environments: ["ПРОД", "ПСИ", "НТ"],
  },
  SERVICE: {
    name: "Обслуживание",
    code: "1491_14",
    criticality: "standard",
    description: "Система обслуживания клиентов",
    status: "online",
    environments: ["ПРОД", "ПСИ", "НТ"],
  },
  ESCROW: {
    name: "Эскроу и Аккредитивы",
    code: "1515",
    criticality: "business critical",
    description: "Эскроу счета и аккредитивы",
    status: "online",
    environments: ["ПРОД", "ПСИ", "НТ"],
  },
};

const environmentColors = {
  ПРОД: "data-[state=active]:bg-red-600 data-[state=active]:text-white hover:bg-red-600/20",
  ПСИ: "data-[state=active]:bg-purple-600 data-[state=active]:text-white hover:bg-purple-600/20",
  НТ: "data-[state=active]:bg-green-600 data-[state=active]:text-white hover:bg-green-600/20",
};

const getCriticalityBadge = (criticality: string) => {
  switch (criticality) {
    case "mission critical":
      return { variant: "destructive" as const, text: "Mission Critical" };
    case "business critical":
      return { variant: "default" as const, text: "Business Critical" };
    default:
      return { variant: "secondary" as const, text: "Standard" };
  }
};

const managementElements = [
  {
    id: "monitoring",
    name: "Мониторинг",
    icon: "Activity",
    color: "bg-green-600",
  },
  { id: "audit", name: "Аудит", icon: "Search", color: "bg-blue-600" },
  {
    id: "logging",
    name: "Журналирование",
    icon: "FileText",
    color: "bg-yellow-600",
  },
  {
    id: "database",
    name: "База Данных",
    icon: "Database",
    color: "bg-purple-600",
  },
  {
    id: "instructions",
    name: "Инструкция",
    icon: "BookOpen",
    color: "bg-orange-600",
  },
  { id: "passport", name: "Паспорт", icon: "Shield", color: "bg-indigo-600" },
  {
    id: "kubernetes",
    name: "Kubernetes",
    icon: "Server",
    color: "bg-cyan-600",
  },
  { id: "kafka", name: "Kafka", icon: "Zap", color: "bg-red-600" },
  {
    id: "description",
    name: "Описание системы",
    icon: "Info",
    color: "bg-gray-600",
  },
];

const Index = () => {
  const [selectedSystem, setSelectedSystem] = useState("TSI");
  const [activeEnvironment, setActiveEnvironment] = useState("ПРОД");
  const navigate = useNavigate();

  const handleMonitoringClick = () => {
    const systemName = systems[selectedSystem as keyof typeof systems].name;
    navigate(`/monitoring?system=${encodeURIComponent(systemName)}&env=${encodeURIComponent(activeEnvironment)}`);
  };

  return (
    <div className="min-h-screen bg-background dark">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Icon
                name="Settings"
                className="w-5 h-5 text-primary-foreground"
              />
            </div>
            <h1 className="text-xl font-bold text-sidebar-foreground">
              Админ Панель
            </h1>
          </div>

          <nav className="space-y-2">
            {Object.entries(systems).map(([key, system]) => (
              <button
                key={key}
                onClick={() => setSelectedSystem(key)}
                className={`w-full p-3 rounded-lg text-left transition-all ${
                  selectedSystem === key
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{system.name}</div>
                    <div className="text-xs text-sidebar-foreground/50 mb-1">
                      Код: {system.code}
                    </div>
                    <div className="text-sm text-sidebar-foreground/70">
                      {system.description}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge
                      variant={
                        system.status === "online" ? "default" : "destructive"
                      }
                      className="text-xs"
                    >
                      {system.status === "online" ? "Онлайн" : "Офлайн"}
                    </Badge>
                    <Badge
                      variant={getCriticalityBadge(system.criticality).variant}
                      className="text-xs"
                    >
                      {getCriticalityBadge(system.criticality).text}
                    </Badge>
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-6">
        <div className="mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Система {systems[selectedSystem as keyof typeof systems].name}
              </h2>
              <p className="text-muted-foreground mb-2">
                {systems[selectedSystem as keyof typeof systems].description}
              </p>
              <div className="flex gap-2 items-center">
                <Badge variant="outline" className="text-xs">
                  Код: {systems[selectedSystem as keyof typeof systems].code}
                </Badge>
                <Badge
                  variant={
                    getCriticalityBadge(
                      systems[selectedSystem as keyof typeof systems]
                        .criticality,
                    ).variant
                  }
                  className="text-xs"
                >
                  {
                    getCriticalityBadge(
                      systems[selectedSystem as keyof typeof systems]
                        .criticality,
                    ).text
                  }
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Environment Tabs */}
        <Tabs
          value={activeEnvironment}
          onValueChange={setActiveEnvironment}
          className="mb-6"
        >
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            {systems[selectedSystem as keyof typeof systems].environments.map(
              (env) => (
                <TabsTrigger
                  key={env}
                  value={env}
                  className={`font-medium ${environmentColors[env as keyof typeof environmentColors]}`}
                >
                  {env}
                </TabsTrigger>
              ),
            )}
          </TabsList>

          {systems[selectedSystem as keyof typeof systems].environments.map(
            (env) => (
              <TabsContent key={env} value={env} className="mt-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">
                    Контур {env}
                  </h3>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Icon name="Link" className="w-4 h-4 mr-2" />
                    Подключиться к системе
                  </Button>
                </div>

                {/* Management Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {managementElements.map((element) => (
                    <Card
                      key={element.id}
                      className="hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 ${element.color} rounded-lg flex items-center justify-center`}
                          >
                            <Icon
                              name={element.icon as any}
                              className="w-5 h-5 text-white"
                            />
                          </div>
                          <CardTitle className="text-lg">
                            {element.name}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4">
                          Управление {element.name.toLowerCase()} для системы{" "}
                          {systems[selectedSystem as keyof typeof systems].name}{" "}
                          в контуре {env}
                        </CardDescription>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Icon name="Settings" className="w-4 h-4 mr-1" />
                            Настроить
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={element.id === "monitoring" ? handleMonitoringClick : undefined}
                          >
                            <Icon name="Play" className="w-4 h-4 mr-1" />
                            Открыть
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ),
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Index;