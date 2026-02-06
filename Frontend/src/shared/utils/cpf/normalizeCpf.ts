import type { CpfResult } from './types';

/**
 * Normaliza um CPF removendo pontos, traços e caracteres não numéricos
 * @param cpf - CPF com ou sem formatação
 * @returns CpfResult com status e valor normalizado ou mensagem de erro
 */
export const normalizeCpf = (cpf: string): CpfResult => {
  if (!cpf || typeof cpf !== 'string') {
    return {
      status: false,
      message: 'CPF inválido: valor não fornecido',
    };
  }

  // Remove todos os caracteres não numéricos
  const normalized = cpf.replace(/\D/g, '');

  // Valida se possui 11 dígitos
  if (normalized.length !== 11) {
    return {
      status: false,
      message: 'CPF inválido: deve conter 11 dígitos',
    };
  }

  return {
    status: true,
    value: normalized,
  };
};
