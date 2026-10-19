interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      aria-label="Search books"
      type="search"
      placeholder="Search by title or author"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

export default SearchBar
