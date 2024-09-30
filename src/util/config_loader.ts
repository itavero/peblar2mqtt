import {Configuration} from '../models/config';
import YAML from 'yaml';
import * as fs from 'fs';

export function loadConfig(): Configuration | undefined {
  // Try to read config.yml or yaml, first from the current directory, then from /config/ (if it exists)
  try {
    let file_path = './config.yml';
    if (!fs.existsSync(file_path)) {
      file_path = './config.yaml';
    }
    if (!fs.existsSync(file_path)) {
      file_path = '/config/config.yml';
    }
    if (!fs.existsSync(file_path)) {
      file_path = '/config/config.yaml';
    }
    if (!fs.existsSync(file_path)) {
      throw new Error('No config file found');
    }

    const file = fs.readFileSync(file_path, 'utf8');
    const raw = YAML.parse(file);
    return raw as Configuration;
  } catch (e) {
    console.error('Error loading config file:', e);
  }
  return undefined;
}
