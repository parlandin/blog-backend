import axios from "axios";
import * as cheerio from "cheerio";
import {
  createWordOfTheDay,
  getWordOfTheDay,
} from "../repository/wordOfTheDay.repository";
import { envConfig } from "../configs/env.config";

const {
  SCRAPPER: { WORD_OF_DAY_URL },
} = envConfig;

const getDateForText = (string: string) => {
  const regex = /\((\d{2}\/\d{2}\/\d{4})\)/;
  const match = string.match(regex);

  if (!match) {
    return null;
  }

  return match[1];
};

function getCurrentDate(): string {
  const today = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
  const [date] = today.split(", ");
  const [day, month, year] = date.split("/");

  return `${day}/${month}/${year}`;
}

async function paseImageToBase64(image: string): Promise<string | null> {
  try {
    const response = await axios.get(image, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "binary");
    return buffer.toString("base64");
  } catch (error) {
    console.error("Erro ao converter imagem:", error);
    return null;
  }
}

export const getWordOfDay = async () => {
  const currentDate = getCurrentDate();
  console.log("Data atual:", currentDate);

  const wordOfTheDay = await getWordOfTheDay(currentDate);

  if (wordOfTheDay) {
    console.log("Palavra do dia encontrada no banco de dados");
    return wordOfTheDay;
  }

  console.log("Buscando palavra do dia");

  //buscar a data atual no banco de dados e retornar a palavra do dia

  // se a data atual não estiver no banco de dados, buscar no site e salvar no banco de dados

  const { data: html } = await axios.get(WORD_OF_DAY_URL);

  const $ = cheerio.load(html);

  const titleDate = $(".word-of-day > h2").first().text();
  const date = getDateForText(titleDate);

  //if (date === currentDate) {

  const word = $(".word-of-day .word-of-day--text-wrap h3 a").first().text();
  const sub = $(".word-of-day .word-of-day--text-wrap p span.cl")
    .first()
    .text();

  const listOfMeanings = $(".word-of-day .word-of-day--text-wrap p")
    .first()
    .find("span:not([class])")
    .toArray();

  const etimology = $(".word-of-day .word-of-day--text-wrap p span.etim")
    .first()
    .text();

  const meanings = listOfMeanings.map((meaning) => $(meaning).text());

  //image

  const image = $(".word-of-day picture img").first().attr("src");
  const imageBase64 = await paseImageToBase64(image || "");

  //salva no banco de dados
  const wordOfTheDayData = {
    date: currentDate,
    word,
    sub,
    meanings: meanings,
    etimology,
    image: imageBase64,
  };

  await createWordOfTheDay(wordOfTheDayData);

  return wordOfTheDayData;
};
