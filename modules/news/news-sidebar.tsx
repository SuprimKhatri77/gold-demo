import { NewsItem } from "./news";
import { SearchBar } from "./news-searchbar";
import { SuggestedNews } from "./suggested-news";

interface NewsSidebarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  suggestedNews: NewsItem[];
}

export const NewsSidebar: React.FC<NewsSidebarProps> = ({
  searchQuery,
  onSearchChange,
  suggestedNews,
}) => (
  <aside className="space-y-6">
    <SearchBar value={searchQuery} onChange={onSearchChange} />
    <SuggestedNews news={suggestedNews} />
  </aside>
);
