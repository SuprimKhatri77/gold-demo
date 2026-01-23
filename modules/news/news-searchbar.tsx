import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}
export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 mb-6">
    <h3 className="text-lg font-bold text-white mb-4">Search News</h3>
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-500" />
      <input
        type="text"
        placeholder="Search by title or tags..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-amber-500/50 focus:outline-none transition-colors text-white placeholder:text-zinc-500 backdrop-blur-sm"
      />
    </div>
  </div>
);
