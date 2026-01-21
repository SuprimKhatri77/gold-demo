export const LoadingSkeleton: React.FC = () => (
  <div className="space-y-8">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
      >
        <div className="md:flex">
          <div className="md:w-80 h-64 bg-slate-200"></div>
          <div className="p-8 flex-1">
            <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-3 mb-6">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </div>
            <div className="h-10 bg-slate-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
