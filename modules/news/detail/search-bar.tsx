import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}
export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <div className="bg-white/5 backdrop-blur-md rounded-lg md:rounded-xl border border-white/10 p-5 md:p-6 hover:bg-white/[0.07] transition-all duration-300">
    <h3 className="text-base md:text-lg font-bold text-white mb-4 flex items-center gap-2">
      <Search className="w-5 h-5 text-amber-500/70" />
      Search News
    </h3>
    <div className="relative">
      <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-zinc-400" />
      <input
        type="text"
        placeholder="Search by title or tags..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-lg focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all text-white placeholder:text-zinc-500 hover:bg-white/[0.07]"
      />
    </div>
  </div>
);
