import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {

  const pipe = new CapitalizePipe();

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should capitalize lowercase strings', () => {
    expect(pipe.transform('cats')).toBe('Cats');
  });

  it('should leave uppercase strings uppercase', () => {
    expect(pipe.transform('HELLO DOLLY')).toBe('HELLO DOLLY');
  });

  it('should leave capitalized strings capitalized', () => {
    expect(pipe.transform('Welcome to KetoHub')).toBe('Welcome to KetoHub');
  });
});
