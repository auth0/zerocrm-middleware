# zerocrm-middleware
Middleware for the Auth0 Extend ZERO CRM sample

## Overview
This middleware offers a custom programming model for the ZERO CRM application. It allows users to author extensions using a programming model of: `function (lead, cb)` and to access secrets globally.

Here is example illustrating using the Clearbit SDK to look up a lead.

```javascript
var clearbit = require('clearbit')(module.exports.secrets.clearbit_key);

module.exports = function(lead, cb) {
  console.log(lead.email);
  
  var Person = clearbit.Person;
  Person.find({email: lead.email}).
    then(person=> {
      lead.github = person.github.handle;
      lead.twitter = person.twitter.handle;
      lead.linkedin = person.linkedin.handle;
      console.log(lead);
      cb(null, lead);
    });
};
```

## License

Apache 2.0


