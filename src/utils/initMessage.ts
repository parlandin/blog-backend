import chalk from "chalk";
import figlet, { Fonts } from "figlet";

const font: Fonts[] = [
  "Ghost",
  "Graceful",
  "ANSI Shadow",
  "Delta Corps Priest 1",
  "Elite",
];

const chalkRainbow = (text: string | any) => {
  if (typeof text !== "string") {
    return;
  }

  const rainbow = [
    chalk.red,
    chalk.yellow,
    chalk.green,
    chalk.blue,
    chalk.magenta,
    chalk.cyan,
  ];
  return text
    .split("")
    .map((char, i) => rainbow[i % rainbow.length](char))
    .join("");
};

const initMessage = () => {
  figlet.text(
    "Parlan API",
    {
      font: font[1],
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 100,
      whitespaceBreak: false,
    },
    function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(chalkRainbow(data));
    }
  );
};

export default initMessage;
