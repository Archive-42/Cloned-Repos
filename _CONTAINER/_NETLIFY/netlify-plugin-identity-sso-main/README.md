Netlify Build plugin identity-sso - Protect a site with SSO via identity.

## Install

The recommended way to install this right now is using a git npm dependency:

`package.json`

```js
{
  // ...
  "dependencies": {
    "netlify-plugin-identity-sso": "netlify/netlify-plugin-identity-sso#v0.1.0"
  }
}
```

`netlify.toml`

```toml
[[plugins]]
package = "netlify-plugin-identity-sso"
```

### Identity Setup

- Go to `Settings -> Identity` on your site and click `Enable Identity`
- Add a third-party auth provider, e.g. Google
- Setup the identity webhook:

  - URL: `https://<site-name>.netlify.app/.netlify/functions/sso-auth`
  - Secret: _Generate a long random string_
  - Events: _Tick all boxes_

- Set the webhook secret as a build environment variable `WEBHOOK_SECRET` for
  use in the function

## Gotchas

- **Do not use a cached directory for publishing.** For some reason this breaks
  writing of a custom `netlify.toml` as part of the build.
- This is hardcoded to allow any user with a `@netlify.com` email address.
