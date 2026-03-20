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
      },
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
        context: (pagePath) => {
        const breadcrumbsData = {
          '/pages/about/index.html': [
            { label: 'Главная', url: '/' },
            { label: 'О производстве', url: '/pages/about/index.html' },
          ],
          '/pages/corporate-clients/index.html': [
            { label: 'Главная', url: '/' },
            { label: 'Оптовым и корпоративным клиентам', url: '/pages/corporate-clients/index.html' },
          ],
          '/pages/payment-and-delivery/index.html': [
            { label: 'Главная', url: '/' },
            { label: 'Оплата и доставка', url: '/pages/payment-and-delivery/index.html' },
          ],
          '/pages/news-and-posts/index.html': [
            { label: 'Главная', url: '/' },
            { label: 'Новости и статьи', url: '/pages/news-and-posts/index.html' },
          ],
          '/pages/gallery/index.html': [
            { label: 'Главная', url: '/' },
            { label: 'Галерея', url: '/pages/gallery/index.html' },
          ],
          '/pages/catalog/index.html': [
            { label: 'Главная', url: '/' },
            { label: 'Магазин', url: '/pages/catalog/index.html' },
          ],
          '/pages/product-card/index.html': [
            { label: 'Главная', url: '/' },
            { label: 'Карточка товара', url: '/pages/product-card/index.html' },
          ],
          '/pages/sign-up/index.html': [
            { label: 'Главная', url: '/' },
            { label: 'Регистрация', url: '/pages/sign-up/index.html' },
          ],
          '/pages/adress/index.html': [
            { label: 'Главная', url: '/' },
            { label: 'Адрес и реквизиты', url: '/pages/adress/index.html' },
          ],
          '/pages/account/index.html': [
            { label: 'Главная', url: '/' },
            { label: 'Личный кабинет', url: '/pages/account/index.html' },
          ],
          '/pages/orders-history/index.html': [
            { label: 'Главная', url: '/' },
            { label: 'Личный кабинет', url: '/pages/account/index.html' },
            { label: 'История заказов', url: '/pages/orders-history/index.html' },
          ],
          '/pages/sign-in/index.html': [
            { label: 'Главная', url: '/' },
            { label: 'Вход', url: '/pages/sign-in/index.html' },
          ],
          '/pages/payment-history/index.html': [
            { label: 'Главная', url: '/' },
            { label: 'История транзакций', url: '/pages/payment-history/index.html' },
          ],
          '/pages/password/index.html': [
            { label: 'Главная', url: '/' },
            { label: 'Восстановление пароля', url: '/pages/password/index.html' },
          ],
          '/pages/contact-info/index.html': [
            { label: 'Главная', url: '/' },
            { label: 'Личный кабинет', url: '/pages/account/index.html' },
            { label: 'Контактная информация', url: '/pages/contact-info/index.html' },
          ],
          '/pages/cart/index.html': [
            { label: 'Главная', url: '/' },
            { label: 'Корзина', url: '/pages/cart/index.html' },
          ],
          '/pages/order/index.html': [
            { label: 'Главная', url: '/' },
            { label: 'Личный кабинет', url: '/pages/account/index.html' },
            { label: 'Заказ', url: '/pages/order/index.html' },
          ],
          '/pages/ordering/index.html': [
            { label: 'Главная', url: '/' },
            { label: 'Корзина', url: '/pages/cart/index.html' },
            { label: 'Заказ', url: '/pages/ordering/index.html' },
          ],
        };
        return {
          crumbs: breadcrumbsData[pagePath] || []
        };
      }
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
