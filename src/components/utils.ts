export const wizardsPath = (fullUrl: string) => {
  const pattern = /^http:\/\/gatherer.wizards.com(.*)/


  const match =  fullUrl.match(pattern)
  console.log(match)
  const url = match ? match[1] : "no match"

  return url
}