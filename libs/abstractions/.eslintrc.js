const path = require('path');
module.exports = {
  "ignorePatterns": [
    "**/*.spec.ts"
  ],
  "extends": [
    "../../.eslintrc.js"
  ],
  "overrides": [
    {
      "files": [
        "*.ts"
      ],
      "parserOptions": {
        "project": [
          path.join(__dirname, "/tsconfig.lib.json")
        ],
        "createDefaultProgram": true
      }
    }
  ]
}
