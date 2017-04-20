# adwords-js
Node.js unofficial library for Google AdWords API

**NOTE:** This package is unfinished and not suitable for production use as of yet.

## Requirements
A valid Adwords **`developerToken`**, **`clientCustomerId`** and **`accessToken`**

## Example
```javascript
const Adwords = require('adwords-js')

const adwords = new Adwords({
  developer_token     : 'your_developer_token',
  client_customer_id  : 'your_client_customer_id',
  access_token        : 'your_access_token'
})

const awql_query = 'SELECT + Id, Criteria, Clicks, Cost, Impressions \
                    FROM + KEYWORDS_PERFORMANCE_REPORT + DURING + LAST_7_DAYS'

adwords.request(awql_query)
.then(keywords => {
  /*
    Keyword ID, Keyword,  Clicks, Cost, Impressions
    41941982,   keyword2, 0,      0,    0
    41943412,   keyword3, 0,      0,    0
    41941972,   keyword1, 0,      0,    0
    590120091,  keyword6, 0,      0,    0
    41943402,   keyword5, 0,      0,    0
    295056043,  keyword4, 0,      0,    0
  */
})
.catch(err => {
  console.log(err)
  // e.g. "AuthenticationError.OAUTH_TOKEN_INVALID"
})
```
