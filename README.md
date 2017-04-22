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

/* Construt AWQL query */
const awql = adwords.build({
  report: 'KEYWORDS_PERFORMANCE_REPORT',
  fields: [
    "Id",
    "Criteria",
    "Clicks",
    "Cost",
    "Impressions"
  ],
  date: {
    from : '2017-04-18',
    to   : '2017-04-22'
    // range: 'LAST_7_DAYS'
  }
})
/*
  SELECT+Id,Criteria,Clicks,Cost,Impressions+FROM+KEYWORDS_PERFORMANCE_REPORT+DURING+20170418,20170422
*/

adwords.query(awql)
.then(res => {
  /*
  [ 
    { 'Keyword ID': 295056043,
      Keyword: 'keyword1',
      Clicks: 0,
      Cost: 0,
      Impressions: 0
    },
    { 'Keyword ID': 41943402,
      Keyword: 'keyword2',
      Clicks: 0,
      Cost: 0,
      Impressions: 0
    } 
  ]
  */
})
.catch(err => {
  // e.g. "AuthenticationError.OAUTH_TOKEN_INVALID"
})
```
