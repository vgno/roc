import { isFunction } from 'lodash';

export default function createReadme(name, dir, extension, rocCommandObject) {
    const {
        projectExtensions
    } = rocCommandObject;
    const rows = [];

    rows.push(`# ${name}`, '');

    // If we are documenting a extensions we will want to use the description inside projectExtensions
    if (extension) {
        const description = isFunction(projectExtensions[0].description) ?
            projectExtensions[0].description(rocCommandObject, extension) :
            projectExtensions[0].description;

        rows.push(description, '');
    } else {
        // Could add a function / property on the roc.config.js file that can be used
        rows.push('This is automatically generated documentation for your Roc project.', '');
    }

    if (extension) {
        // Do nothing at this time
    } else {
        const packages = projectExtensions.filter((extn) => extn.type === 'package');
        const plugins = projectExtensions.filter((extn) => extn.type === 'plugin');

        rows.push('## Extensions');
        rows.push('The extensions that are used in the project.');
        rows.push('### Packages');
        if (packages.length > 0) {
            packages.forEach((pkg) => {
                rows.push(`#### ${pkg.name} — [v${pkg.version}](https://www.npmjs.com/package/${pkg.name})`);
                const description = isFunction(pkg.description) ?
                    pkg.description(rocCommandObject, extension) :
                    pkg.description;

                rows.push(description);
            });
        } else {
            rows.push('No packages.');
        }

        rows.push('### Plugins');
        if (plugins.length > 0) {
            plugins.forEach((plugin) => {
                rows.push(`#### ${plugin.name} — [v${plugin.version}](https://www.npmjs.com/package/${plugin.name})`);
                const description = isFunction(plugin.description) ?
                    plugin.description(rocCommandObject, extension) :
                    plugin.description;

                rows.push(description);
            });
        } else {
            rows.push('_No plugins._');
        }
    }

    rows.push('## Documentation');
    [
        'Actions', 'Commands', 'Configuration', 'Dependencies', 'Hooks', 'Settings', 'Extensions'
    ].forEach((group) => {
        rows.push(`- [${group}](/${dir}/${group})`);
    });
    rows.push('');
    rows.push('---');
    rows.push('_Generated by [Roc](https://github.com/rocjs/roc)_');
    return rows.join('\n');
}