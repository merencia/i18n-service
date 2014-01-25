var should = require('should'),
	expect = require('expect.js')

var env = {}

describe('i18n-service', function(){
	beforeEach(function(){
		env.LOCALES_FOLDER = process.env.LOCALES_FOLDER;
	})

	afterEach(function(){
		process.env.LOCALES_FOLDER = env.LOCALES_FOLDER;
	})

	it("should throw a exception if LOCALES_FOLDER isn't setted", function(done){
		delete process.env.LOCALES_FOLDER
		expect(require('../i18n-service')).to.throwException("LOCALES_FOLDER not defined.")

		done()
	});

	it("should be ok if LOCALES_FOLDER is setted", function(done){
		process.env.LOCALES_FOLDER = "../test/locales/";
		app = require('../i18n-service')
		app.should.be.ok;
		done()
	});
});