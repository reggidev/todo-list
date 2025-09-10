import { CheckIcon, CircleEllipsisIcon, ListIcon } from 'lucide-react'

import { Badge } from './ui/badge'

export type FilterType = 'all' | 'pending' | 'completed'

interface FilterTaskProps {
  currentFilter: FilterType
  setCurrentFilter: React.Dispatch<React.SetStateAction<FilterType>>
}

const FilterTask = ({ currentFilter, setCurrentFilter }: FilterTaskProps) => {
  return (
    <div className="flex gap-1">
      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === 'all' ? 'default' : 'outline'}`}
        onClick={() => setCurrentFilter('all')}
      >
        <ListIcon />
        Todas
      </Badge>

      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === 'pending' ? 'default' : 'outline'}`}
        onClick={() => setCurrentFilter('pending')}
      >
        <CircleEllipsisIcon />
        Não finalizadas
      </Badge>

      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === 'completed' ? 'default' : 'outline'}`}
        onClick={() => setCurrentFilter('completed')}
      >
        <CheckIcon />
        Concluídas
      </Badge>
    </div>
  )
}

export default FilterTask
