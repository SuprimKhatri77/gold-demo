export const ArticleContentSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-6 md:space-y-8">
    {/* Content Block 1 */}
    <div className="space-y-3 md:space-y-4 p-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
      <div className="h-4 bg-linear-to-r from-white/10 via-white/5 to-white/10 rounded w-full"></div>
      <div className="h-4 bg-linear-to-r from-white/10 via-white/5 to-white/10 rounded w-full"></div>
      <div className="h-4 bg-linear-to-r from-white/10 via-white/5 to-white/10 rounded w-11/12"></div>
      <div className="h-4 bg-linear-to-r from-white/10 via-white/5 to-white/10 rounded w-full"></div>
      <div className="h-4 bg-linear-to-r from-white/10 via-white/5 to-white/10 rounded w-10/12"></div>
    </div>

    {/* Content Block 2 */}
    <div className="space-y-3 md:space-y-4 p-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
      <div className="h-4 bg-linear-to-r from-white/10 via-white/5 to-white/10 rounded w-full"></div>
      <div className="h-4 bg-linear-to-r from-white/10 via-white/5 to-white/10 rounded w-full"></div>
      <div className="h-4 bg-linear-to-r from-white/10 via-white/5 to-white/10 rounded w-9/12"></div>
    </div>

    {/* Image Skeleton */}
    <div className="h-48 md:h-64 bg-linear-to-br from-white/10 via-white/5 to-white/10 rounded-2xl border border-white/10"></div>

    {/* Content Block 3 */}
    <div className="space-y-3 md:space-y-4 p-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
      <div className="h-4 bg-linear-to-r from-white/10 via-white/5 to-white/10 rounded w-full"></div>
      <div className="h-4 bg-linear-to-r from-white/10 via-white/5 to-white/10 rounded w-full"></div>
      <div className="h-4 bg-linear-to-r from-white/10 via-white/5 to-white/10 rounded w-10/12"></div>
      <div className="h-4 bg-linear-to-r from-white/10 via-white/5 to-white/10 rounded w-11/12"></div>
    </div>

    {/* Quote/Highlight Skeleton */}
    <div className="p-6 bg-linear-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-xl border border-blue-400/20">
      <div className="h-6 bg-white/20 rounded w-3/4 mb-3"></div>
      <div className="h-6 bg-white/20 rounded w-2/3"></div>
    </div>

    {/* Final Content Block */}
    <div className="space-y-3 md:space-y-4 p-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
      <div className="h-4 bg-linear-to-r from-white/10 via-white/5 to-white/10 rounded w-full"></div>
      <div className="h-4 bg-linear-to-r from-white/10 via-white/5 to-white/10 rounded w-11/12"></div>
      <div className="h-4 bg-linear-to-r from-white/10 via-white/5 to-white/10 rounded w-full"></div>
    </div>
  </div>
);
