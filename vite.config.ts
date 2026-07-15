import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
	base: '/wordle-pro-ui/',
	server: {
		port: 5173,
		host: '127.0.0.1',
		hmr: {
			// Use the dev subdomain for HMR so it matches your Caddyfile
			host: 'dev.wordle-pro.dev',
			clientPort: 443,
			protocol: 'wss',
		},
	},
	preview: {
		port: 4173,
		strictPort: true,
		host: '127.0.0.1',
		allowedHosts: ['wordle-pro.dev'],
		// No HMR needed for preview since it's a static build		
	},  
  plugins: [
		tanstackRouter({
			target: 'react',
			autoCodeSplitting: false, // needs to be false so github pages can load any route and have access to all the code
      routeToken: '_layout',
		}),    
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },  
})
