import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {

  const pipe = new SearchPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should match recipes with keyword in title', () => {
    expect(
      pipe.transform([{ title: 'the foo recipe', ingredients: [] }], 'foo').length)
      .toBe(1);
  });

  it('should match recipes with keyword in ingredients', () => {
    expect(
      pipe.transform([
        {
          title: 'the bar recipe',
          ingredients: ['baz', 'the foo ingredient'],
        },
      ], 'foo').length)
      .toBe(1);
  });

  it('should not match recipes that do not contain keyword', () => {
    expect(
      pipe.transform([
        {
          title: 'the bar recipe',
          ingredients: ['baz', 'bam'],
        },
      ], 'foo').length)
      .toBe(0);
  });
});
