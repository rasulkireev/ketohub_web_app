import { RootDomainPipe } from './root-domain.pipe';

describe('RootDomainPipe', () => {

  const pipe = new RootDomainPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should remove protocol prefix from URL', function() {
    expect(pipe.transform('http://foo.com')).toBe('foo.com');
    expect(pipe.transform('https://foo.com')).toBe('foo.com');
  });

  it('should remove subdomains from URL', function() {
    expect(pipe.transform('blog.foo.com')).toBe('foo.com');
    expect(pipe.transform('www.bar.com')).toBe('bar.com');
    expect(pipe.transform('members.newsletter.bar.com')).toBe('bar.com');
  });

  it('should remove path/query/fragment from URL', function() {
    expect(pipe.transform('foo.com/u/active?name=joe#page1')).toBe('foo.com');
  });

  it('should remove port number from URL', function() {
    expect(pipe.transform('foo.com:443')).toBe('foo.com');
  });

  it('should remove everything from URL', function() {
    expect(pipe.transform('https://www.foo.com:443/bar?baz=1#z')).toBe('foo.com');
  });
});
