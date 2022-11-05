import { CardWithImage } from "./types";

export const generatePdf = async (cards: CardWithImage[]) => {
  // const doc = new jsPDF();

  console.log("generating pdf");

  // cards.map(async (card) => {
  //   const pattern = /^http:\/\/gatherer.wizards.com(.*)/;
  //
  //   const match = card.imageUrl.match(pattern);
  //   const url = match ? match[1] : "no match";
  //
  //   console.log(url);
  //
  //   fetch(url)
  //     .then((res) => res.text())
  //     .then((res) => console.log(res));
  // });

  // doc.text("Hello world!", 10, 10);
  // doc.save("a4.pdf");
};
