LOCALES=./test/locales/

test:
	# @$(MAKE) lint
	@echo TRAVIS_JOB_ID: $(TRAVIS_JOB_ID)
	@NODE_ENV=test LOCALES_FOLDER=$(LOCALES) ./node_modules/mocha/bin/mocha test/*.js

test-cov:
	@NODE_ENV=test  LOCALES_FOLDER=$(LOCALES) ./node_modules/.bin/istanbul cover \
		./node_modules/mocha/bin/_mocha -- -R spec

test-coveralls:
	@NODE_ENV=test  LOCALES_FOLDER=$(LOCALES) ./node_modules/.bin/istanbul cover \
        ./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec && \
                cat ./coverage/lcov.info | ./node_modules/.bin/coveralls --verbose

.PHONY: all test clean