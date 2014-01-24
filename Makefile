test-cov: istanbul

istanbul:
	LOCALES_FOLDER=./test/locales/ ./node_modules/.bin/istanbul cover _mocha -- -R spec ./test

coveralls:
	cat ./coverage/lcov.info | ./node_modules/.bin/coveralls