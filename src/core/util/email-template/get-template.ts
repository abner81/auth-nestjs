import * as fs from 'fs';

export const getTemplate = (absolutPath: string): string => {
  return fs.readFileSync(absolutPath, 'utf-8');
};
