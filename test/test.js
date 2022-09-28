describe('Sample Test', () => {
  const add = (a, b) => (
    a + b
  );

  test('add 3 + 7 to equal 10', () => {
    expect(add(3, 7)).toBe(10);
  });
});
