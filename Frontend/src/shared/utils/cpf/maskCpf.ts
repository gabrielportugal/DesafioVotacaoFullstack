import type { CpfResult } from './types';

/**
 * Aplica máscara de formatação no CPF (999.999.999-99)
 * @param cpf - CPF somente com números
 * @returns CpfResult com status e valor mascarado ou mensagem de erro
 */
export const maskCpf = (cpf: string): CpfResult => {
  if (!cpf || typeof cpf !== 'string') {
    return {
      status: false,
      message: 'CPF inválido: valor não fornecido',
    };
  }

  // Remove caracteres não numéricos
  const numbers = cpf.replace(/\D/g, '');

  // Valida tamanho
  if (numbers.length === 0) {
    return {
      status: false,
      message: 'CPF inválido: nenhum número fornecido',
    };
  }

  if (numbers.length > 11) {
    return {
      status: false,
      message: 'CPF inválido: excede 11 dígitos',
    };
  }

  // Aplica máscara progressiva
  let masked = numbers;

  if (numbers.length > 3) {
    masked = `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  }

  if (numbers.length > 6) {
    masked = `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
  }

  if (numbers.length > 9) {
    masked = `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  }

  return {
    status: true,
    value: masked,
  };
};
