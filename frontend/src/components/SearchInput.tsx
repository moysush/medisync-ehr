import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput = ({
  value,
  onChange,
  placeholder,
  className,
}: SearchInputProps) => (
  <div className={`relative ${className ?? ""}`}>
    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
    <Input
      className={`pl-9 ${value ? "pr-9" : ""}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {value && (
      <button
        type="button"
        aria-label="Clear search"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => onChange("")}
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <X className="size-4" />
      </button>
    )}
  </div>
);

export default SearchInput;
