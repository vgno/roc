import { isBoolean, isPath, isString, notEmpty, required } from '../validation/validators';
import lazyFunctionRequire from '../helpers/lazyFunctionRequire';

const lazyRequire = lazyFunctionRequire(require);

const initOptions = {
    'list-versions': {
        alias: 'l',
        validator: isBoolean,
        description: 'List the available versions of a template.',
    },
    force: {
        alias: 'f',
        validator: isBoolean,
        description: 'Ignore non empty directory warning.',
    },
    clone: {
        validator: isBoolean,
        description: 'If git clone should be used when downloading the template.',
    },
};

const initArguments = {
    template: {
        validator: notEmpty(isPath),
        description: 'The template to use.',
    },
    version: {
        validator: notEmpty(isString),
        description: 'The version of the template to use.',
    },
};

export default {
    lock: {
        command: lazyRequire('./lock'),
        description: 'Locks down Roc dependencies to fixed alpha versions.',
    },
    create: {
        __meta: {
            name: 'Project creation',
            description: 'Commands that can be used to create new projects.',
        },
        init: {
            command: lazyRequire('./init'),
            description: 'Init a new project.',
            /* eslint-disable max-len */
            help: `
                Used to init new projects using special templates. If no template is given a prompt will ask you for one.
                The templates are fetched from GitHub or from a zip file and it's easy to create new ones.`,
            markdown: `
                The __init__ command can be used to initiate a new Roc project and currently expects that it is run inside an empty directory. As shown above it takes two optional arguments, template and version. If no template is given a prompt will be displayed with the possible alternatives that exist. Currently these alternatives are coded into Roc and matches \`web-app\` and \`web-app-react\`.

                __template__
                Template can either be a short name for a specific template, currently it accepts \`web-app\` and \`web-app-react\` that will be converted internally to \`rocjs/roc-template-web-app\` and \`rocjs/roc-template-web-app-react\`. The actual template reference is a GitHub repo and can be anything matching that pattern \`USERNAME/PROJECT\`.

                The template can also point to a local zip file (ending in \`.zip\`) of a template repository. This is useful if the template is in a private repo or not available on GitHub.

                It will also expect that the template has a folder named \`template\` that contains a \`package.json\` file with at least one dependency to a Roc package following the pattern \`roc-package-*\` or that it has a \`roc.config.js\` file (this file is then expected to have some [packages](/docs/config/packages.md) defined but this is not checked immediately).

                __version__
                Versions should match a tag on the GitHub repo and will default to master if none exists. When providing an input on the command line Roc will automatically add \`v\` in front of versions that starts with a number to match GitHub default conventions that have version tags that start with \`v\` like \`v1.0.0\`. \`master\` is also always available as an option.`,
            /* eslint-enable */
            options: initOptions,
            arguments: initArguments,
        },
        new: {
            command: lazyRequire('./init'),
            description: 'Create a new project.',
            help: `
                Alias for "init" that always will try to create a new directory.`,
            options: initOptions,
            arguments: {
                name: {
                    validator: required(notEmpty(isString)),
                    description: 'Name for a new directory to create the project in.',
                },
                ...initArguments,
            },
        },
    },
};
