```ts
formatCurrency(1.83, { noDecimal: true }); // '2'
formatCurrency(0.00000000089912, { maximumDecimalTrailingZeroes: 5 }); // '0.0₉8991'
formatCurrency(0.00000000089912, { symbol: "$", maximumDecimalTrailingZeroes: 5 }); // '$0.0₉8991'
formatCurrency(0.00000000000000655383766, { symbol: "$", maximumDecimalTrailingZeroes: 5 }); // '$0.0₁₄6554'
formatCurrency(1000.12345, { decimalPlaces: 3 }); // '1,000.123'
formatCurrency(3220.12345, { symbol: "$", decimalPlaces: 3 }); // '$3,220.123'
formatCurrency(6553.83766, { symbol: "$", abbreviated: true, decimalPlaces: 3 }); // '$6.554k'

// With locale: 'es'
formatCurrency(0.00000000089912, { maximumDecimalTrailingZeroes: 5, locale: "es" }); // '0,0₉8991'
formatCurrency(0.00000000089912, { symbol: "$", maximumDecimalTrailingZeroes: 5, locale: "es" }); // '$0,0₉8991'
formatCurrency(1000.12345, { decimalPlaces: 3, locale: "es" }); // '1.000,123'
formatCurrency(3220.12345, { symbol: "$", decimalPlaces: 3, locale: "es" }); // '$3.220,123'
formatCurrency(6553.83766, { symbol: "$", abbreviated: true, decimalPlaces: 3, locale: "es" }); // '$6.554k'

// Trim
trimTailingZero("-33.33000000"); //=> '-33.33'
trimTailingZero("-33.000000"); //=> '-33'
trimTailingZero(".000000"); //=> '0'
```
