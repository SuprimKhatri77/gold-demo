import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}
export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-slate-100">
    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
      <Search className="w-5 h-5 text-amber-600" />
      Search News
    </h3>
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        type="text"
        placeholder="Search by title or tags..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all text-slate-900"
      />
    </div>
  </div>
);
