import { Request, Response } from "express";
import { getWordOfDay } from "../scrappers/getWordOfDay";

export const getWordOfDayJsonController = async (
  req: Request,
  res: Response
) => {
  try {
    let data = await getWordOfDay();

    const { image, ...rest } = data;

    res.json({
      ...rest,
      credits: "todos os direitos de: https://www.dicio.com.br/",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar palavra do dia");
  }
};

export const getWordOfDayImageController = async (
  req: Request,
  res: Response
) => {
  try {
    let data = await getWordOfDay();

    const { image, ...rest } = data;

    //@ts-ignore
    const imgBuffer = Buffer.from(image, "base64");

    res.writeHead(200, {
      "Content-Type": "image/jpeg", // ou 'image/png' dependendo do tipo da imagem
      "Content-Length": imgBuffer.length,
    });

    res.end(imgBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar imagem");
  }
};
