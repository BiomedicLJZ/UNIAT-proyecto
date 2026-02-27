import {
  MessageSquare,
  BarChart,
  Globe,
  Users,
  Star,
  Zap,
  Shield,
  Heart,
} from 'lucide-react';
import type { RouteIconKey } from './types';

export const renderRouteIcon = (icon: RouteIconKey, className = 'w-8 h-8') => {
  switch (icon) {
    case 'message-square':
      return <MessageSquare className={className} />;
    case 'bar-chart':
      return <BarChart className={className} />;
    case 'globe':
      return <Globe className={className} />;
    case 'users':
      return <Users className={className} />;
    case 'star':
      return <Star className={className} />;
    case 'zap':
      return <Zap className={className} />;
    case 'shield':
      return <Shield className={className} />;
    case 'heart':
      return <Heart className={className} />;
  }
};
