export const wizardsPath = (fullUrl: string) => {
  // const pattern = /^http:\/\/gatherer.wizards.com(.*)/;
  const pattern = /^https:\/\/cards.scryfall.io(.*)/;
  const match = fullUrl.match(pattern);
  console.log("match");
  console.log(match);
  return match ? match[1] : "no match";
};
