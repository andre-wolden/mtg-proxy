export const wizardsPath = (fullUrl: string) => {
  const pattern = /^http:\/\/gatherer.wizards.com(.*)/;
  const match = fullUrl.match(pattern);
  return match ? match[1] : "no match";
};
