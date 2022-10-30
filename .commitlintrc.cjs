const fs = require('fs')
const path = require('path')

const getSubDirectories = (dir) => fs.readdirSync(dir).filter(item => fs.statSync(path.join(dir, item)).isDirectory())
const packages = getSubDirectories(path.resolve(__dirname, 'packages'))

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
			2,
			'always',
			[
				'build',
				'chore',
				'ci',
				'docs',
				'feat',
				'fix',
				'perf',
				'refactor',
				'revert',
				'style',
				'test',
			],
		],
    'scope-enum': [
      2,
      'always',
      [...packages],
    ],
    'footer-max-line-length': [0],
  },
}
