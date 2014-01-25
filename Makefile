test-cov: istanbul

istanbul:
	LOCALES_FOLDER=./test/locales/ istanbul cover ./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec

coveralls:
	cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage