import { getWordOfDay } from "../scrappers/getWordOfTheDay";

class WordOfTheDayService {
  static async getWordOfTheDay() {
    let data = await getWordOfDay();

    return data;
  }

  static async getWordInJson() {
    let data = await getWordOfDay();

    const { image, ...rest } = data;

    return {
      ...rest,
      credits: "todos os direitos de: https://www.dicio.com.br/",
    };
  }

  static async getWordImage() {
    let data = await getWordOfDay();

    const { image, ...rest } = data;

    //@ts-ignore
    const imgBuffer = Buffer.from(image, "base64");

    return imgBuffer;
  }
}

export default WordOfTheDayService;
