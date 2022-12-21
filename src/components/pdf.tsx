import { Card } from "./types";
import jsPDF, { ImageOptions } from "jspdf";

export const generatePdf = async (cards: Card[]) => {
  const doc = new jsPDF();

  let position: 0 | 1 | 2 | 3 | 4 = 0;

  const preparePosition = (): [number, number] => {
    if (position === 0) {
      position = 1;
      return [30, 30]; // set position to top left image
    }
    if (position === 1) {
      position = 2;
      return [93, 30]; // set position to top right image
    }
    if (position === 2) {
      position = 3;
      return [30, 118]; // set position to lower left image
    }
    if (position === 3) {
      position = 4;
      return [93, 118];
    }
    if (position === 4) {
      doc.addPage();
      position = 1;
      return [30, 30];
    }
    return [300, 300];
  };

  cards.forEach((card) => {
    const [x, y] = preparePosition();

    const imageOptions: ImageOptions = {
      imageData: new Uint8Array(card.image),
      width: 63,
      height: 88,
      x,
      y,
    };
    doc.addImage(imageOptions);
    doc.setFontSize(8);
    doc.setTextColor("#7262c0");
    doc.text("PROXY", x + 40, y + 53);
  });

  doc.save("proxy-cards.pdf");
};
