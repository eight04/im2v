im2v
=========

[![test](https://github.com/eight04/im2v/actions/workflows/test.yml/badge.svg)](https://github.com/eight04/im2v/actions/workflows/test.yml)
[![Coverage Status](https://coveralls.io/repos/github/eight04/im2v/badge.svg?branch=master)](https://coveralls.io/github/eight04/im2v?branch=master)
[![install size](https://packagephobia.now.sh/badge?p=im2v)](https://packagephobia.now.sh/result?p=im2v)

A simple CLI tool to convert images to video.

The tool uses `ffprobe` and `ffmpeg` from [FFmpeg](https://ffmpeg.org/) to analyze the audio stream of the input video file. Make sure you have FFmpeg installed and accessible in your system's PATH.

Installation
------------

```
npm install -g im2v
```

Usage
-----

```
im2v -i *.png -o output.mp4 -d 5
```

Changelog
---------

* 0.1.0 (Nov 25, 2025)

  - First release.
