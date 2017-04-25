/**
 * Created by Jose on 4/22/2017.
 */
var _ = require('underscore'),
  sortByDate = function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.createdAt) - new Date(a.createdAt);
  };

module.exports = function tomatoSorter(data) {
  var itemsAsArray = data.Items.length === 1 ? [data.Items[0].attrs] : _.map(data.Items, function (val, key, list) {
    return val.attrs;
  });

  // Group by date
  var groupedItems = _.groupBy(itemsAsArray, function (item, val) {
    return new Date(item.createdAt).toLocaleDateString();
  });

  // Sort the inner arrays...
  var groupedAndSorted = {};
  _.each(groupedItems, function (val, key, list) {
    groupedAndSorted[key] = val.sort(sortByDate);
  });

  // Get the dates with tomatoes
  var datesWithTomatoes = [];
  _.each(groupedAndSorted, function (val, key, list) {
    datesWithTomatoes.push(key);
  });

  // Sort the dates with tomatoes
  var result = [];
  var sortedDates = datesWithTomatoes.sort(function (a, b) {
    return new Date(b) - new Date(a);
  });

  // Insert them respecting order in the format expected by the client...
  _.each(sortedDates, function (val, key, item) {
    var row = {};
    row[val] = groupedAndSorted[val]
    result.push(row);
  });

  return result;
};