const airtable = require('./airtable');

exports.get = (req, res) => {
  const { q } = req.query;
  if (q === undefined) {
    res.send('q not found');
  }
  const obj = {
    filterByFormula: `(SEARCH('${q.toUpperCase()}',{name}))`,
  };
  airtable(obj, (err, records) => {
    if (err) {
      return res.sendStatus(503);
    }
    if (records.length === 0) {
      return res.status(404).send('No Charity Found');
    }
    return res.send({ data: records.map(record => record.fields) });
  });
};
