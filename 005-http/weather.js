const https = require('https');
const config = require("./config.js");
const userPlace = process.argv[2];
const myAPIkey = process.env.myAPIkey || config.myAPIkey;

if (!userPlace) {
  console.log('Пожалуйста, напишите название города на английском');
  process.exit();
}
const findUrl = `https://www.meteosource.com/api/v1/free/find_places?text=${userPlace}&language=en&key=${myAPIkey}`;

https.get(findUrl, (res) => {
  let rawData = '';

  res.on('data', (chunk) => {
    rawData += chunk;
  });

  res.on('end', () => {
    const data = JSON.parse(rawData);

    if (!data.length) {
      console.log('Город не найден. Напишите название на английском');
      return;
    }

    const placeId = data[0].place_id;

    getWeather(placeId);
  });
});

function getWeather(placeId) {
  const url = `https://www.meteosource.com/api/v1/free/point?place_id=${placeId}&sections=current&language=en&units=auto&key=${myAPIkey}`;

  https
    .get(url, (res) => {
      const { statusCode } = res;

      if (statusCode !== 200) {
        console.log(`statuscode: ${statusCode}`);
        return;
      }

      res.setEncoding('utf8');
      let rawData = '';

      res.on('data', (chunk) => {
        rawData += chunk;
      });

      res.on('end', () => {
        let parseData = JSON.parse(rawData);
        console.log(parseData);
      });
    })
    .on('error', (err) => {
      console.error(err);
    });
}
