const fs = require('fs');
const path = require('path');
const { build } = require('esbuild');

const objectHasOwnPolyfill = require.resolve('core-js/actual/object/has-own');

!(async () => {
    const pkg = JSON.parse(
        await fs.promises.readFile(
            './src/sub/backend/package.json',
            'utf8'
        )
    );
    const version = pkg.version;
    const mainVersion = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8'),
    ).version.trim();
    const dist = 'dist/_worker.js'
    const artifacts = [
        { src: 'src/worker.js', dest: dist },
    ];

    for await (const artifact of artifacts) {
        await build({
            entryPoints: [artifact.src],
            bundle: true,
            minify: true,
            sourcemap: false,
            platform: 'browser',
            format: 'esm',
            outfile: artifact.dest,
            inject: [objectHasOwnPolyfill],
            define: {
                __VERSION__: `"${version}"`
            }
        });

        fs.writeFileSync(
            path.join(__dirname, dist),
            `// SUB_STORE_NODE_VERSION: ${mainVersion}
${fs.readFileSync(path.join(__dirname, dist), {
                encoding: 'utf8',
            })}`,
            {
                encoding: 'utf8',
            },
        );
        console.log(`✔️ 打包完成: ${artifact.src} → ${artifact.dest}`);
    }
})()
    .catch((e) => {
        console.log(e);
    })
    .finally(() => {
        console.log('done');
    });
