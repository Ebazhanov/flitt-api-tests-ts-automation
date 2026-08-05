import * as crypto from 'crypto';

export function generateSignature(params: Record<string, any>, secretKey: string): string {
  // 1. Exclude 'signature' field and empty/undefined values
  const filteredKeys = Object.keys(params).filter(
    (key) =>
      key !== 'signature' && params[key] !== '' && params[key] !== null && params[key] !== undefined
  );

  // 2. Sort keys alphabetically
  filteredKeys.sort();

  // 3. Concatenate values with '|', placing secretKey at the beginning
  const values = filteredKeys.map((key) => params[key]);
  const signatureString = [secretKey, ...values].join('|');

  // 4. Generate SHA-1 hash
  return crypto.createHash('sha1').update(signatureString, 'utf8').digest('hex');
}
