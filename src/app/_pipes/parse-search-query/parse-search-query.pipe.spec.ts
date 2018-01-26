import { ParseSearchQueryPipe } from './parse-search-query.pipe';
import { SearchParams } from '../../_classes/search-params';

describe('ParseSearchQueryPipe', () => {
  const pipe = new ParseSearchQueryPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should create a single keyword from a single letter', () => {
    expect(pipe.transform('a')).toEqual(new SearchParams(['a'], []));
  });

  it('should create a single keyword from a single word', () => {
    expect(pipe.transform('cheese')).toEqual(new SearchParams(['cheese'], []));
  });

  it('should lowercase all letters', () => {
    expect(pipe.transform('chEEse')).toEqual(new SearchParams(['cheese'], []));
  });

  it('should create multiple keywords from a multiple words', () => {
    expect(pipe.transform('salmon bacon cheese')).toEqual(new SearchParams(['salmon', 'bacon', 'cheese'], []));
  });

  it('should treat commas as spaces', () => {
    expect(pipe.transform('apple,orange,lemon')).toEqual(new SearchParams(['apple', 'orange', 'lemon'], []));
  });

  it('should treat commas as spaces', () => {
    expect(pipe.transform('apple, orange, lemon')).toEqual(new SearchParams(['apple', 'orange', 'lemon'], []));
  });

  it('should ignore consecutive spaces', () => {
    expect(pipe.transform('ham         cheese')).toEqual(new SearchParams(['ham', 'cheese'], []));
  });

  it('should ignore leading spaces', () => {
    expect(pipe.transform('     ham cheese')).toEqual(new SearchParams(['ham', 'cheese'], []));
  });

  it('should ignore trailing spaces', () => {
    expect(pipe.transform('ham cheese   ')).toEqual(new SearchParams(['ham', 'cheese'], []));
  });

  it('should treat quoted strings as exact match', () => {
    expect(pipe.transform('"sour cream" onions')).toEqual(new SearchParams(['sour cream', 'onions'], []));
  });

  it('should accept quoted entire query', () => {
    expect(pipe.transform('"flourless chocolate cake"')).toEqual(new SearchParams(['flourless chocolate cake'], []));
  });

  it('should ignore unmatched double quote', () => {
    expect(pipe.transform('"sour cream')).toEqual(new SearchParams(['sour', 'cream'], []));
  });

  it('should remove keywords when other keywords contain the substrings', () => {
    expect(pipe.transform('chicken chick')).toEqual(new SearchParams(['chicken'], []));
  });

  it('should handle a keyword that is a substring of excluded terms', () => {
    expect(pipe.transform('bread -shortbread -gingerbread')).toEqual(new SearchParams(['bread'], ['shortbread', 'gingerbread']));
  });

  it('should ignore duplicate keywords', () => {
    expect(pipe.transform('duck duck goose')).toEqual(new SearchParams(['duck', 'goose'], []));
  });

  it('should parse excluded terms', () => {
    expect(pipe.transform('foo bar -baz -biz')).toEqual(new SearchParams(['foo', 'bar'], ['baz', 'biz']));
  });

  it('should ignore incomplete excluded terms', () => {
    expect(pipe.transform('chicken -')).toEqual(new SearchParams(['chicken'], []));
  });

  it('should ignore hanging exclude prefix', () => {
    expect(pipe.transform('chicken - pesto')).toEqual(new SearchParams(['chicken', 'pesto'], []));
  });
});
