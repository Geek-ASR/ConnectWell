
import type { LucideIcon } from 'lucide-react';
import { MessageSquare, ShieldCheck } from 'lucide-react';

export interface FeaturedDiscussionItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  longSummary?: string; // Optional longer summary for detail page
  imageUrl: string;
  imageHint: string;
  icon: LucideIcon;
}

export const featuredDiscussions: FeaturedDiscussionItem[] = [
  {
    id: 'cd1',
    title: 'Managing Daily Pain: What Works for You?',
    category: 'Community Discussion',
    summary: 'Share and discover tips, tricks, and routines that fellow members use to cope with daily chronic pain and improve quality of life.',
    longSummary: 'This discussion is a space for individuals living with chronic pain to openly share their experiences and discover practical strategies that others have found helpful. From medication management and alternative therapies to lifestyle adjustments and emotional coping mechanisms, every contribution is valuable. Our aim is to build a collective wisdom that empowers members to better navigate their daily lives with pain.',
    imageUrl: 'https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzdXBwb3J0JTIwZ3JvdXAlMjBkaXNjdXNzaW9ufGVufDB8fHx8MTc0OTQ5MjEzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'support group discussion',
    icon: MessageSquare,
  },
  {
    id: 'cd2',
    title: 'Navigating Doctor Appointments: A Patient\'s Guide',
    category: 'Shared Experience',
    summary: 'Tips on preparing for appointments, advocating for your needs, and building a strong relationship with your healthcare team.',
    longSummary: 'Effectively communicating with healthcare providers is crucial for managing chronic conditions. This guide and discussion area offers insights on how to prepare for medical appointments, ask the right questions, understand your treatment options, and advocate for your needs. Learn from shared experiences to build a more collaborative and productive relationship with your doctors.',
    imageUrl: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9ufGVufDB8fHx8MTc0OTQ5MjEzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'doctor patient consultation',
    icon: ShieldCheck,
  },
];

export const getFeaturedDiscussionById = (id: string): FeaturedDiscussionItem | undefined => {
  return featuredDiscussions.find(discussion => discussion.id === id);
};
