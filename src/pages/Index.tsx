import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Server {
  id: string;
  name: string;
  country: string;
  ping: number;
  load: number;
  isOptimal?: boolean;
}

const servers: Server[] = [
  { id: '1', name: 'Москва #1', country: 'RU', ping: 12, load: 45, isOptimal: true },
  { id: '2', name: 'Санкт-Петербург #1', country: 'RU', ping: 18, load: 32 },
  { id: '3', name: 'Амстердам #2', country: 'NL', ping: 45, load: 67 },
  { id: '4', name: 'Нью-Йорк #3', country: 'US', ping: 89, load: 54 },
  { id: '5', name: 'Токио #1', country: 'JP', ping: 112, load: 38 },
  { id: '6', name: 'Сингапур #2', country: 'SG', ping: 98, load: 41 },
];

const plans = [
  {
    name: 'Базовый',
    price: '299',
    period: 'мес',
    features: ['1 устройство', '10 локаций', 'До 100 Мбит/с', 'Поддержка 24/7'],
  },
  {
    name: 'Про',
    price: '499',
    period: 'мес',
    features: ['5 устройств', 'Все локации', 'До 1 Гбит/с', 'Приоритетная поддержка', 'Kill Switch'],
    popular: true,
  },
  {
    name: 'Премиум',
    price: '799',
    period: 'мес',
    features: ['10 устройств', 'Все локации', 'Безлимитная скорость', 'VIP поддержка', 'Выделенный IP', 'Без логов'],
  },
];

export default function Index() {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const [connectionTime, setConnectionTime] = useState(0);
  const [dataUsed, setDataUsed] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setConnectionTime((prev) => prev + 1);
        setDataUsed((prev) => prev + Math.random() * 0.5);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleConnect = () => {
    setIsConnected(!isConnected);
    if (!isConnected) {
      setConnectionTime(0);
      setDataUsed(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a1f2c] to-[#0f1419] text-foreground">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow">
                <Icon name="Shield" size={28} className="text-white" />
              </div>
              <h1 className="text-3xl font-orbitron font-bold neon-text">QUANTUM VPN</h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="glass-effect border-primary/30 text-primary">
                <Icon name="User" size={14} className="mr-1" />
                Профиль
              </Badge>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 glass-effect border-primary/20 p-8 animate-scale-in">
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="relative mb-6">
                <div
                  className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isConnected
                      ? 'bg-gradient-to-br from-primary/20 to-secondary/20 neon-glow pulse-glow'
                      : 'glass-effect'
                  }`}
                >
                  <div
                    className={`w-40 h-40 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isConnected ? 'bg-primary/10' : 'bg-muted/10'
                    }`}
                  >
                    <Icon
                      name={isConnected ? 'ShieldCheck' : 'Shield'}
                      size={64}
                      className={`transition-colors duration-500 ${
                        isConnected ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    />
                  </div>
                </div>
                {isConnected && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-6 h-6 rounded-full bg-green-500 animate-pulse border-2 border-background" />
                  </div>
                )}
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-orbitron font-bold mb-2">
                  {isConnected ? 'ЗАЩИЩЕНО' : 'НЕ ЗАЩИЩЕНО'}
                </h2>
                <p className="text-muted-foreground">
                  {isConnected ? `Подключено к ${selectedServer.name}` : 'Нажмите для подключения'}
                </p>
              </div>

              <Button
                onClick={handleConnect}
                size="lg"
                className={`w-64 h-14 text-lg font-orbitron font-semibold transition-all duration-300 ${
                  isConnected
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                    : 'bg-gradient-to-r from-primary to-secondary hover:scale-105 neon-glow'
                }`}
              >
                <Icon name={isConnected ? 'Power' : 'Zap'} size={20} className="mr-2" />
                {isConnected ? 'ОТКЛЮЧИТЬ' : 'ПОДКЛЮЧИТЬ'}
              </Button>
            </div>

            {isConnected && (
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-primary/20 animate-slide-up">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Icon name="Clock" size={16} className="text-primary" />
                    <span className="text-sm text-muted-foreground">Время</span>
                  </div>
                  <p className="text-xl font-orbitron font-semibold">{formatTime(connectionTime)}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Icon name="HardDrive" size={16} className="text-primary" />
                    <span className="text-sm text-muted-foreground">Трафик</span>
                  </div>
                  <p className="text-xl font-orbitron font-semibold">{dataUsed.toFixed(2)} ГБ</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Icon name="Gauge" size={16} className="text-primary" />
                    <span className="text-sm text-muted-foreground">Пинг</span>
                  </div>
                  <p className="text-xl font-orbitron font-semibold">{selectedServer.ping} мс</p>
                </div>
              </div>
            )}
          </Card>

          <Card className="glass-effect border-primary/20 p-6 animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-lg font-orbitron font-semibold mb-4 flex items-center gap-2">
              <Icon name="Settings" size={20} className="text-primary" />
              Быстрые настройки
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg glass-effect">
                <div className="flex items-center gap-3">
                  <Icon name="Zap" size={18} className="text-yellow-500" />
                  <span className="text-sm">Kill Switch</span>
                </div>
                <div className="w-10 h-6 rounded-full bg-primary relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg glass-effect">
                <div className="flex items-center gap-3">
                  <Icon name="Globe" size={18} className="text-blue-500" />
                  <span className="text-sm">Автовыбор</span>
                </div>
                <div className="w-10 h-6 rounded-full bg-primary relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg glass-effect">
                <div className="flex items-center gap-3">
                  <Icon name="Lock" size={18} className="text-green-500" />
                  <span className="text-sm">DNS Leak</span>
                </div>
                <div className="w-10 h-6 rounded-full bg-muted relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="servers" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <TabsList className="glass-effect border-primary/20 mb-6">
            <TabsTrigger value="servers" className="data-[state=active]:bg-primary/20">
              <Icon name="Server" size={16} className="mr-2" />
              Серверы
            </TabsTrigger>
            <TabsTrigger value="plans" className="data-[state=active]:bg-primary/20">
              <Icon name="CreditCard" size={16} className="mr-2" />
              Тарифы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="servers" className="space-y-3">
            {servers.map((server) => (
              <Card
                key={server.id}
                className={`glass-effect border-primary/20 p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  selectedServer.id === server.id ? 'border-primary neon-glow' : ''
                }`}
                onClick={() => setSelectedServer(server)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Icon name="Globe" size={24} className="text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{server.name}</h4>
                        {server.isOptimal && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <Icon name="Sparkles" size={12} className="mr-1" />
                            Оптимальный
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{server.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">Пинг</div>
                      <div className="font-orbitron font-semibold text-primary">{server.ping} мс</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">Нагрузка</div>
                      <div className="font-orbitron font-semibold">{server.load}%</div>
                    </div>
                    <Icon
                      name="ChevronRight"
                      size={20}
                      className={selectedServer.id === server.id ? 'text-primary' : 'text-muted-foreground'}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="plans">
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <Card
                  key={plan.name}
                  className={`glass-effect p-6 transition-all duration-300 hover:scale-105 ${
                    plan.popular ? 'border-primary neon-glow' : 'border-primary/20'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {plan.popular && (
                    <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary">
                      <Icon name="Star" size={12} className="mr-1" />
                      Популярный
                    </Badge>
                  )}
                  <h3 className="text-2xl font-orbitron font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-orbitron font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">₽/{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-primary to-secondary hover:scale-105 neon-glow'
                        : 'glass-effect border border-primary/30'
                    }`}
                  >
                    Выбрать план
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
