export function myRep(input) {
  return input
    .replace(/[{}]/g, '')
    .replace(/[\[\]]/g, '')
    .replace(/[\"]/g, '')
    .replace(/[,]/g, '')
}

export function sentenceCase(input, lowercaseBefore) {
  input = input === undefined || input === null ? '' : input
  if (lowercaseBefore) {
    input = input.toLowerCase()
  }
  return input
    .toString()
    .replace(/(^|\. *)([a-z])/g, function (match, separator, char) {
      return separator + ' ' + char.toUpperCase()
    })
}

export function prettyStringJson(payload) {
  var JSONstr = JSON.stringify(payload)
  let err = sentenceCase(myRep(JSONstr))
  let ar = (err.split('.'))
  for (let i in ar) {
    ar[i] = _.replace(ar[i], 'Non_field_errors:', '')
  }

  return ar
}
export function doNotify(vm, config, payload) {
  return vm.notify(config)
}


export function GetFormattedDate(string) {
  let payload = new Date(string)

  let month = `${(payload.getMonth() + 1 < 10 ? '0' : '') +
    (payload.getMonth() + 1)}`
  let day = `${(payload.getDate() < 10 ? '0' : '') + payload.getDate()}`
  let year = `${payload.getFullYear()}`

  return day + '/' + month + '/' + year
}