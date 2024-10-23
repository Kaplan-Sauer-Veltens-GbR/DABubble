import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root'
})
export class WordlistService {
  translocoService: TranslocoService = inject(TranslocoService);

  constructor() { }

/**
 * 
 * @param trimOrFirst 
 * @param input 
 * @returns 
 */

  translate(trimOrFirst: boolean | string, ...input: string[]): string {
    let trim: boolean;
    if (typeof trimOrFirst === 'boolean') {
      trim = trimOrFirst;
    } else {
      input.unshift(trimOrFirst);
      trim = true;
    }
  
    let translation = '';
    input.forEach(word => {
      translation += this.translocoService.translate('wordlist.' + word) + ' ';
    });
  
    return trim ? translation.trim() : translation;
  }
}
