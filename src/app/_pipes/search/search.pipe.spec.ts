import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {

  const pipe = new SearchPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should match recipes with keyword in title', () => {
    expect(
      pipe.transform([{ title: 'the foo recipe', ingredients: [] }], ['foo']).length)
      .toBe(1);
  });

  it('should match recipes with keyword in ingredients', () => {
    expect(
      pipe.transform([
        {
          title: 'the bar recipe',
          ingredients: ['baz', 'the foo ingredient'],
        },
      ], ['foo']).length)
      .toBe(1);
  });

  it('should match recipe titles regardless of letter case', () => {
    expect(
      pipe.transform([
        {
          title: 'the BAR recipe',
          ingredients: ['baz', 'the foo ingredient'],
        },
      ], ['bar']).length)
      .toBe(1);
  });

  it('should match recipe titles regardless of letter case', () => {
    expect(
      pipe.transform([
        {
          title: 'the bar recipe',
          ingredients: ['baz', 'the FOO ingredient'],
        },
      ], ['foo']).length)
      .toBe(1);
  });

  it('should not match recipes that do not contain keyword', () => {
    expect(
      pipe.transform([
        {
          title: 'the bar recipe',
          ingredients: ['baz', 'bam'],
        },
      ], ['foo']).length)
      .toBe(0);
  });

  it('should match recipes where both keywords match', () => {
    expect(
      pipe.transform([
        {
          title: 'apple bacon chips',
          ingredients: ['foo', 'bar'],
        },
      ], ['apple', 'bacon']).length)
      .toBe(1);
  });

  it('should not match recipes where only one keyword matches', () => {
    expect(
      pipe.transform([
        {
          title: 'apple bacon chips',
          ingredients: ['foo', 'bar'],
        },
      ], ['apple', 'banana']).length)
      .toBe(0);
  });

  it('should not match ingredients that only match when concatenated', () => {
    expect(
      pipe.transform([
        {
          title: 'holiday chocolate surprise',
          ingredients: ['chocolate', 'caramel'],
        },
      ], ['chocolatecaramel']).length)
      .toBe(0);
  });

  it('should not match recipes that only match when concatenating title and first ingredient', () => {
    expect(
      pipe.transform([
        {
          title: 'holiday chocolate surprise',
          ingredients: ['chocolate', 'caramel'],
        },
      ], ['surprisechocolate']).length)
      .toBe(0);
  });
});
