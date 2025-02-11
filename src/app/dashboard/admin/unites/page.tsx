'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Building, Plus, ChevronLeft, ChevronRight, Loader2, Search, Edit2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import { getUnits, getZones } from './actions'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

// Custom debounce hook
function useDebounce<T extends (...args: any[]) => any> (
  fn: T, 
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      fn(...args)
    }, delay)
  }, [fn, delay])
}

type Unit = {
  id: string
  name: string
  code: string
  zone: { id: string, name: string }
  description?: string
}

type Zone = {
  id: string
  name: string
}

function UnitsListBanner () {
  return (
    <div className="relative bg-gradient-to-br from-[#4a90e2] to-[#1a237e] text-white overflow-hidden shadow-2xl">
      <div 
        className="absolute top-0 right-0 bottom-0 w-1/4 bg-gradient-to-r from-transparent to-red-600/50 opacity-70 pointer-events-none"
      />
      
      <div className="relative px-4 py-16 md:px-8 md:py-20 max-w-7xl mx-auto flex items-center justify-between min-h-[250px]">
        <div className="flex-1 text-center md:text-left relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 drop-shadow-lg">
              Liste des Unités
            </h2>
            
            <div className="flex items-center justify-center md:justify-start space-x-4 text-white/80">
              <Building className="w-6 h-6 opacity-70" />
              <p className="text-xl font-black tracking-wide">
                Gestion et Suivi des Unités
                <span className="block text-sm mt-1 font-medium opacity-80">
                  Visualisez et gérez vos unités organisationnelles
                </span>
              </p>
            </div>
          </motion.div>
        </div>
        
        <div className="hidden md:block">
          <Image 
            src="/images/onalogos/sparkLogofull.png" 
            alt="ONA Spark Logo" 
            width={350} 
            height={120} 
            className="max-w-[350px] opacity-90"
          />
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 md:left-8">
        <Link href="/dashboard">
          <Button 
            variant="outline" 
            className="bg-white/20 text-white hover:bg-white/30 border-white/30"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Retourner au Tableau de Bord
          </Button>
        </Link>
      </div>
    </div>
  )
}

// Form validation schema
const UnitFormSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  code: z.string().min(2, { message: 'Le code doit contenir au moins 2 caractères' }),
  description: z.string().optional(),
  zoneId: z.string({ required_error: 'La zone est requise' })
})

