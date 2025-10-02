export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/BMugesh',
    icon: 'github',
    color: 'hover:bg-gray-700 hover:text-white'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/balamugeshmk',
    icon: 'linkedin',
    color: 'hover:bg-blue-600 hover:text-white'
  }
];

export default socialLinks;
