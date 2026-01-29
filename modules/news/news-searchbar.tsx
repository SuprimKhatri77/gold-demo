import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 mb-6 hover:border-blue-400/40 transition-all duration-300 group">
    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
      <Search className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
      Search Market Intelligence
    </h3>
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
      <input
        type="text"
        placeholder="Search reports, articles, tags..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xs focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-white placeholder:text-zinc-500 backdrop-blur-xl hover:bg-white/10"
      />
    </div>
  </div>
);
