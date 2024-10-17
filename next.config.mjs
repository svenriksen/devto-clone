/** @type {import('next').NextConfig} */
import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
 
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});
export default withMDX(nextConfig)
