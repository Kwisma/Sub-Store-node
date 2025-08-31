// build.js
const esbuild = require('esbuild');

const artifacts = [{ src: 'index.js', dest: 'dist/_worker.js' }];

(async () => {
    for (const artifact of artifacts) {
        await esbuild.build({
            entryPoints: [artifact.src],
            bundle: true,
            outfile: artifact.dest,
            sourcemap: false,
            minify: true,
            target: ['es2020'],
            format: 'esm',
            platform: 'browser',
            plugins: [
                {
                    name: 'fix-warnings',
                    setup(build) {
                        // 拦截所有 JS 文件
                        build.onLoad({ filter: /\.js$/ }, async (args) => {
                            // 读取源码（esbuild 已提供 args.path）
                            let source = await require('fs').promises.readFile(args.path, 'utf8');

                            // 修复 !instanceof
                            source = source.replace(/!\s*(\w+)\s+instanceof\s+(\w+)/g, '(!($1 instanceof $2))');

                            // 修复 == NaN
                            source = source.replace(/(\w+)\s*==\s*NaN/g, 'Number.isNaN($1)');

                            // 修复 eval
                            source = source.replace(/eval\((.*?)\)/g, 'new Function($1)()');

                            return { contents: source, loader: 'js' };
                        });
                    },
                },
            ],
        });
        console.log(`✔️ 打包完成: ${artifact.src} → ${artifact.dest}`);
    }
})();
