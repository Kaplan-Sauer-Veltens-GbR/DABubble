import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root'
})
export class WordlistService {
  private translocoService: TranslocoService = inject(TranslocoService);

  constructor() { }


  /**
   * Translates a list of words or applies string methods to the translated words.
   * 
   * @param {boolean | string | { [key: string]: string }} trimOrFirst - If a boolean is provided, it determines whether to trim the final result (removes the trailing space if true). 
   * If a string or an object is provided, it is treated as the first word, with or without string methods.
   * 
   * @param {...(string | { [key: string]: string })[]} input - A list of strings or objects representing words to be translated. 
   * If an object is provided, the key is the word to translate and the value is the string method (e.g., 'toUpperCase') to apply on the translated word.
   * 
   * @returns {string} - The translated and possibly transformed sentence, optionally trimmed.
   */
  translate(trimOrFirst: boolean | string | { [key: string]: string }, ...input: (string | { [key: string]: string })[]): string {
    let trim: boolean;
    let translation = '';

    if (typeof trimOrFirst === 'boolean') {
      trim = trimOrFirst;
    } else {
      input.unshift(trimOrFirst);
      trim = true;
    }

    input.forEach(word => {
      translation += this.processWord(word) + ' ';
    });

    return trim ? translation.trim() : translation;
  }

  /**
   * Translates a single word and optional applies a string method to the translated word.
   * 
   * @param {string | { [key: string]: string }} word - The word to be translated. 
   * If a string is provided, it will be translated. If an object is provided, the key is the word to translate and the value is the string method (e.g., 'toUpperCase') to apply on the translated word.
   * 
   * @returns {string} - The translated word, with the string method applied if an object was provided. Returns an empty string if the input is invalid.
   */
  private processWord(word: string | { [key: string]: string }): string {
    if (typeof word === 'string') {
      return this.translocoService.translate('wordlist.' + word);
    } else if (typeof word === 'object' && word !== null) {
      const key = Object.keys(word)[0];
      const method = word[key] as keyof String;
      let translatedWord = this.translocoService.translate('wordlist.' + key);

      if (typeof String.prototype[method] === 'function') {
        translatedWord = (String.prototype[method] as Function).call(translatedWord);
      } else {
        console.warn(method, 'is not a valid string method in wordlist.service');
      }
      return translatedWord;
    }
    return '';
  }

}
