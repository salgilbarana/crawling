const axios = require("axios");
const cheerio = require("cheerio");

let html = "";

function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

async function getHtml(year, month, day) {
  try{ //  http://m.tjmedia.co.kr/tjsong/song_Popular.asp?SYY=2018&SMM=07&SDD=29&EYY=2018&EMM=07&EDD=31
    return await axios.get(`http://m.tjmedia.co.kr/tjsong/song_Popular.asp?SYY=${year}&SMM=${month}&SDD=01&EYY=${year}&EMM=${month}&EDD=${day}`)
  }catch (error){
    console.log(error);
  }
}

async function getSmp(year, month, day ) {

  month = pad(month, 2);
  day = pad(day, 2);

  // if (!html) {
    html = await getHtml(year, month, day);
  // }
const $ = cheerio.load(html.data);
let smp = [];
$('table.board_type1').find('tr').each(function(i, ele){
    smp[i] = {
      order: $(this).find('td:nth-of-type(1)').text(),
      orderNumber: $(this).find('td:nth-of-type(2)').text(),
      title: $(this).find('td:nth-of-type(3)').text(),
      singer:  $(this).find('td:nth-of-type(4)').text()
    }
  })

  return smp;
}
module.exports = {getSmp };



