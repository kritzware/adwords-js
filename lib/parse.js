const csvParser = require('csv-parse')

module.exports = {

  parseAwqlResponse : async (raw_csv, { columns=true, auto_parse=true, skip_empty_lines=true }) => {
    return new Promise((resolve, reject) => {
      csvParser(raw_csv, {
        columns,
        auto_parse,
        skip_empty_lines
      }, (err, output) => {
        if(err) reject(err)
        else resolve(output)
      })
    })
  }

}