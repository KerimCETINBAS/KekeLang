### KekeLang - son derece işlevsiz programlama dili

It's just a part of study as how to make programming language

its only capable of do simple math operations

Assume a program of the form
```bash
 10 * 20 + ( 10 - 2 )
```

its parse and tokenize source like this

```bash
[
  Token { type: 6, value: '10' },
  Token { type: 11, value: '*' },
  Token { type: 6, value: '20' },
  Token { type: 11, value: '+' },
  Token { type: 9, value: '(' },
  Token { type: 6, value: '10' },
  Token { type: 11, value: '-' },
  Token { type: 6, value: '2' },
  Token { type: 10, value: ')' },
  Token { type: 21, value: '<EOF>' }
]
```

than creates ast based on tokens 

```bash
Program {
  kind: 'program',
  body: [
    BinaryExpression {
      kind: 'binary_expression',
      left: [BinaryExpression],
      right: [BinaryExpression],
      operator: '+'
    }
  ]
}

```

then evaluate asts as value

```bash
NumberValue { value: 208, type: 'number' }
```
### License
[MIT](./LICENSE)