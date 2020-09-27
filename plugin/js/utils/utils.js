const utils = {
  addLineBreak: (text) =>
    text
      .split("")
      .map((char, index) => {
        if (index > 0 && index % 7 === 0) {
          return `${char}\n`;
        }
        return char;
      })
      .join(""),
};
