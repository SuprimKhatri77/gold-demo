import { mockNews } from "./mock-news";
import { RelatedNews } from "./related-news";
import { SearchBar } from "./search-bar";

interface SidebarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  currentArticleId: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  searchQuery,
  onSearchChange,
  currentArticleId,
}) => (
  <aside className="lg:sticky lg:top-6 space-y-6">
    <SearchBar value={searchQuery} onChange={onSearchChange} />
    <RelatedNews news={mockNews} currentId={currentArticleId} />
  </aside>
);
