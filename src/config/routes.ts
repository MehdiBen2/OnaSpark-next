import { 
  Building2, 
  Wrench, 
  Recycle, 
  Wallet, 
  Users, 
  Shield 
} from 'lucide-react'

export const ROUTES = {
  dashboard: '/dashboard',
  departements: '/departements',
  departementExploitation: '/departement/exploitation',
  departement: {
    root: '/departement',
    list: '/departement/departementpage',
    moyensGeneraux: {
      root: '/departement/moyens-generaux',
      path: '/departement/moyens-generaux',
      icon: Building2,
      title: 'Moyens Généraux',
      description: 'Gestion des ressources matérielles et logistiques',
      subRoutes: [
        { name: 'Infrastructure', path: '/departement/moyens-generaux/infrastructure' },
        { name: 'Transport', path: '/departement/moyens-generaux/transport' },
        { name: 'Stock', path: '/departement/moyens-generaux/stock' }
      ]
    },
    exploitation: {
      root: '/departement/exploitation',
      path: '/departement/exploitation',
      icon: Wrench,
      title: 'Exploitation et Maintenance',
      description: 'Supervision des opérations et maintenance',
      subRoutes: [
        { name: 'Rapports', path: '/departement/exploitation/rapports' },
        { name: 'Maintenance', path: '/departement/exploitation/maintenance' },
        { name: 'Surveillance', path: '/departement/exploitation/surveillance' },
        { name: 'Performance', path: '/departement/exploitation/performance' }
      ]
    },
    reuse: {
      root: '/departement/reuse',
      path: '/departement/reuse',
      icon: Recycle,
      title: 'REUSE',
      description: 'Réutilisation de l\'eau après épuration',
      subRoutes: [
        { name: 'Réglementations', path: '/departement/reuse/reglementations' },
        { name: 'Qualité de l\'eau', path: '/departement/reuse/qualite-eau' },
        { name: 'Informations', path: '/departement/reuse/informations' }
      ]
    },
    finance: {
      root: '/departement/finance',
      path: '/departement/finance',
      icon: Wallet,
      title: 'Finance',
      description: 'Gestion financière et comptable',
      subRoutes: [
        { name: 'Comptabilité', path: '/departement/finance/comptabilite' },
        { name: 'Budget', path: '/departement/finance/budget' },
        { name: 'Factures', path: '/departement/finance/factures' }
      ]
    },
    drh: {
      root: '/departement/drh',
      path: '/departement/drh',
      icon: Users,
      title: 'DRH',
      description: 'Gestion des ressources humaines',
      subRoutes: [
        { name: 'Personnel', path: '/departement/drh/personnel' },
        { name: 'Formation', path: '/departement/drh/formation' },
        { name: 'Évaluation', path: '/departement/drh/evaluation' }
      ]
    },
    hse: {
      root: '/departement/hse',
      path: '/departement/hse',
      icon: Shield,
      title: 'HSE',
      description: 'Hygiène, Sécurité et Environnement',
      subRoutes: [
        { name: 'Sécurité', path: '/departement/hse/securite' },
        { name: 'Environnement', path: '/departement/hse/environnement' },
        { name: 'Santé', path: '/departement/hse/sante' }
      ]
    },
    departementExploitationRapports: {
      root: '/departement/exploitation/rapports',
      subRoutes: [
        { name: 'Incidents', path: '/departement/exploitation/rapports/incidents' },
        { name: 'Rapports Journaliers', path: '/departement/exploitation/rapports/journaliers' },
        { name: 'Rapports Mensuels', path: '/departement/exploitation/rapports/mensuels' },
        { name: 'Statistiques', path: '/departement/exploitation/rapports/statistiques' },
        { name: 'KPIs', path: '/departement/exploitation/rapports/kpis' }
      ]
    }
  }
}

export const getRouteConfig = (route: keyof typeof ROUTES.departement) => {
  return ROUTES.departement[route]
}
