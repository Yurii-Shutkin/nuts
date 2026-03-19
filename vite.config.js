import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import handlebars from 'vite-plugin-handlebars';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { hulakPlugins } from 'vite-plugin-hulak-tools';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: '/',
  server: {
    port: 3000,
    open: true
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  plugins: [
    createHtmlPlugin(),

    hulakPlugins({
      enableHandlebars: true,
      handlebarsOptions: {
        partialDirectory: 'src/html/partials'
      }
    }),

    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'public/img/icons/')],
      symbolId: 'icon-[name]',
    }),

    handlebars({
        reloadOnPartialChange: true,
        partialDirectory: [path.resolve(__dirname, "src/html/")],
        helpers: {
          array(...args) {
            return args.slice(0, -1);
          },
          dict(...args) {
            const obj = {};
            for (let i = 0; i < args.length - 1; i += 2) {
              obj[args[i]] = args[i + 1];
            }
            return obj;
          },
          dataAttrs(attrs) {
            return Object.entries(attrs || {})
              .map(([key, value]) => `data-${key}="${value}"`)
              .join(" ");
          },
        },
        context: {
          
        },
      }),
  ],

  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'src/html/pages/about/index.html'),
        'payment-and-delivery': path.resolve(__dirname, "src/html/pages/payment-and-delivery/index.html"),
        'corporate-clients': path.resolve(__dirname, "src/html/pages/corporate-clients/index.html"),
        'news-and-posts': path.resolve(__dirname, "src/html/pages/news-and-posts/index.html"),
        'contact-info': path.resolve(__dirname, "src/html/pages/contact-info/index.html"),
      },
    },
  }
})
