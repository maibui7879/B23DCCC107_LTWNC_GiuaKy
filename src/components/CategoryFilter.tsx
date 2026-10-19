interface CategoryFilterProps {
  categories: string[]
  value: string
  onChange: (category: string) => void
}

function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  return (
    <select
      aria-label="Filter by category"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  )
}

export default CategoryFilter
