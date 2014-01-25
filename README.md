#i18n-service
[![Build Status](https://travis-ci.org/lucasmerencia/i18n-service.png?branch=package)](https://travis-ci.org/lucasmerencia/i18n-service) [![Code Climate](https://codeclimate.com/repos/52e2b552e30ba02d4f003ad7/badges/fccff24c48efdb6b794d/gpa.png)](https://codeclimate.com/repos/52e2b552e30ba02d4f003ad7/feed) [![Dependency Status](https://gemnasium.com/lucasmerencia/i18n-service.png)](https://gemnasium.com/lucasmerencia/i18n-service) [![Coverage Status](https://coveralls.io/repos/lucasmerencia/i18n-service/badge.png)](https://coveralls.io/r/lucasmerencia/i18n-service)

A simple i18n service.

## Usage

First you need create a json file in locales folder with the locale name, for example, `en.json`.
The file content needs to follow the flow structure.

```json
{
  "en" : {
    "hello" : "hello",
    "something": "Some text",
    "views" : {
      "login" : {
        "title": "Login page",
        "email": "E-mail",
        ...
      }
    }
    ...
  }
}

```
Your new locale will be available on `http://localhost:3000/en`

You can have how many locales you want. For example:

 - `http://localhost:3000/en`
 - `http://localhost:3000/es`
 - `http://localhost:3000/pt`
 - `http://localhost:3000/pt-br`
 
You can set the locales folder by environment variable, setting LOCALES_FOLDER=/your/locales/folder/
 

## Translating

You can get the literals by three ways.

#### Getting all locale literals

To get all locale literals you just call the url `http://localhost:3000/{locale}/translate`

#### Getting a list of literals

To get a list of literals you need pass the required list by query string, for example: `http://localhost:3000/en?l=hello,something`

#### Getting a part of literals

You can get a part of your literal callin the service passing the part by query string, for example:
`http://localhost:3000/en?l=views.login`

The result will be:
```json
{
  "views" : {
    "login" : {
      "title": "Login page",
      "email": "E-mail",
      ...
    }
  }
}

```

