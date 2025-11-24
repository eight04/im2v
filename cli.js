#!/usr/bin/env node

import * as fs from 'fs/promises';
import path from 'path';

import glob from "tiny-glob";
import {withFile} from "tmp-promise";
import {execa} from "execa";
import {ArgumentParser} from "argparse";

import pkg from './package.json' with {type: 'json'};

const parser = new ArgumentParser({
  description: pkg.description
});

parser.add_argument('-v', '--version', {action: 'version', version: pkg.version});
parser.add_argument('-i', '--input', {help: 'Input file(s) (supports glob patterns)', required: true, nargs: '+'});
parser.add_argument('-o', '--output', {help: 'Output file', required: true});
parser.add_argument('-d', '--delay', {help: 'Delay between images in seconds', default: 1, type: Number});

const args = parser.parse_args();

const files = [];

for (const filePath of args.input) {
  try {
    const absPath = path.resolve(filePath);
    await fs.access(absPath);
    files.push(absPath);
  } catch (err) {
    // pass
  }

  if (files.length === 0) {
    const matchedFiles = await glob(filePath);
    files.push(...matchedFiles.map(f => path.resolve(f)));
  }

  if (!files.length) {
    console.error(`No files found for path: ${filePath}`);
    process.exit(1);
  }
}

await withFile(async ({path: tempFilePath}) => {
  const lines = [];
  for (const file of files) {
    lines.push(`file '${file.replace(/'/g, "'\\''")}'`);
    lines.push(`duration ${args.delay}`);
  }
  lines.push(`file '${files[files.length - 1].replace(/'/g, "'\\''")}'`);
  
  await fs.writeFile(tempFilePath, lines.join('\n'), 'utf-8');

  await execa({stdio: "inherit"})`ffmpeg -f concat -safe 0 -i ${tempFilePath} ${args.output}`;
});
