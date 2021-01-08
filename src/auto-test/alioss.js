const OSS = require('ali-oss');
const fs = require('fs');

async function uploadToOSS(fileName) {
  const client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'ACCESSKEYID',
    accessKeySecret: 'ACCESSKEYSECRET',
    bucket: 'roc-auto-test',
  });
  const path = `./screenshot/${fileName}.png`;
  const result = await client.putStream(`${fileName}.png`, fs.createReadStream(path));
  return client.signatureUrl(result.name, { expires: 604800 }); //  7天
}

module.exports = {
  uploadToOSS
};