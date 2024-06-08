import { Router } from "express";
import { getWordOfDay } from "@/scrappers/getWordOfDay";

const dayRoute = Router();

dayRoute.get("/json/word", async (req, res) => {
  try {
    let data = await getWordOfDay();

    const { image, ...rest } = data;

    res.json(rest);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar palavra do dia");
  }
});

dayRoute.get("/image/word", async (req, res) => {
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
});

export default dayRoute;
