import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default {
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  server:{
    proxy: {
      '/devapi': {
          target: 'https://uegapi.moyudalu.com',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/devapi/, '')
        },
        '/apiv2': {
          target: 'https://bbs.acozycotage.net/api/',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/apiv2/, '')
        },
        '/bbs-proxy': {
          target: 'https://bbs.acozycotage.net/',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/bbs-proxy/, '')
        },
    }
  }
};
