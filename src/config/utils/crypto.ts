import crypto from 'crypto';

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
 
function encrypt(text: any) {
 
 // Creating Cipheriv with its parameter
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 
 // Updating text
 let encrypted = cipher.update(text);
 
 // Using concatenation
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 
 // Returning iv and encrypted data
 return encrypted.toString('hex') ;
}

export default encrypt ;