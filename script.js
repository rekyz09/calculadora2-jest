// Funções matemáticas isoladas para facilitar a exportação e testes
const calculator = {
    soma: (a, b) => a + b,
    subtracao: (a, b) => a - b,
    multiplicacao: (a, b) => a * b,
    divisao: (a, b) => {
        if (b === 0) throw new Error ("Erro: Divisão por zero");
        return a / b;
    },
    potencia: (a, b) => {
        if (b === 0) return 1;
        if (a === 0 && b < 0) throw new Error("Erro: Base zero com expoente negativo");
        if (a < 0 && !Number.isInteger(b)) 
            if (b % 2 == 0){
                const fracao = decimalParaFracao(b);
            }
        return Math.pow(a, b);
    },
    raiz: (a, b) => {
        if (b === 0) throw new Error("Erro: Índice da raiz não pode ser zero");
        if (a < 0 && b % 2 === 0) throw new Error("Erro: Raiz par de número negativo");
        if (b === 3) return Math.cbrt(a);

        const sinal = a < 0 ? -1 : 1;
        const resultado = sinal * Math.pow(Math.abs(a), 1 / b);
        
        return Number(resultado.toPrecision(12));
    }
};

function decimalParaFracao(decimal) {
  // Transforma o número em string para contar as casas decimais
  const str = decimal.toString();
  const indexPonto = str.indexOf('.');

  // Se não tiver ponto decimal, retorna o número sobre 1
  if (indexPonto === -1) {
    return `${decimal}/1`;
  }

  const casasDecimais = str.length - indexPonto - 1;
  const denominador = Math.pow(10, casasDecimais);
  const numerador = decimal * denominador;

  // Função para calcular o Máximo Divisor Comum (MDC)
  const mdc = (a, b) => (b ? mdc(b, a % b) : a);
  const divisorComum = mdc(numerador, denominador);

  const numSimplificado = numerador / divisorComum;
  const denSimplificado = denominador / divisorComum;

  return `${numSimplificado}/${denSimplificado}`;
}

// Configuração do ambiente web para evitar quebras em ambiente de teste (Node.js)
if (typeof document !== 'undefined') {
    document.getElementById('calculate-btn').addEventListener('click', () => {
        const num1Raw = document.getElementById('num1').value;
        const num2Raw = document.getElementById('num2').value;
        const operation = document.getElementById('operation').value;
        const resultSpan = document.getElementById('result-value');

        // Validação: Campos vazios
        if (num1Raw === '' || num2Raw === '') {
            resultSpan.textContent = "Insira os dois números.";
            return;
        }

        const n1 = parseFloat(num1Raw);
        const n2 = parseFloat(num2Raw);

        try {
            let resultado;
            if (calculator[operation]) {
                resultado = calculator[operation](n1, n2);
                
                // Formatação simples para evitar dízimas longas na tela
                if (!Number.isInteger(resultado)) {
                    resultado = parseFloat(resultado.toFixed(4));
                }
            } else {
                resultado = "Operação inválida";
            }
            
            resultSpan.textContent = resultado;
        } catch (error) {
            resultSpan.textContent = error.message;
        }
    });
}

// Exportação para o arquivo de teste (padrão CommonJS usado pelo Jest)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = calculator;
}