export default function UnitsListPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [originalUnits, setOriginalUnits] = useState<Unit[]>([])
  const [filteredUnits, setFilteredUnits] = useState<Unit[]>([])
  const [zones, setZones] = useState<Zone[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    zoneId: '',
    search: ''
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null)

  const { 
    register, 
    handleSubmit, 
    control, 
    reset, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(UnitFormSchema),
    defaultValues: {
      name: '',
      code: '',
      description: '',
      zoneId: ''
    }
  })

  const applyFilters = useCallback(() => {
    let result = [...originalUnits]

    // Zone filtering
    if (filters.zoneId && filters.zoneId !== 'all') {
      result = result.filter(unit => unit.zone?.id === filters.zoneId)
    }

    // Search filtering with more robust matching
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase().trim()
      result = result.filter(unit => 
        // Multiple search criteria with partial matching
        unit.name.toLowerCase().includes(searchTerm) ||
        unit.code.toLowerCase().includes(searchTerm) ||
        unit.zone?.name?.toLowerCase().includes(searchTerm) ||
        // Add more flexible search options
        (unit.description?.toLowerCase().includes(searchTerm) || false)
      )
    }

    // If no results, keep original units to prevent empty list
    setFilteredUnits(result.length > 0 ? result : originalUnits)
  }, [originalUnits, filters.zoneId, filters.search])

  const debouncedSearch = useDebounce((searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }))
  }, 300)

  const fetchUnits = async (page: number) => {
    setIsLoading(true)
    try {
      // Fetch units and zones in parallel
      const [unitsResult, zonesResult] = await Promise.all([
        getUnits({ 
          page, 
          pageSize: 10, 
          zoneId: filters.zoneId !== 'all' ? filters.zoneId : undefined 
        }),
        getZones() // Fetch zones separately
      ])
      
      if (unitsResult.success && unitsResult.units) {
        setOriginalUnits(unitsResult.units)
        setTotalPages(unitsResult.totalPages)
      } else {
        toast.error(unitsResult.error || 'Erreur lors du chargement des unités')
        setOriginalUnits([])
      }

      // Update zones
      if (zonesResult.success && zonesResult.zones) {
        setZones(zonesResult.zones)
      } else {
        toast.error(zonesResult.error || 'Erreur lors du chargement des zones')
        setZones([])
      }
    } catch (error) {
      toast.error('Une erreur est survenue')
      setOriginalUnits([])
      setZones([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUnits(currentPage)
  }, [currentPage, filters.zoneId])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const onSubmit = async (data) => {
    try {
      // TODO: Implement createUnit or updateUnit server action
      if (editingUnit) {
        // Update existing unit
        toast.success('Unité modifiée avec succès')
      } else {
        // Create new unit
        toast.success('Unité créée avec succès')
      }
      
      fetchUnits(currentPage)
      setIsDialogOpen(false)
      reset()
      setEditingUnit(null)
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde de l\'unité')
    }
  }

  const openEditDialog = (unit) => {
    setEditingUnit(unit)
    reset({
      name: unit.name,
      code: unit.code,
      description: unit.description || '',
      zoneId: unit.zone.id
    })
    setIsDialogOpen(true)
  }

  const openCreateDialog = () => {
    setEditingUnit(null)
    reset()
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <UnitsListBanner />
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Erreur: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : filteredUnits.length > 0 ? (
          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-4 w-full">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Rechercher une unité" 
                    className="pl-10 w-full bg-white border-gray-300 focus:ring-primary/50 focus:border-primary"
                    value={filters.search}
                    onChange={(e) => {
                      const searchTerm = e.target.value
                      debouncedSearch(searchTerm)
                    }}
                  />
                </div>

                <Select 
                  value={filters.zoneId || ''} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, zoneId: value || '' }))}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Toutes les zones" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les zones</SelectItem>
                    {zones.map(zone => (
                      <SelectItem key={zone.id} value={zone.id}>
                        {zone.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button 
                  onClick={openCreateDialog} 
                  className="group flex items-center gap-2 bg-primary hover:bg-primary/90 transition-colors duration-300"
                >
                  <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
                  <span>Nouvelle Unité</span>
                </Button>
              </div>
            </div>

            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="font-bold text-gray-700">Nom</TableHead>
                  <TableHead className="font-bold text-gray-700">Code</TableHead>
                  <TableHead className="font-bold text-gray-700">Zone</TableHead>
                  <TableHead className="font-bold text-gray-700">Description</TableHead>
                  <TableHead className="text-right font-bold text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUnits.map(unit => (
                  <TableRow 
                    key={unit.id} 
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <TableCell className="font-medium">{unit.name}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                      >
                        {unit.code}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{unit.zone?.name || 'N/A'}</TableCell>
                    <TableCell className="text-gray-500">{unit.description || 'Aucune description'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="hover:bg-green-50 hover:border-green-300 transition-colors"
                          onClick={() => openEditDialog(unit)}
                        >
                          <Edit2 className="mr-2 h-4 w-4" /> Modifier
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredUnits.length === 0 && (
              <div className="text-center py-12 bg-gray-50">
                <Building className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-xl font-semibold text-gray-600 mb-2">Aucune unité trouvée</p>
                <p className="text-gray-500">Commencez par créer une nouvelle unité</p>
              </div>
            )}

            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Page {currentPage} sur {totalPages}
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Précédent
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="hover:bg-gray-100 transition-colors"
                >
                  Suivant <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50">
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-xl font-semibold text-gray-600 mb-2">
              Aucun résultat trouvé
            </p>
            <p className="text-gray-500">
              Aucune unité ne correspond à votre recherche
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
            >
              Réinitialiser la recherche
            </Button>
          </div>
        )}

        {/* Dialog for Create/Edit Unit */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
            <div className="bg-white shadow rounded-lg overflow-hidden w-full max-w-md">
              <div className="p-4 border-b">
                <h2 className="text-lg font-bold">{editingUnit ? 'Modifier l\'Unité' : 'Créer une Nouvelle Unité'}</h2>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
                <div>
                  <label htmlFor="name">Nom de l'Unité *</label>
                  <Input 
                    {...register('name')}
                    placeholder="Entrez le nom de l'unité"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="code">Code de l'Unité *</label>
                  <Input 
                    {...register('code')}
                    placeholder="Entrez le code de l'unité"
                    className={errors.code ? 'border-red-500' : ''}
                  />
                  {errors.code && (
                    <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="description">Description</label>
                  <Input 
                    {...register('description')}
                    placeholder="Description optionnelle"
                  />
                </div>

                <div>
                  <label htmlFor="zoneId">Zone *</label>
                  <Controller
                    name="zoneId"
                    control={control}
                    render={({ field }) => (
                      <select 
                        className="form-select w-full rounded-md border px-3 py-2"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className={errors.zoneId ? 'border-red-500' : ''}
                      >
                        <option value="">Sélectionnez une zone</option>
                        {zones.map(zone => (
                          <option key={zone.id} value={zone.id}>
                            {zone.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.zoneId && (
                    <p className="text-red-500 text-sm mt-1">{errors.zoneId.message}</p>
                  )}
                </div>

                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button type="submit">
                    {editingUnit ? 'Modifier' : 'Créer'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
