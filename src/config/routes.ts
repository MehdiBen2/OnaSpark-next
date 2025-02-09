import { 
  Wrench, 
  Users, 
  BarChart2, 
  Shield, 
  FileText,
  Beaker
} from 'lucide-react'

export const ROUTES = {
  dashboard: '/dashboard',
  departements: '/departements/departementspage',
  departementExploitation: '/departements/exploitation',
  departementRapports: '/departements/exploitation/rapports',
  oldRoutes: {
    exploitation: '/departement/exploitation',
    exploitationRapports: '/departement/exploitation/rapports'
  },
  departement: {
    root: '/departements',
    list: '/departements/departementspage',
    exploitation: {
      root: '/departements/exploitation',
      path: '/departements/exploitation',
      icon: Wrench,
      title: 'Exploitation',
      description: 'Gestion opérationnelle et maintenance des infrastructures',
      subRoutes: [
        { name: 'Rapports', path: '/departements/exploitation/rapports' },
        { name: 'Maintenance', path: '/departements/exploitation/maintenance' }
      ]
    },
    ressourcesHumaines: {
      root: '/departements/ressources-humaines',
      path: '/departements/ressources-humaines',
      icon: Users,
      title: 'Ressources Humaines',
      description: 'Développement et gestion du capital humain',
      subRoutes: [
        { name: 'Personnel', path: '/departements/ressources-humaines/personnel' },
        { name: 'Formation', path: '/departements/ressources-humaines/formation' }
      ]
    },
    finance: {
      root: '/departements/finance',
      path: '/departements/finance',
      icon: BarChart2,
      title: 'Finance',
      description: 'Gestion financière et optimisation budgétaire',
      subRoutes: [
        { name: 'Rapports Financiers', path: '/departements/finance/rapports' },
        { name: 'Budget', path: '/departements/finance/budget' }
      ]
    },
    securite: {
      root: '/departements/securite',
      path: '/departements/securite',
      icon: Shield,
      title: 'Sécurité',
      description: 'Protection et prévention des risques opérationnels',
      subRoutes: [
        { name: 'Alertes', path: '/departements/securite/alertes' },
        { name: 'Prévention', path: '/departements/securite/prevention' }
      ]
    },
    strategieEtPerformance: {
      root: '/departements/strategie-performance',
      path: '/departements/strategie-performance',
      icon: FileText,
      title: 'Stratégie et Performance',
      description: 'Analyse stratégique et amélioration continue',
      subRoutes: [
        { name: 'Initiatives', path: '/departements/strategie-performance/initiatives' },
        { name: 'KPIs', path: '/departements/strategie-performance/kpis' }
      ]
    },
    rechercheEtInnovation: {
      root: '/departements/recherche-innovation',
      path: '/departements/recherche-innovation',
      icon: Beaker,
      title: 'Recherche et Innovation',
      description: 'Développement de solutions technologiques avancées',
      subRoutes: [
        { name: 'Projets', path: '/departements/recherche-innovation/projets' },
        { name: 'Laboratoire', path: '/departements/recherche-innovation/laboratoire' }
      ]
    }
  }
}

export function getRouteConfig(route: keyof typeof ROUTES.departement) {
  return ROUTES.departement[route]
}
