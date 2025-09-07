const globals = require("globals");

module.exports = [
    {
        ignores: ["**/*.config.js", "node_modules/**", "dist/**", "**/*spec.ts"],
    },
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: require("@typescript-eslint/parser"),
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            parserOptions: {
                project: ["apps/**/tsconfig.app.json", "globals/tsconfig.lib.json", "libs/**/tsconfig.lib.json"],
                tsconfigRootDir: __dirname,
            },
        },
        plugins: {
            "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
            "@stylistic": require("@stylistic/eslint-plugin"),
        },
        rules: {
            "@typescript-eslint/interface-name-prefix": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-undef": "off",
            "@typescript-eslint/no-floating-promises": ["error"],
            "@typescript-eslint/no-unused-vars": ["error", { vars: "all", args: "none" }],
            "no-var-requires": "off",
            "@typescript-eslint/no-empty-function": 0,
            "@stylistic/comma-dangle": ["error"],
            "@stylistic/comma-spacing": ["error"],
            "@stylistic/member-delimiter-style": ["error"],
            "@stylistic/no-extra-semi": ["error"],
            "@typescript-eslint/no-for-in-array": ["error"],
            "@typescript-eslint/no-use-before-define": ["error"],
            "@typescript-eslint/no-useless-constructor": ["error"],
            "@stylistic/space-before-blocks": ["error"],
            "@typescript-eslint/require-await": ["error"],
            "padded-blocks": ["error", { blocks: "always", classes: "always", switches: "always" }],
            "no-multiple-empty-lines": ["error", { max: 1, maxBOF: 1 }],
            "no-useless-catch": "error",
            semi: ["error"],
            "object-curly-spacing": ["error", "always"],
            "no-empty": ["error"],
            indent: ["error", 4, { SwitchCase: 1 }],
            "@stylistic/no-multi-spaces": ["error", { ignoreEOLComments: false }],
            "@stylistic/type-annotation-spacing": ["error", { before: false, after: true }],
            "@stylistic/semi-spacing": ["error"],
        },
    },
];
