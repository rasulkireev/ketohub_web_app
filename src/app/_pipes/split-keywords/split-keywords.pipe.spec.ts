import { SplitKeywordsPipe } from './split-keywords.pipe';

describe('SplitKeywordsPipe', () => {

  const pipe = new SplitKeywordsPipe();

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should create a single keyword from a single letter', () => {
    expect(pipe.transform('a')).toEqual(['a']);
  });

  it('should create a single keyword from a single word', () => {
    expect(pipe.transform('cheese')).toEqual(['cheese']);
  });

  it('should lowercase all letters', () => {
    expect(pipe.transform('chEEse')).toEqual(['cheese']);
  });

  it('should create multiple keywords from a multiple words', () => {
    expect(pipe.transform('salmon bacon cheese')).toEqual(['salmon', 'bacon', 'cheese']);
  });

  it('should ignore consecutive spaces', () => {
    expect(pipe.transform('ham         cheese')).toEqual(['ham', 'cheese']);
  });

  it('should remove keywords when other keywords contain the substrings', () => {
    expect(pipe.transform('chicken chick')).toEqual(['chicken']);
  });
});
