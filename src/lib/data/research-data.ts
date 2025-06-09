
export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userAvatarHint: string;
  text: string;
  time: string;
  likes: number;
  isLikedByUser: boolean;
  // replies?: Comment[]; // For future nested replies
}

export interface ResearchArticle {
  id:string;
  title: string;
  source: string;
  date: string;
  summary: string;
  imageUrl: string;
  imageHint: string;
  comments?: Comment[]; 
}

export const featuredResearch: ResearchArticle[] = [
  {
    id: 'fr1',
    title: 'Breakthrough in Alzheimer\'s Early Detection Methods',
    source: 'Journal of Neuroscience, Vol. 42',
    date: 'October 2024',
    summary: 'A new imaging technique shows promise in identifying Alzheimer\'s biomarkers years before clinical symptoms appear. This could revolutionize early diagnosis and intervention strategies, offering hope for millions affected by the disease. The study involved a multi-center trial with over 500 participants and demonstrated high sensitivity and specificity.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'brain scan neurology',
    comments: [],
  },
  {
    id: 'fr2',
    title: 'CRISPR Gene Editing: Advances in Treating Genetic Blood Disorders',
    source: 'Nature Medicine, Vol. 30',
    date: 'September 2024',
    summary: 'Recent clinical trials demonstrate significant improvements in patients with sickle cell anemia and beta-thalassemia using CRISPR-Cas9 therapy. The long-term efficacy and safety profiles are still under investigation, but initial results are highly encouraging for these debilitating conditions. This marks a significant step towards curative therapies for genetic disorders.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'dna helix genetics',
    comments: [],
  },
];

export const getResearchArticleById = (id: string): ResearchArticle | undefined => {
  // Create a deep copy to avoid modifying the original data if comments are added client-side
  const article = featuredResearch.find(article => article.id === id);
  return article ? JSON.parse(JSON.stringify(article)) : undefined;
};
