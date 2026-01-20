export const ArticleHeaderSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="flex flex-wrap gap-2 mb-8">
      <div className="h-7 w-28 bg-slate-200 rounded-full"></div>
      <div className="h-7 w-36 bg-slate-200 rounded-full"></div>
    </div>
    <div className="h-14 bg-slate-200 rounded w-3/4 mb-4"></div>
    <div className="h-14 bg-slate-200 rounded w-2/3 mb-10"></div>
    <div className="flex items-center gap-6 mb-10">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 bg-slate-200 rounded-full"></div>
        <div>
          <div className="h-5 w-36 bg-slate-200 rounded mb-2"></div>
          <div className="h-4 w-28 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
    <div className="w-full h-125 bg-slate-200 rounded-2xl mb-8"></div>
  </div>
);
