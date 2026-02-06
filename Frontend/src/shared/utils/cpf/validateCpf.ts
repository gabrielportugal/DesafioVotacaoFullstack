import type { CpfResult } from './types';
import { normalizeCpf } from './normalizeCpf';

/**
 * Valida um CPF usando o algoritmo oficial de validação
 * @param cpf - CPF com ou sem formatação
 * @returns CpfResult com status de validade e mensagem explicativa
 */
export const validateCpf = (cpf: string): CpfResult => {
  // Normaliza o CPF primeiro
  const normalizeResult = normalizeCpf(cpf);
  
  if (!normalizeResult.status || !normalizeResult.value) {
    return normalizeResult;
  }

  const cleanCpf = normalizeResult.value;

  // Rejeita CPFs com todos os dígitos iguais
  const allSameDigits = /^(\d)\1{10}$/.test(cleanCpf);
  if (allSameDigits) {
    return {
      status: false,
      message: 'CPF inválido: todos os dígitos são iguais',
    };
  }

  // Valida primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;

  if (firstDigit !== parseInt(cleanCpf.charAt(9))) {
    return {
      status: false,
      message: 'CPF inválido: primeiro dígito verificador incorreto',
    };
  }

  // Valida segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
  }
  remainder = sum % 11;
  const secondDigit = remainder < 2 ? 0 : 11 - remainder;

  if (secondDigit !== parseInt(cleanCpf.charAt(10))) {
    return {
      status: false,
      message: 'CPF inválido: segundo dígito verificador incorreto',
    };
  }

  return {
    status: true,
    value: cleanCpf,
  };
};
