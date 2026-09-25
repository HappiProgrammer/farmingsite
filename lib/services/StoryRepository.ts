import type { StoryData } from "@/lib/models/Story";
import { Story } from "@/lib/models/Story";
import storiesRaw from "@/lib/content/stories.json";

const storiesData = storiesRaw as StoryData[];

export class StoryRepository {
  private readonly stories: Story[];

  constructor() {
    // Featured story always first
    this.stories = [...storiesData]
      .sort((a, b) => Number(b.featured) - Number(a.featured))
      .map((d) => new Story(d));
  }

  findAll(): Story[] {
    return this.stories;
  }

  findFeatured(): Story | null {
    return this.stories.find((s) => s.featured) ?? null;
  }

  findById(id: string): Story | null {
    return this.stories.find((s) => s.id === id) ?? null;
  }
}

let _repo: StoryRepository | null = null;

export function getStoryRepository(): StoryRepository {
  if (!_repo) _repo = new StoryRepository();
  return _repo;
}
