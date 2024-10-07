
import Parser from "./src/compailer/parser/parser";
import { createInterface } from "node:readline"
import { Evaluate } from "./src/runtime/interpreter";


const rl = createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.write("[kekelang]\n[repl e0.0.0]\n")
rl.prompt(true)

rl.on("line", line => {
    
    if(line == ":q") rl.close()
    const parser = new Parser(line)
    console.log(parser.Tokens)
    parser.CreateAst()
    
    console.dir(parser.Program)
    const result = Evaluate(parser.Program)
    console.log(result, "\n")
    rl.prompt(true)
})

