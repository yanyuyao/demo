/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  images: {
    loader: 'custom',
    formats: ['image/avif', 'image/webp'],
  },
  // experimental: {
  //   outputFileTracingExcludes: {
  //     '/app/api': ['./**/*'], // Use minimatch patterns to match files
  //   },
  // },
};
