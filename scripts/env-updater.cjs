module.exports.readVersion = function (contents) {
  const match = contents.match(/VITE_APP_VERSION\s*=\s*([\d.]+)/)
  if (!match) throw new Error('VITE_APP_VERSION not found in .env')
  return match[1]
}

module.exports.writeVersion = function (contents, version) {
  return contents.replace(
    /VITE_APP_VERSION\s*=\s*[\d.]+/,
    `VITE_APP_VERSION = ${version}`
  )
}
