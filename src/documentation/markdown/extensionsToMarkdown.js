import { isFunction } from 'lodash';

export default function extensionsToMarkdown(name, usedExtensions, rocCommandObject, extension) {
    const rows = [];

    const packages = usedExtensions.filter((extn) => extn.type === 'package' &&
        extn.name !== rocCommandObject.pkg.name);
        // FIXME
    const plugins = usedExtensions.filter((extn) => extn.type === 'plugin' &&
        extn.name !== rocCommandObject.pkg.name);
        // FIXME

    rows.push('# Extensions for `' + name + '`', '');

    rows.push('The extensions that are used in the project, indirect and direct.');
    rows.push('## Packages');
    if (packages.length > 0) {
        packages.forEach((pkg) => {
            rows.push(`### ${pkg.name} — [v${pkg.version}](https://www.npmjs.com/package/${pkg.name})`);
            const description = isFunction(pkg.description) ?
                pkg.description(rocCommandObject, extension) :
                pkg.description;

            rows.push(description);
        });
    } else {
        rows.push('No packages.');
    }

    rows.push('## Plugins');
    if (plugins.length > 0) {
        plugins.forEach((plugin) => {
            rows.push(`### ${plugin.name} — [v${plugin.version}](https://www.npmjs.com/package/${plugin.name})`);
            const description = isFunction(plugin.description) ?
                plugin.description(rocCommandObject, extension) :
                plugin.description;

            rows.push(description);
        });
    } else {
        rows.push('_No plugins._');
    }

    return rows.join('\n');
}