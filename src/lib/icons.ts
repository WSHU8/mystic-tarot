import { LucideIcon, Star, Moon, Sun, Heart, Shield, Wand2, Droplet, Skull, Globe, Circle, Scale, ArrowDown, BookOpen, Mic2, Lamp, Building2, Lock, ScrollText, Sparkles, RefreshCw, Save, Layout, GitBranch, Cross, Users, Footprints, Sword, Crown, Check, ArrowRight, Layers, Coins, Wine, HelpCircle, Briefcase } from 'lucide-react';

// 图标映射表 - 导出供外部使用
export const iconMap: Record<string, LucideIcon> = {
  Footprints,
  Wand2,
  Moon,
  Crown,
  Shield,
  BookOpen,
  Heart,
  Swords: Sword,
  Lamp,
  Circle,
  Scale,
  ArrowDown,
  Skull,
  Droplet,
  Lock,
  Building2,
  Star,
  Sun,
  Mic2,
  Globe,
  ScrollText,
  Sparkles,
  RefreshCw,
  Save,
  Layout,
  GitBranch,
  Cross,
  Users,
  Cup: Wine,  // 使用 Wine 作为圣杯图标
  Coin: Coins, // 使用 Coins 作为钱币图标
  Sword,
  Check,
  ArrowRight,
  Layers,
  HelpCircle,
  Briefcase
};

// 获取图标的函数
export function getIconByName(name: string): LucideIcon {
  return iconMap[name] || Star;
}

// 导出所有图标
export { Star, Moon, Sun, Heart, Shield, Wand2, Droplet, Skull, Globe, Circle, Scale, ArrowDown, BookOpen, Mic2, Lamp, Building2, Lock, ScrollText, Sparkles, RefreshCw, Save, Layout, GitBranch, Cross, Users, Footprints, Sword, Crown, Check, ArrowRight, Layers, Coins, Wine, HelpCircle, Briefcase };
