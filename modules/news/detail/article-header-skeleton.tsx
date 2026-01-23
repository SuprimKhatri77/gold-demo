export const ArticleHeaderSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
      <div className="h-6 md:h-7 w-24 md:w-28 bg-white/10 rounded-full"></div>
      <div className="h-6 md:h-7 w-32 md:w-36 bg-white/10 rounded-full"></div>
    </div>
    <div className="h-10 md:h-14 bg-white/10 rounded-lg w-3/4 mb-3 md:mb-4"></div>
    <div className="h-10 md:h-14 bg-white/10 rounded-lg w-2/3 mb-8 md:mb-10"></div>
    <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-full"></div>
        <div>
          <div className="h-4 md:h-5 w-32 md:w-36 bg-white/10 rounded mb-2"></div>
          <div className="h-3 md:h-4 w-24 md:w-28 bg-white/10 rounded"></div>
        </div>
      </div>
    </div>
    <div className="w-full h-64 md:h-96 bg-white/10 rounded-2xl mb-8"></div>
  </div>
);
