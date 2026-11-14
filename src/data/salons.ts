export interface Salon {
  name: string;
  address: string;
  distance: string;
  rating: string;
  reviews: number;
  image: string;
  slug: string;
  category?: string;
}

export const salons: Salon[] = [
  { name: 'Royal Blade Barbershop', address: '678 King Street, Royal Park', distance: '2.2 Km', rating: '4.9', reviews: 235, image: '/images/classic-haircut.jpg', slug: 'royal-blade' },
  { name: "The Gentlemen's Cut", address: '123 Maple Street, Downtown City', distance: '1.2 Km', rating: '4.8', reviews: 140, image: '/images/barber-stylist.jpg', slug: 'gentlemens-cut' },
  { name: 'The Classic Trim', address: '302 Sunset Boulevard, Westside', distance: '1.7 Km', rating: '4.7', reviews: 103, image: '/images/classic-haircut.jpg', slug: 'classic-trim' },
  { name: 'Urban Fade Studio', address: '45 Elm Avenue, Uptown District', distance: '1.2 Km', rating: '4.5', reviews: 170, image: '/images/barbershop-hero.jpg', slug: 'urban-fade' },
  { name: 'Sharp & Dapper', address: '89 Pearl Lane, Midtown Plaza', distance: '4.2 Km', rating: '4.7', reviews: 120, image: '/images/barber-stylist.jpg', slug: 'sharp-dapper' },
];

export const services = [
  { name: 'Hair Cut', count: 11, items: ['Classic cut', 'Skin fade', 'Scissor cut'] },
  { name: 'Beard Trim', count: 3, items: ['Beard shape-up', 'Hot towel trim', 'Full beard design'] },
  { name: 'Shave', count: 4, items: ['Classic shave', 'Head shave', 'Neck clean-up'] },
  { name: 'Hairstyling', count: 24, items: ['Wash & style', 'Texture styling', 'Special occasion'] },
  { name: 'Hair Wash', count: 4, items: ['Wash & rinse', 'Clarifying wash'] },
  { name: 'Scalp Massage', count: 5, items: ['Relaxing massage', 'Refresh treatment'] },
  { name: 'Facial Treatment', count: 7, items: ['Express facial', 'Face & beard refresh'] },
];
