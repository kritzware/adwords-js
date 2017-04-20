const https = require('https')

function Adwords({
  developer_token=null,
  client_customer_id=null,
  access_token=null
}) {
  if(!developer_token || !client_customer_id || !access_token) {
    throw new Error('Missing required paramter, expected { developer_token, client_customer_id, access_token }')
  }
  this.developer_token = developer_token
  this.client_customer_id = client_customer_id
  this.access_token = access_token

  this.report_format = 'CSV'

  this.adwords_request_options = {
    hostname: 'adwords.google.com',
    path: '/api/adwords/reportdownload/v201702',
    port: 443,
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + this.access_token,
      'Content-Type': 'application/x-www-form-urlencoded',
      'developerToken': this.developer_token,
      'clientCustomerId': this.client_customer_id,
      skipReportHeader: true,
      skipReportSummary: true,
      useRawEnumValues: true
    }
  }
}

Adwords.prototype.request = function(awql) {
  return new Promise((resolve, reject) => {
    const req = https.request(this.adwords_request_options, res => {
      let body = ''
      res.setEncoding('utf8')
      res.on('data', chunk => {
        body += chunk
      })
      res.on('end', () => resolve(body))
      res.on('error', err => reject(err))
    })
    req.end('__rdquery=' + awql + '&__fmt=' + this.report_format)
  })
}

module.exports = Adwords