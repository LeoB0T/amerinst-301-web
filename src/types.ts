export type ViewMode = 'landing' | 'dashboard';

export type DashboardTab = 'dashboard' | 'unidades' | 'microprogramas' | 'biblioteca';

export interface BranchInfo {
  id: string;
  name: string;
  title: string;
  age: string;
  motto: string;
  description: string;
  longDescription: string;
  colorBorder: string;
  colorBg: string;
  colorText: string;
  icon: string;
}

export interface AgendaEvent {
  id: string;
  day: string;
  monthYear: string;
  branchBadge: string;
  branchBadgeColor: string;
  location: string;
  title: string;
  description: string;
  category: 'camp' | 'serv' | 'semanal';
  actionType: 'confirm' | 'sync';
}

export interface ShopProduct {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  price: number;
  description: string;
  image: string;
}

export interface ScoutMember {
  id: number;
  code: string;
  name: string;
  initials: string;
  age: number;
  patrol: string;
  stage: string;
  stageColor: string;
  present: boolean;
}

export interface DocumentItem {
  id: string;
  title: string;
  filename: string;
  category: 'administrativo' | 'tecnico' | 'salud';
  categoryLabel: string;
  categoryColor: string;
  description: string;
  size: string;
  rev: string;
  icon: string;
}
