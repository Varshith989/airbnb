"use client"

import { useState } from "react"
import useCountries from "@/app/hooks/useCountries"

export type CountrySelectValue = {
  flag: string
  label: string
  latlng: number[]
  region: string
  value: string
}

interface CountrySelectProps {
  value?: CountrySelectValue
  onChange: (value: CountrySelectValue) => void
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries()
  const countries = getAll()
  const [search, setSearch] = useState("")

  const filteredCountries = countries.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase()) ||
    c.region.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-full flex flex-col gap-2">
      <input
        type="text"
        placeholder="Search for a country or region..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border-2 border-neutral-300 rounded-md outline-none focus:border-black transition"
      />
      <div className="max-h-60 overflow-y-auto border-2 border-neutral-200 rounded-md divide-y">
        {filteredCountries.map((c) => {
          const isSelected = value?.value === c.value
          return (
            <div
              key={c.value}
              onClick={() => onChange(c)}
              className={`
                p-3 flex items-center justify-between cursor-pointer hover:bg-neutral-100 transition
                ${isSelected ? "bg-rose-50 font-semibold text-rose-600" : ""}
              `}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{c.flag}</span>
                <div>
                  <span className="text-neutral-800">{c.label}</span>
                  <span className="text-neutral-400 text-sm ml-2">({c.region})</span>
                </div>
              </div>
              {isSelected && <span className="text-rose-500 font-bold">✓</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CountrySelect
