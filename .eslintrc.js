module.exports = {
    "env": {
        "commonjs": true,
        "es2020": true,
        "node": true 
    },
    "extends": ["airbnb-base", "prettier"],
        "parseOptions":{
            "ecmaVersion":11
        },
    "rules": {
        "no-console": "of",
        "no-unused-vars":[
            "error",
            {
            "argsIgnorePattern": "next"
            }
        ]
    }
}
