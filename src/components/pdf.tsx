import { CardWithImage } from "./types";
import jsPDF, { ImageOptions } from "jspdf";

export const generatePdf = async (cards: CardWithImage[]) => {
  const doc = new jsPDF();

  if (cards && cards[0]) {
    const imageOptions: ImageOptions = {
      imageData: new Uint8Array(cards[0].image),
      width: 63,
      height: 88,
      x: 30,
      y: 30,
    };
    doc.addImage(imageOptions);
  }

  doc.text("Hello world!", 10, 10);
  doc.save("proxy-cards.pdf");
};
