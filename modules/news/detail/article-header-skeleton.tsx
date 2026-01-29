export const ArticleHeaderSkeleton: React.FC = () => (
  <div className="animate-pulse">
    {/* Tags Skeleton */}
    <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
      <div className="h-6 md:h-7 w-24 md:w-28 bg-white/10 rounded-full backdrop-blur-xl border border-white/10"></div>
      <div className="h-6 md:h-7 w-32 md:w-36 bg-white/10 rounded-full backdrop-blur-xl border border-white/10"></div>
      <div className="h-6 md:h-7 w-28 md:w-32 bg-white/10 rounded-full backdrop-blur-xl border border-white/10"></div>
    </div>

    {/* Title Skeleton */}
    <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
      <div className="h-10 md:h-14 bg-linear-to-r from-white/10 via-white/5 to-white/10 rounded-xl w-11/12"></div>
      <div className="h-10 md:h-14 bg-linear-to-r from-white/10 via-white/5 to-white/10 rounded-xl w-4/5"></div>
    </div>

    {/* Author Info Skeleton */}
    <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10 p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-full border border-white/10"></div>
        <div className="space-y-2">
          <div className="h-4 md:h-5 w-32 md:w-36 bg-white/10 rounded"></div>
          <div className="h-3 md:h-4 w-24 md:w-28 bg-white/10 rounded"></div>
        </div>
      </div>

      {/* Read time skeleton */}
      <div className="h-4 w-20 bg-white/10 rounded"></div>
    </div>

    {/* Featured Image Skeleton */}
    <div className="w-full h-64 md:h-96 bg-linear-to-br from-white/10 via-white/5 to-white/10 rounded-2xl mb-8 border border-white/10"></div>
  </div>
);
