# i18n-service

A simple node i18n service

## Adding a new locale

First you need create a json file in locales folder with the locale name, for example, `en.json`.
The file content needs to follow the flow structure

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
Your new locale will be available on `http://localhost:3000/en/translate`

You can have how many locales you want. For example:

 - `http://localhost:3000/en/translate`
 - `http://localhost:3000/es/translate`
 - `http://localhost:3000/pt/translate`
 - `http://localhost:3000/pt-br/translate`

## Translating

You can get the literals by three ways

### Getting all locale literals

To get all locale literals you just call the url `http://localhost:3000/{locale}/translate`

### Getting a list of literals

To get a list of literals you need pass the required list by query string, for example: `http://localhost:3000/en/translate?literals=hello,something`

### Getting a part of literals

You can get a part of your literal callin the service passing the part by query string, for example:
`http://localhost:3000/en/translate?literals=views.login`

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

