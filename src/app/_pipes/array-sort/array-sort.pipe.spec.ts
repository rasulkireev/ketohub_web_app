import { ArraySortPipe } from './array-sort.pipe';

describe('ArraySortPipe', () => {
  const pipe = new ArraySortPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort objects in descending order', () => {
    expect(pipe.transform([
      { letter: 'c' },
      { letter: 'a' },
      { letter: 'b' },
    ], 'letter')).toEqual([
      { letter: 'c' },
      { letter: 'b' },
      { letter: 'a' },
    ]);
  });

  it('should sort undefined fields at the end', () => {
    expect(pipe.transform([
      { letter: 'c' },
      { letter: 'm' },
      { letter: 'r' },
      { letter: 'z' },
      { letter: 'y' },
      { banana: 'yes' },
      { letter: 'b' },
    ], 'letter')).toEqual([
      { letter: 'z' },
      { letter: 'y' },
      { letter: 'r' },
      { letter: 'm' },
      { letter: 'c' },
      { letter: 'b' },
      { banana: 'yes' },
    ]);
  });
});
