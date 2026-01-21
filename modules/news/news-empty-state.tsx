import { Search } from "lucide-react";

export const EmptyState: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-16 text-center">
    <div className="max-w-md mx-auto">
      <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="w-10 h-10 text-amber-600" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3">
        No News Available
      </h3>
      <p className="text-slate-600 text-lg">
        No news articles match your search. Please try different keywords or
        check back later for new updates.
      </p>
    </div>
  </div>
);
