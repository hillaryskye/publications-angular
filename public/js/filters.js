// app.filter('physicalElectronic', function() {
//     return function(input) {
//       return input ? 'physical' : 'electronic'
//   }
// })

app.filter('FREE', function() {
  console.log('free outside')
  return function(input) {
    if (input === 0 || input === 0.0) {
      console.log('FREE inside')
    return 'FREE'
  } else { return input }
  }
})
