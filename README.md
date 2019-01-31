#Adonis Ally Provider

**A Collection of Providers for Adonis Ally**


###Install

`npm install --save allyproviders  @adonisjs/ally` or `yarn add allyproviders  @adonisjs/ally`


###Usage

- Register the provider

The provider needs to be registered inside `start/app.js` file.

```
const providers = [
  '@adonisjs/ally/providers/AllyProvider'
]
```

- Register the driver 

The driver must be registered as a hook inside `app/hooks.js` file.

```
const { ioc } = require('@adonisjs/fold')
const { hooks } = require('@adonisjs/ignitor')

const { mydriver } = require('allyproviders') //E.g const { bitbucket } = require('allyproviders')

hooks.before.providersRegistered(() => {
  ioc.extend('Adonis/Addons/Ally', 'mydriver', () => mydriver) //E.g ioc.extend('Adonis/Addons/Ally', 'bitbucket', () => bitbucket)
})
```

- Configure driver

Configuration data are defined inside `config/services.js` file under ally object. 
```
//...
ally: {
  mydriver: {
    clientId: '',
    clientSecret: '',
    redirectUri: ''
  },
  bitbucket: {
    clientId: '',
    clientSecret: '',
    redirectUri: ''
  }
}
//...
```

###Getting Started

**Redirect user to 3rd party website**
```
    await ally.driver('mydriver').redirect()
```

**Get redirect URL back**
```
const url = await ally.driver('mydriver').getRedirectUrl()
```

**Get user details on the redirect URL**
```
const user = await ally.driver('mydriver').getUser()
```

**Returns the user details using Access token or / and Access secret**
```
const user = await ally.driver('mydriver').getUserByToken(accessToken, [accessSecret])
```

###More Documentation

Check out the [official documentation](http://adonisjs.com/docs/social-auth)

###Tests
Tests are written using [japa](http://github.com/thetutlage/japa). Run the following commands to run tests.
```
npm run test
```

###Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Some commit message'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request 😉😉

###How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or Any Social Media? Spread the word!

Don't forget to [follow me on twitter](https://twitter.com/iamraphson)!

Thanks!
Ayeni Olusegun.

###License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
