const https = require('https')
const moment = require('moment')

const parse = require('./parse')

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

  this.csv_options = {
    columns: true,
    auto_parse: true,
    skip_empty_lines: true
  }
}

Adwords.prototype.query = async function(awql) {
  const csv = await this.request(awql)
  return await parse.parseAwqlResponse(csv, this.csv_options)
}

Adwords.prototype.build = function({ report, operator='SELECT', fields, date }) {
  const req_fields = fields.join(',')
  const report_string = '+FROM+' + report
  let from_date, to_date, date_range, merged_date

  if(date.from && date.to) {
    from_date = moment(date.from).format('YYYYMMDD')
    to_date = moment(date.to).format('YYYYMMDD')
    merged_date = '+DURING+' + from_date + ',' + to_date
  } else {
    merged_date = date.range
  }

  const query = operator + '+' + req_fields + report_string + merged_date
  return query
}

Adwords.prototype.request = async function(awql) {
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