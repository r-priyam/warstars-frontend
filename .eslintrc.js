module.exports = {
    extends: ['@antfu', 'plugin:prettier/recommended'],
    plugins: ['prettier', 'simple-import-sort'],
    rules: {
        'import/order': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error'
    }
};
