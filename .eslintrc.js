module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "mocha": true,
        "node": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2016,
        "sourceType": "module",
        "amd": true,
        "ecmaFeatures": {
            //"jsx": true,
            "modules": true,
            "experimentalObjectRestSpread": true
        }
    },

    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": 'off',
        "no-unused-vars": [
            "error",
            {
                "varsIgnorePattern": "should|expect"
            }
        ]

    }
};
