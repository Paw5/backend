import { jest } from '@jest/globals';
import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';

iconv.encodings = encodings;

jest.useFakeTimers();
