import { generateKeyPairSync } from 'crypto';
import { readFileSync, writeFileSync } from 'fs';

export const gen_key_pair = () => {
  // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
  const keyPair = generateKeyPairSync('rsa', {
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem', // Most common formatting choice
    },
    privateKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem', // Most common formatting choice
    },
  });

  // Create the public key file
  writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey);
  // Create the private key file
  writeFileSync(__dirname + '/id_rsa_priv.pem', keyPair.privateKey);
};

export const get_key_pair = () => {
  let priv_key_buff: Buffer;
  let pub_key_buff: Buffer;

  try {
    priv_key_buff = readFileSync(`${__dirname}/../../lib/jwt/id_rsa_priv.pem`);
    pub_key_buff = readFileSync(`${__dirname}/../../lib/jwt/id_rsa_pub.pem`);
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes('no such file or directory')) gen_key_pair();
      else throw e;
      priv_key_buff = readFileSync(
        `${__dirname}/../../lib/jwt/id_rsa_priv.pem`,
      );
      pub_key_buff = readFileSync(`${__dirname}/../../lib/jwt/id_rsa_pub.pem`);
    }
  }

  return {
    priv_key: priv_key_buff.toString(),
    pub_key: pub_key_buff.toString(),
  };
};
