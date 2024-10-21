import { IconType } from "react-icons";
import { ImFileExcel, ImFileMusic, ImFileOpenoffice, ImFilePdf, ImFilePicture, ImFileText2, ImFileVideo, ImFileWord, ImFileZip } from "react-icons/im";

// Settings color for the Icon
const defaultIcon: IconType = ImFileText2;
const defaultColor = "rgb(75 85 99)";
const textpink500 = "rgb(236 72 153)";
const textgreen600 = "rgb(22 163 74)";
const textred600 = "rgb(220 38 38)";
const textblue600 = "rgb(37 99 235)";

const textorange500 = "rgb(249 115 22)";
const textblue400 = "rgb(96 165 250)";
const textslate600 = "rgb(71 85 105)";

const textyellow600 = "rgb(202 138 4)";
const textneutral600 = "rgb(82 82 82)";

const IconMap: { [key: string]: { icon: IconType; color: string } } = {
  txt: { icon: ImFileText2, color: defaultColor },

  xls: { icon: ImFileExcel, color: textgreen600 },
  xlsx: { icon: ImFileExcel, color: textgreen600 },
  pdf: { icon: ImFilePdf, color: textred600 },
  doc: { icon: ImFileWord, color: textblue600 },
  docx: { icon: ImFileWord, color: textblue600 },
  ppt: { icon: ImFileOpenoffice, color: textorange500 },
  pptx: { icon: ImFileOpenoffice, color: textorange500 },
  rtf: { icon: ImFileText2, color: defaultColor },

  png: { icon: ImFilePicture, color: textblue400 },
  jpg: { icon: ImFilePicture, color: textblue400 },
  jpeg: { icon: ImFilePicture, color: textblue400 },
  gif: { icon: ImFilePicture, color: textblue400 },

  mp3: { icon: ImFileMusic, color: textpink500 },
  ape: { icon: ImFileMusic, color: textpink500 },
  wav: { icon: ImFileMusic, color: textpink500 },
  aac: { icon: ImFileMusic, color: textpink500 },
  ogg: { icon: ImFileMusic, color: textpink500 },
  flac: { icon: ImFileMusic, color: textpink500 },

  mp4: { icon: ImFileVideo, color: textslate600 },
  avi: { icon: ImFileVideo, color: textslate600 },
  mov: { icon: ImFileVideo, color: textslate600 },
  mkv: { icon: ImFileVideo, color: textslate600 },

  zip: { icon: ImFileZip, color: textyellow600 },
  rar: { icon: ImFileZip, color: textyellow600 },
  tar: { icon: ImFileZip, color: textyellow600 },
  gz: { icon: ImFileZip, color: textyellow600 },

  js: { icon: ImFileText2, color: textneutral600 },
  py: { icon: ImFileText2, color: textneutral600 },
  html: { icon: ImFileText2, color: textneutral600 },
  htm: { icon: ImFileText2, color: textneutral600 },
  css: { icon: ImFileText2, color: textneutral600 },
};

// Set default color
const getIconMap = (type: string) => {
  return IconMap[type] || { icon: defaultIcon, color: defaultColor };
};

export { getIconMap };
