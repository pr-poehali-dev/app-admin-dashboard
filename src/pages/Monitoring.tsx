import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const monitoringLinks = {
  unified: [
    {
      id: "unified-1",
      name: "Общий мониторинг системы",
      description: "Централизованный мониторинг всех компонентов системы",
      url: "https://monitoring.example.com/unified/general",
      icon: "Monitor",
    },
    {
      id: "unified-2", 
      name: "Мониторинг производительности",
      description: "Отслеживание производительности и загрузки системы",
      url: "https://monitoring.example.com/unified/performance",
      icon: "TrendingUp",
    },
  ],
  infrastructure: [
    {
      id: "infra-1",
      name: "Мониторинг серверов",
      description: "Состояние и загрузка серверной инфраструктуры",
      url: "https://monitoring.example.com/infrastructure/servers",
      icon: "Server",
    },
    {
      id: "infra-2",
      name: "Мониторинг сети",
      description: "Состояние сетевых соединений и трафика",
      url: "https://monitoring.example.com/infrastructure/network",
      icon: "Wifi",
    },
  ],
  database: [
    {
      id: "db-1",
      name: "Основная БД",
      description: "Мониторинг основной базы данных",
      url: "https://monitoring.example.com/database/main",
      icon: "Database",
    },
    {
      id: "db-2",
      name: "Аналитическая БД",
      description: "Мониторинг аналитической базы данных",
      url: "https://monitoring.example.com/database/analytics",
      icon: "BarChart3",
    },
    {
      id: "db-3",
      name: "Резервная БД",
      description: "Мониторинг резервной базы данных",
      url: "https://monitoring.example.com/database/backup",
      icon: "Shield",
    },
  ],
  application: [
    {
      id: "app-1",
      name: "Прикладные метрики",
      description: "Мониторинг бизнес-метрик и пользовательских сценариев",
      url: "https://monitoring.example.com/application/metrics",
      icon: "Activity",
    },
  ],
  system: [
    {
      id: "system-1",
      name: "Общий мониторинг по системе",
      description: "Сводный мониторинг всей системы",
      url: "https://monitoring.example.com/system/overview",
      icon: "Globe",
    },
  ],
};

const Monitoring = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const system = searchParams.get("system") || "ТСИ";
  const environment = searchParams.get("env") || "ПРОД";

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank");
  };

  const renderMonitoringSection = (
    title: string,
    links: typeof monitoringLinks.unified,
    color: string
  ) => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <div className={`w-3 h-3 ${color} rounded-full`}></div>
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((link) => (
          <Card
            key={link.id}
            className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer"
            onClick={() => handleLinkClick(link.url)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
                  <Icon
                    name={link.icon as any}
                    className="w-5 h-5 text-white"
                  />
                </div>
                <div>
                  <CardTitle className="text-lg">{link.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {link.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {system} • {environment}
                </Badge>
                <Icon name="ExternalLink" className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <Icon name="ArrowLeft" className="w-4 h-4" />
              Назад
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <Icon name="Activity" className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                Мониторинг системы {system}
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground">
            Контур: <Badge variant="outline">{environment}</Badge>
          </p>
        </div>

        {/* Monitoring Sections */}
        {renderMonitoringSection(
          "Единый мониторинг",
          monitoringLinks.unified,
          "bg-blue-600"
        )}

        {renderMonitoringSection(
          "Инфраструктурный мониторинг",
          monitoringLinks.infrastructure,
          "bg-purple-600"
        )}

        {renderMonitoringSection(
          "Мониторинг баз данных",
          monitoringLinks.database,
          "bg-orange-600"
        )}

        {renderMonitoringSection(
          "Прикладные метрики",
          monitoringLinks.application,
          "bg-green-600"
        )}

        {renderMonitoringSection(
          "Системный мониторинг",
          monitoringLinks.system,
          "bg-red-600"
        )}
      </div>
    </div>
  );
};

export default Monitoring;