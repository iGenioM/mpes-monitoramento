"use client"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type LabeledSelectProps = {
  id?: string
  label?: string
  value: string
  options: Array<{ value: string; label: string }>
  onValueChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
  containerClassName?: string
  labelClassName?: string
  triggerClassName?: string
}

export function LabeledSelect({
  id,
  label,
  value,
  options,
  onValueChange,
  disabled,
  placeholder,
  containerClassName,
  labelClassName,
  triggerClassName,
}: LabeledSelectProps) {
  const selectedLabel = options.find((option) => option.value === value)?.label

  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label ? (
        <Label htmlFor={id} className={labelClassName}>
          {label}
        </Label>
      ) : null}
      <Select
        value={value}
        onValueChange={(next) => next && onValueChange(next)}
        disabled={disabled}
      >
        <SelectTrigger id={id} className={cn("w-full", triggerClassName)}>
          <SelectValue placeholder={placeholder ?? label}>
            {selectedLabel}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
