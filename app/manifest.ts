import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Wloom Studio - We Cultivate Digital Reality',
    short_name: 'Wloom',
    description: 'Creative digital studio specializing in 3D web experiences, interactive design, and modern web development.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#FFB7C5',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
