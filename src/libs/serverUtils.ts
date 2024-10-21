"use server";
import sharp from "sharp";
/**
 * Compresses and resizes an image buffer.
 * @param buffer The input image data as a buffer.
 * @param width The desired width to resize the image to.
 * @param quality The quality of the JPEG output (default is 80).
 * @returns A promise that resolves to a buffer containing the processed image.
 */
export const compressImage = async (buffer: Buffer, width: number, quality: number = 80): Promise<Buffer> => {
  return sharp(buffer).resize({ width: width }).jpeg({ quality }).toBuffer();
};
