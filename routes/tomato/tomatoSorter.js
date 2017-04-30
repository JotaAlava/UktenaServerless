/**
 * Created by Jose on 4/22/2017.
 */
var _ = require('underscore'),
// Basically, figure out if east of greenwich... if so subtract instead of adding.
  resolveOffsetSign = function (offsetInHours) {
    var result = offsetInHours;

    if (offsetInHours > 0) {
      result = offsetInHours * -1;
    }

    return result;
  },
  addHours = function (date, hoursToAdd) {
    date.setTime(date.getTime() + (hoursToAdd * 60 * 60 * 1000));
    return date;
  },
  sortByDate = function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.createdAt) - new Date(a.createdAt);
  };


module.exports = function tomatoSorter(data, options) {
  var offsetInHours = options.utcOffset,
    dataToMapOver = [];

  if (data.Items.length === 1) {
    dataToMapOver = [data.Items[0]];
  } else {
    dataToMapOver = data.Items;
  }

  var itemsAsArray = _.map(dataToMapOver, function (val, key, list) {
    var targetTime = new Date(val.attrs.createdAt);

    // Massage dates to account for client's timezone...
    var hoursToAdd = resolveOffsetSign(offsetInHours);
    val.attrs.createdAt = addHours(targetTime, hoursToAdd).toISOString();

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