import { 
  Building2, 
  Wrench, 
  Recycle, 
  Wallet, 
  Users, 
  Shield 
} from 'lucide-react'

export const ROUTES = {
  landing: '/',
  dashboard: '/dashboard',
  departements: '/departements',
  departementExploitation: '/departements/exploitation',
  departementExploitationRapports: '/departements/exploitation/rapports',
  departementExploitationMaintenance: '/departements/exploitation/maintenance',
  departementRessourcesHumaines: '/departements/ressources-humaines',
  departementFinance: '/departements/finance',
  departementSecurite: '/departements/securite',
  departementStrategiePerformance: '/departements/strategie-performance',
  departementRechercheInnovation: '/departements/recherche-innovation',
  departements: {
    root: '/departements',
    list: '/departements/departementspage',
    moyensGeneraux: {
      root: '/departements/moyens-generaux',
      path: '/departements/moyens-generaux',
      icon: Building2,
      title: 'Moyens Généraux',
      description: 'Gestion des ressources matérielles et logistiques',
      subRoutes: [
        { name: 'Infrastructure', path: '/departements/moyens-generaux/infrastructure' },
        { name: 'Transport', path: '/departements/moyens-generaux/transport' },
        { name: 'Stock', path: '/departements/moyens-generaux/stock' }
      ]
    },
    exploitation: {
      root: '/departements/exploitation',
      path: '/departements/exploitation',
      icon: Wrench,
      title: 'Exploitation et Maintenance',
      description: 'Supervision des opérations et maintenance',
      subRoutes: [
        { name: 'Rapports', path: '/departements/exploitation/rapports' },
        { name: 'Maintenance', path: '/departements/exploitation/maintenance' },
        { name: 'Surveillance', path: '/departements/exploitation/surveillance' },
        { name: 'Performance', path: '/departements/exploitation/performance' }
      ]
    },
    reuse: {
      root: '/departements/reuse',
      path: '/departements/reuse',
      icon: Recycle,
      title: 'REUSE',
      description: 'Réutilisation de l\'eau après épuration',
      subRoutes: [
        { name: 'Réglementations', path: '/departements/reuse/reglementations' },
        { name: 'Qualité de l\'eau', path: '/departements/reuse/qualite-eau' },
        { name: 'Informations', path: '/departements/reuse/informations' }
      ]
    },
    finance: {
      root: '/departements/finance',
      path: '/departements/finance',
      icon: Wallet,
      title: 'Finance',
      description: 'Gestion financière et comptable',
      subRoutes: [
        { name: 'Comptabilité', path: '/departements/finance/comptabilite' },
        { name: 'Budget', path: '/departements/finance/budget' },
        { name: 'Factures', path: '/departements/finance/factures' }
      ]
    },
    drh: {
      root: '/departements/drh',
      path: '/departements/drh',
      icon: Users,
      title: 'DRH',
      description: 'Gestion des ressources humaines',
      subRoutes: [
        { name: 'Personnel', path: '/departements/drh/personnel' },
        { name: 'Formation', path: '/departements/drh/formation' },
        { name: 'Évaluation', path: '/departements/drh/evaluation' }
      ]
    },
    hse: {
      root: '/departements/hse',
      path: '/departements/hse',
      icon: Shield,
      title: 'HSE',
      description: 'Hygiène, Sécurité et Environnement',
      subRoutes: [
        { name: 'Sécurité', path: '/departements/hse/securite' },
        { name: 'Environnement', path: '/departements/hse/environnement' },
        { name: 'Santé', path: '/departements/hse/sante' }
      ]
    },
    departementExploitationRapports: {
      root: '/departements/exploitation/rapports',
      subRoutes: [
        { name: 'Incidents', path: '/departements/exploitation/rapports/incidents' },
        { name: 'Rapports Journaliers', path: '/departements/exploitation/rapports/journaliers' },
        { name: 'Rapports Mensuels', path: '/departements/exploitation/rapports/mensuels' },
        { name: 'Statistiques', path: '/departements/exploitation/rapports/statistiques' },
        { name: 'KPIs', path: '/departements/exploitation/rapports/kpis' }
      ]
    }
  }
}

export const getRouteConfig = (route: keyof typeof ROUTES.departements) => {
  return ROUTES.departements[route]
}
