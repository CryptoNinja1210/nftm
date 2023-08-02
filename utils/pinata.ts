const key = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const secret = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;
const jwt = process.env.NEXT_PUBLIC_PINATA_API_JWT

const axios = require('axios');
const FormData = require('form-data');

export const uploadJSONToIPFS = async(data: any) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //making axios POST request to Pinata ⬇️
  let body = JSON.stringify(data);

  return axios
    .post(url, body, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      }
    })
    .then(function (response: any) {
        return {
          success: true, //"https://ipfs.io/ipfs/" + response.data.IpfsHash
          pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
        };
    })
    .catch(function (error: any) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
  });
};

export const uploadFileToIPFS = async(file: any) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  //making axios POST request to Pinata ⬇️

  let data = new FormData();
  data.append('file', file);

  const metadata = JSON.stringify({
    name: 'upload',
    keyvalues: {
        title: 'file upload'
    }
  });
  data.append('pinataMetadata', metadata);

  //pinataOptions are optional
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: 'FRA1',
          desiredReplicationCount: 1
        },
        {
          id: 'NYC1',
          desiredReplicationCount: 2
        }
      ]
    }
  });
  data.append('pinataOptions', pinataOptions);

  //pinataContent are optional
  const pinataContent = JSON.stringify({
    "somekey": "somevalue"
  })
  data.append('pinataContent', pinataContent);

  return axios
    .post(url, data, {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      }
    })
    .then(function (response: any) {
      return {
        success: true,
        pinataURL: "https://ipfs.io/ipfs/" + response.data.IpfsHash
      };
    })
    .catch(function (error: any) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
  });
};