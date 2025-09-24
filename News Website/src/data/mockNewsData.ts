interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
}

const imageUrls = [
  "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2luZyUyMG5ld3N8ZW58MXx8fHwxNzU2NzA5OTMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1726566289392-011dc554e604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbmV3c3xlbnwxfHx8fDE3NTY3MDkxNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG5ld3N8ZW58MXx8fHwxNzU2NjExOTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1582586302869-715be816f60b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBuZXdzfGVufDF8fHx8MTc1NjczMjU2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1609764465702-78599b1f1833?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbmV3c3xlbnwxfHx8fDE3NTY3MzMyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
];

const categories = ["Breaking News", "Technology", "Business", "Sports", "Science", "World", "Politics", "Health", "Entertainment", "Environment"];
const authors = ["John Smith", "Sarah Johnson", "Michael Brown", "Emily Davis", "David Wilson", "Lisa Garcia", "Robert Martinez", "Jennifer Anderson", "William Taylor", "Jessica Thomas"];

const newsTemplates = [
  {
    title: "Global Climate Summit Reaches Historic Agreement on Carbon Emissions",
    summary: "World leaders have reached a groundbreaking agreement at the Global Climate Summit to reduce carbon emissions by 50% over the next decade, marking a significant milestone in the fight against climate change."
  },
  {
    title: "Revolutionary AI Technology Breakthrough Changes Healthcare Industry",
    summary: "Scientists have developed a new AI system that can diagnose diseases with 99% accuracy, potentially revolutionizing healthcare and improving patient outcomes worldwide."
  },
  {
    title: "Major Economic Recovery Shows Promising Signs Across Global Markets",
    summary: "Stock markets worldwide are showing strong recovery signals as economic indicators point to sustained growth and improved consumer confidence in the coming quarters."
  },
  {
    title: "Olympic Games Set New Records for Viewership and Athletic Performance",
    summary: "This year's Olympic Games have broken multiple records, both in terms of global viewership and outstanding athletic achievements that have captivated audiences worldwide."
  },
  {
    title: "Space Exploration Mission Discovers Potential Signs of Life on Mars",
    summary: "NASA's latest Mars mission has uncovered compelling evidence that suggests the possibility of microbial life, opening new frontiers in our understanding of the universe."
  },
  {
    title: "Renewable Energy Initiative Surpasses Expectations in First Quarter",
    summary: "The global renewable energy initiative has exceeded its targets by 30% in the first quarter, demonstrating the viability and growing adoption of sustainable energy solutions."
  },
  {
    title: "International Trade Agreements Signal New Era of Global Cooperation",
    summary: "Several major economies have signed comprehensive trade agreements that promise to boost international commerce and foster greater economic collaboration."
  },
  {
    title: "Breakthrough Medical Treatment Shows Promise for Cancer Patients",
    summary: "Clinical trials for a revolutionary cancer treatment have shown remarkable success rates, offering new hope for patients and families affected by the disease."
  },
  {
    title: "Technology Giants Announce Major Investment in Cybersecurity Infrastructure",
    summary: "Leading technology companies have committed billions to enhancing cybersecurity measures, addressing growing concerns about digital privacy and data protection."
  },
  {
    title: "Educational Reform Initiative Launches in Schools Across the Nation",
    summary: "A comprehensive educational reform program has been implemented nationwide, focusing on modernizing curricula and improving student outcomes in STEM subjects."
  }
];

function generateRandomDate(): string {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
  
  return date.toLocaleDateString();
}

function generateReadTime(): string {
  const minutes = Math.floor(Math.random() * 8) + 2; // 2-9 minutes
  return `${minutes} min read`;
}

export const mockNewsData: NewsArticle[] = Array.from({ length: 50 }, (_, index) => {
  const template = newsTemplates[index % newsTemplates.length];
  const variation = Math.floor(index / newsTemplates.length);
  
  let title = template.title;
  let summary = template.summary;
  
  if (variation > 0) {
    // Add variation to titles and summaries for duplicate templates
    const variations = [
      "Latest Updates: ",
      "Breaking: ",
      "Exclusive: ",
      "Report: ",
      "Analysis: "
    ];
    title = variations[variation % variations.length] + title;
  }
  
  return {
    id: index + 1,
    title,
    summary,
    imageUrl: imageUrls[index % imageUrls.length],
    category: categories[index % categories.length],
    author: authors[index % authors.length],
    publishedAt: generateRandomDate(),
    readTime: generateReadTime()
  };
});