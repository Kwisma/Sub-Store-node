import esbuild from 'esbuild';
import { readFile } from 'fs/promises';
const pkg = JSON.parse(await readFile(new URL('./src/sub/backend/package.json', import.meta.url)));
const version = pkg.version;
const artifacts = [{ src: 'index.js', dest: 'dist/_worker.js' }];
(async () => {
    for (const artifact of artifacts) {
        await esbuild.build({
            entryPoints: [artifact.src], // 入口文件
            bundle: true, // 启用打包
            outfile: artifact.dest, // 输出文件
            sourcemap: true, // 生成 Source Map
            minify: true, // 压缩代码
            target: ['es2022'], // 目标环境
            format: 'esm', // 输出格式 CommonJS
            platform: 'browser', // 目标平台为浏览器
            logLevel: 'error',
            define: {
                __VERSION__: `"${version}"`,
            },
        });
        console.log(`✔️ 打包完成: ${artifact.src} → ${artifact.dest}`);
    }
})();
