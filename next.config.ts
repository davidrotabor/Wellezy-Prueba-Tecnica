import type { NextConfig } from 'next'
const path = require('path')
 
const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/sass')],
    prependData: '@import "main.sass"'
  },
}
 
export default nextConfig