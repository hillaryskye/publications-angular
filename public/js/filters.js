// app.filter('physicalElectronic', function() {
//     return function(input) {
//       return input ? 'physical' : 'electronic'
//   }
// })

app.filter('FREE', function() {
  console.log('in filter')
  return function(input) {
    if (input === '0' | input === 0) {
      console.log('in if in filter')
    return 'FREE'
  } else { return '$' + input }
  }
})
