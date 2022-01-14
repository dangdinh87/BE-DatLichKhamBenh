const generatorID = (key) => {
  const ran = Math.floor(Math.random() * 99999999) + 10000000;
  return `${key}-${ran}`;
};

module.exports = { generatorID }
