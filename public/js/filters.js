// app.filter('physicalElectronic', function() {
//     return function(input) {
//       return input ? 'physical' : 'electronic'
//   }
// })

app.filter('FREE', function() {
  return function(input) {
    if (input === 0) {
    return 'FREE'
  } else { return '$' + input }
  }
})
