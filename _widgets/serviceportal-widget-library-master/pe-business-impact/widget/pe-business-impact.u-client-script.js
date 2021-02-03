function BusinessImpactController() {
  var c = this;
  c.alert = c.data.alert;

  c.stats = [{
    name: 'Services',
    value: c.alert.cis.length
  },
  {
    name: '$ Per Hour',
    value: c.alert.summaryStats.revenue + 'M'
  },
  {
    name: 'Users',
    value: c.alert.summaryStats.users + 'K'
  }];
}