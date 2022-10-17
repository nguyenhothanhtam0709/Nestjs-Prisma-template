import * as path from 'path';
import * as fs from 'fs';

const appRoot = fs.realpathSync(process.cwd());

export const rootResolve = path.resolve.bind(path, appRoot);
