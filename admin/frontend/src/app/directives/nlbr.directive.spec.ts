import { NlbrDirective } from './nlbr.directive';
import { ElementRef } from '@angular/core';

describe('NlbrDirective', () => {
  it('should create an instance', () => {
    const directive = new NlbrDirective(new ElementRef({}));
    expect(directive).toBeTruthy();
  });
});
