export const ArticleContentSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-8">
    <div className="space-y-4">
      <div className="h-4 bg-slate-200 rounded w-full"></div>
      <div className="h-4 bg-slate-200 rounded w-full"></div>
      <div className="h-4 bg-slate-200 rounded w-11/12"></div>
      <div className="h-4 bg-slate-200 rounded w-full"></div>
      <div className="h-4 bg-slate-200 rounded w-10/12"></div>
    </div>
    <div className="space-y-4">
      <div className="h-4 bg-slate-200 rounded w-full"></div>
      <div className="h-4 bg-slate-200 rounded w-full"></div>
      <div className="h-4 bg-slate-200 rounded w-9/12"></div>
    </div>
    <div className="h-75 bg-slate-200 rounded-xl"></div>
    <div className="space-y-4">
      <div className="h-4 bg-slate-200 rounded w-full"></div>
      <div className="h-4 bg-slate-200 rounded w-full"></div>
      <div className="h-4 bg-slate-200 rounded w-10/12"></div>
    </div>
  </div>
);
