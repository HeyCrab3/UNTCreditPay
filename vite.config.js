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
          rewrite: path => path.replace(/^\/devapi/, '')
        }
    }
  }
};
