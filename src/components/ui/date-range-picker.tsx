
import * as React from "react"
import { addDays, format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

interface DateRangePickerProps {
  className?: string
  onChange?: (dateRange: DateRange | undefined) => void
  initialDateRange?: DateRange
  align?: "center" | "start" | "end"
  showSelectors?: boolean
}

export function DateRangePicker({
  className,
  onChange,
  initialDateRange,
  align = "start",
  showSelectors = true,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(
    initialDateRange || { 
      from: new Date(),
      to: addDays(new Date(), 30)
    }
  )
  
  const [open, setOpen] = React.useState(false)

  const handleDateChange = (range: DateRange | undefined) => {
    setDate(range)
    if (onChange) {
      onChange(range)
    }
  }

  const handleRangeSelect = (value: string) => {
    const today = new Date()
    let newRange: DateRange
    
    switch (value) {
      case "today":
        newRange = { from: today, to: today }
        break
      case "yesterday":
        const yesterday = addDays(today, -1)
        newRange = { from: yesterday, to: yesterday }
        break
      case "7days":
        newRange = { from: addDays(today, -7), to: today }
        break
      case "30days":
        newRange = { from: addDays(today, -30), to: today }
        break
      case "thisMonth": {
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        newRange = { from: firstDay, to: lastDay }
        break
      }
      case "lastMonth": {
        const firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        const lastDay = new Date(today.getFullYear(), today.getMonth(), 0)
        newRange = { from: firstDay, to: lastDay }
        break
      }
      default:
        return
    }
    
    handleDateChange(newRange)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "d LLL, y", { locale: es })} -{" "}
                  {format(date.to, "d LLL, y", { locale: es })}
                </>
              ) : (
                format(date.from, "d LLL, y", { locale: es })
              )
            ) : (
              <span>Seleccionar fechas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          {showSelectors && (
            <div className="p-3 border-b">
              <Select onValueChange={handleRangeSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar rango" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hoy</SelectItem>
                  <SelectItem value="yesterday">Ayer</SelectItem>
                  <SelectItem value="7days">Últimos 7 días</SelectItem>
                  <SelectItem value="30days">Últimos 30 días</SelectItem>
                  <SelectItem value="thisMonth">Este mes</SelectItem>
                  <SelectItem value="lastMonth">Mes pasado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            locale={es}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

