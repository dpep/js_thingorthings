const should = require('chai').should()
const things = require('../index')


const findLengths = things(letters => {
  res = {}
  letters.forEach(x => res[x] = x.length)
  return res
})



describe('ThingOrThings', function() {
  it('should handle a thing', function() {
    findLengths('a').should.equal(1);
    findLengths('bb').should.equal(2);
    findLengths('ccc').should.equal(3);
  });


  it('should handle many things', function() {
    const res = findLengths([ 'a', 'bb', 'ccc' ])

    res.should.eql(res, {
      a: 1,
      bb: 2,
      ccc: 3
    })
  })

  it('should handle one packaged thing', function() {
    findLengths([ 'a' ]).should.eql(res, {
      a: 1,
    })
  })


  it('should handle no things', function() {
    findLengths([]).should.eql({});

    // but not passing anything should error
    should.Throw(() => findLengths(), Error);
  })


  it('should zip keys and values together', function() {
    const byTwo = things(numbers => numbers.map(x => x * 2))
    const res = byTwo([ 1, 2, 3 ])

    res.should.eql(res, {
      1: 2,
      2: 4,
      3: 6
    })
  })


  it('should expect every thing or no thing to be returned', function() {
    const returnA = things(() => { return { a: 1 } })
    const returnEmpty = things(() => {})

    should.not.Throw(() => returnA('a'), Error)
    should.Throw(() => returnA([ 'a', 'b' ]), Error)

    should.not.Throw(() => returnEmpty(), Error)
    should.not.Throw(() => returnEmpty(1), Error)
    should.not.Throw(() => returnEmpty([ 1, 2, 3 ]), Error)
  })
})
