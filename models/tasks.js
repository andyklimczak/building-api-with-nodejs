module.exports = app => {
  return {
    findAll: (params, callback) => {
      return callback([
        {title: 'buy some shoes'},
        {title: 'fix notebook'}
      ]);
    }
  };
};
