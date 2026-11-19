const calculator = require("./script")

describe("Testes Gerais", () =>{
    test("Teste Soma", () =>{
        expect(calculator.soma(2,3)).toBe(5);
        expect(calculator.soma(-3,4)).toBe(1);
    })
    test("Teste Subtração", () =>{
        expect(calculator.subtracao(12,5)).toBe(7);
        expect(calculator.subtracao(8,10)).toBe(-2);
    })
    test("Teste Multiplicação", () =>{
        expect(calculator.multiplicacao(3,4)).toBe(12);
    })
    test("Teste Divisão", () =>{
        expect(calculator.divisao(27,3)).toBe(9);
        expect( () => calculator.divisao(10,0)).toThrow("Erro: Divisão por zero");
    })
    test("Teste Potênciação", () =>{
        expect(calculator.potencia(2,5)).toBe(32);
        expect(calculator.potencia(3,3)).toBe(27);
    })
    test("Teste Radiciação", () =>{
        expect(calculator.raiz(4,2)).toBe(2);
        expect(calculator.raiz(512,3)).toBe(8)
    })
})