import { createSocialImage, SOCIAL_IMAGE_SIZE } from '@/lib/social-image';

export const alt = 'DevOP — AI engineering, computer vision and custom software';
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return createSocialImage();
}
