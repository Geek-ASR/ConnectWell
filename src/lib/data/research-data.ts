
import type { LucideIcon } from 'lucide-react';
import { Lightbulb, Zap, FileText, BookOpen } from 'lucide-react';

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
    imageUrl: 'https://images.unsplash.com/photo-1558284924-48ee23778f83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMnx8YWx6aGVpbWVyfGVufDB8fHx8MTc0OTQ5MTgwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'brain scan neurology',
    comments: [],
  },
  {
    id: 'fr2',
    title: 'CRISPR Gene Editing: Advances in Treating Genetic Blood Disorders',
    source: 'Nature Medicine, Vol. 30',
    date: 'September 2024',
    summary: 'Recent clinical trials demonstrate significant improvements in patients with sickle cell anemia and beta-thalassemia using CRISPR-Cas9 therapy. The long-term efficacy and safety profiles are still under investigation, but initial results are highly encouraging for these debilitating conditions. This marks a significant step towards curative therapies for genetic disorders.',
    imageUrl: 'https://images.unsplash.com/photo-1641903202531-bfa6bf0c6419?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxnZW5lc3xlbnwwfHx8fDE3NDk0OTE4NDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'dna helix genetics',
    comments: [],
  },
];

export const getResearchArticleById = (id: string): ResearchArticle | undefined => {
  // Create a deep copy to avoid modifying the original data if comments are added client-side
  const article = featuredResearch.find(article => article.id === id);
  return article ? JSON.parse(JSON.stringify(article)) : undefined;
};


export interface TrendingTopic {
  id: string;
  name: string;
  icon: LucideIcon;
  details: string;
}

export const trendingTopicsData: TrendingTopic[] = [
  {
    id: 'tt1',
    name: 'AI in Drug Discovery',
    icon: Lightbulb,
    details: 'Artificial Intelligence (AI) is revolutionizing the field of drug discovery by accelerating research, reducing costs, and improving the success rate of new therapies. AI algorithms can analyze vast datasets to identify potential drug candidates, predict their efficacy and side effects, and optimize clinical trial designs. This topic explores the latest AI models, success stories, and ethical considerations in AI-driven pharmaceutical research.\n\nKey areas include:\n- Machine learning for target identification\n- Generative AI for novel molecule design\n- Predictive modeling for clinical trial outcomes\n- AI in repurposing existing drugs',
  },
  {
    id: 'tt2',
    name: 'Personalized Oncology',
    icon: Zap,
    details: 'Personalized oncology aims to tailor cancer treatment to the individual characteristics of each patient and their tumor. By analyzing genomic, proteomic, and other molecular data, clinicians can select therapies that are most likely to be effective while minimizing toxicity. This section delves into advancements in targeted therapies, immunotherapy, liquid biopsies, and the challenges of implementing personalized medicine in routine cancer care.\n\nFocus points:\n- Genomic profiling and biomarker discovery\n- Advances in immunotherapy (e.g., CAR T-cell therapy)\n- Liquid biopsies for early detection and monitoring\n- Ethical and economic aspects of personalized cancer care',
  },
  {
    id: 'tt3',
    name: 'Microbiome and Mental Health',
    icon: FileText,
    details: 'The gut microbiome, the complex community of microorganisms residing in our digestive tract, is increasingly recognized for its profound impact on brain function and mental health. Research is uncovering links between microbiome dysbiosis and conditions like depression, anxiety, and neurodevelopmental disorders. This topic covers the gut-brain axis, the role of probiotics and prebiotics, and emerging therapeutic strategies targeting the microbiome for mental well-being.\n\nTopics of interest:\n- The gut-brain axis communication pathways\n- Impact of diet and lifestyle on the microbiome\n- Probiotics, prebiotics, and psychobiotics\n- Fecal microbiota transplantation (FMT) in mental health',
  },
  {
    id: 'tt4',
    name: 'Longevity Research & Senolytics',
    icon: BookOpen,
    details: 'Longevity research seeks to understand the aging process and develop interventions to extend healthspan—the period of life spent in good health. Senolytics, drugs that selectively clear senescent (aging) cells, are a promising area of investigation. This topic explores the biology of aging, the potential of senolytics and other anti-aging strategies, and the societal implications of extending human lifespan.\n\nKey discussions involve:\n- Hallmarks of aging\n- Mechanisms of cellular senescence\n- Development and clinical trials of senolytic drugs\n- Lifestyle interventions for healthy aging (e.g., caloric restriction, exercise)',
  },
];

export const getTrendingTopicById = (id: string): TrendingTopic | undefined => {
  return trendingTopicsData.find(topic => topic.id === id);
};

