import { SortKey, SortDirection } from "@/hooks/use-url-filters"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { ArrowDownAZ, ArrowDownZA, ClockArrowDown, ClockArrowUp, TrendingDown, TrendingUp } from "lucide-react"

const SORT_OPTIONS = [
  { label: "Prezzo più basso", value: "price-asc", icon: <TrendingUp size={24} />  },
  { label: "Prezzo più alto", value: "price-desc", icon: <TrendingDown size={24} /> },
  { label: "Nome (A-Z)", value: "name-asc", icon: <ArrowDownAZ  size={24}/> },
  { label: "Nome (Z-A)", value: "name-desc", icon: <ArrowDownZA  size={24}/> },
  { label: "Più recente", value: "created_at-desc", icon: <ClockArrowDown  size={24}/> },
  { label: "Meno recente", value: "created_at-asc", icon: <ClockArrowUp size={24} /> },
]

interface SingleSortSelectProps {
  sortKey?: SortKey
  sortDir?: SortDirection
  onChange: (sort: SortKey, dir: SortDirection) => void
}

export function SingleSortSelect({ sortKey, sortDir, onChange }: SingleSortSelectProps) {
  const combinedValue = sortKey && sortDir ? `${sortKey}-${sortDir}` : ""

  function handleSortChange(value: string) {
    const [newSortKey, newSortDir] = value.split("-") as [SortKey, SortDirection]
    onChange(newSortKey, newSortDir)
  }

  return (
    <Select defaultValue={combinedValue} onValueChange={handleSortChange}>
      <SelectTrigger className="w-auto">
        <SelectValue placeholder="Ordina per" />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map(opt => (
          <SelectItem key={opt.value} value={opt.value}  >
           <span className="flex flex-row gap-3">
           {opt.icon} {opt.label}
           </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
