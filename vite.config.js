import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import handlebars from 'vite-plugin-handlebars';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { hulakPlugins } from 'vite-plugin-hulak-tools';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const base = process.env.NODE_ENV === 'production' ? '/nuts/' : '/';

export default defineConfig({
  base: base,

  server: {
    port: 3000,
    open: true
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  plugins: [
    createHtmlPlugin(),

    hulakPlugins({
      enableHandlebars: false,
    }),

    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), './public/img/icons/')],
      symbolId: 'icon-[name]',
    }),

    handlebars({
      reloadOnPartialChange: true,
      partialDirectory: [path.resolve(__dirname, "./src/html/")],
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
         baseUrl(path) {
          const urlPath = typeof path === 'string' ? path : '';
          const cleanPath = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath;
          return `${base}${cleanPath}`;
        },

      },
      context: {},
    }),
  ],

  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',

    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './index.html'),
        about: path.resolve(__dirname, './pages/about/index.html'),
        order: path.resolve(__dirname, "./pages/order/index.html"),
        cart: path.resolve(__dirname, "./pages/cart/index.html"),
        catalog: path.resolve(__dirname, "./pages/catalog/index.html"),
        gallery: path.resolve(__dirname, "./pages/gallery/index.html"),
        'payment-and-delivery': path.resolve(__dirname, "./pages/payment-and-delivery/index.html"),
        'corporate-clients': path.resolve(__dirname, "./pages/corporate-clients/index.html"),
        'news-and-posts': path.resolve(__dirname, "./pages/news-and-posts/index.html"),
        'contact-info': path.resolve(__dirname, "./pages/contact-info/index.html"),
        'one-news': path.resolve(__dirname, "./pages/one-news/index.html"),
        'order-redirect': path.resolve(__dirname, "./pages/order-redirect/index.html"),
        'password-recovery': path.resolve(__dirname, "./pages/password-recovery/index.html"),
        'product-card': path.resolve(__dirname, "./pages/product-card/index.html"),
        'sign-in': path.resolve(__dirname, "./pages/sign-in/index.html"),
        'sign-up': path.resolve(__dirname, "./pages/sign-up/index.html"),
      },
    },
  }
});
