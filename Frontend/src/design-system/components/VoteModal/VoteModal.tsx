import { useState } from 'react';
import { Modal as BootstrapModal, Form } from 'react-bootstrap';
import { theme } from '../../theme';
import { Button } from '../Button';
import type { VoteChoice } from '../../../types/Vote';
import { voteService } from '../../../services/vote.service';
import { maskCpf, validateCpf } from '../../../shared/utils/cpf';
import { styles } from './VoteModal.styles';

export interface VoteModalProps {
  isOpen: boolean;
  topicId: number;
  topicName: string;
  topicDescription: string;
  onClose: () => void;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export const VoteModal: React.FC<VoteModalProps> = ({
  isOpen,
  topicId,
  topicName,
  topicDescription,
  onClose,
  onSuccess,
  onError,
}) => {
  const [cpf, setCpf] = useState('');
  const [choice, setChoice] = useState<VoteChoice | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cpfError, setCpfError] = useState<string>('');

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Permite digitar até 11 dígitos
    const numbers = inputValue.replace(/\D/g, '');
    if (numbers.length <= 11) {
      setCpf(numbers);
      
      // Valida CPF ao digitar (somente se tiver 11 dígitos)
      if (numbers.length === 11) {
        const validation = validateCpf(numbers);
        if (!validation.status && validation.message) {
          setCpfError(validation.message);
        } else {
          setCpfError('');
        }
      } else if (numbers.length > 0) {
        setCpfError('CPF incompleto');
      } else {
        setCpfError('');
      }
    }
  };

  const formatCpf = (value: string): string => {
    const result = maskCpf(value);
    return result.status ? result.value || '' : value;
  };

  const isValidCpf = (): boolean => {
    const result = validateCpf(cpf);
    return result.status;
  };

  const canSubmit = (): boolean => {
    return isValidCpf() && choice !== null && !isSubmitting;
  };

  const handleSubmit = async () => {
    if (!choice) return;

    // Valida CPF usando o util
    const cpfValidation = validateCpf(cpf);
    if (!cpfValidation.status) {
      if (onError && cpfValidation.message) {
        onError(cpfValidation.message);
      }
      return;
    }

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      
      await voteService.submitVote({
        topicId,
        associateId: cpf,
        choice,
      });
      
      handleClose();
      
      if (onSuccess) {
        onSuccess('Voto registrado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao votar:', error);
      
      if (onError) {
        const errorMessage =
          typeof error === 'object' && error !== null && 'message' in error
            ? (error as { message?: string }).message
            : undefined;
        onError(errorMessage || 'Erro ao registrar voto. Tente novamente mais tarde.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCpf('');
    setChoice(null);
    setIsSubmitting(false);
    setCpfError('');
    onClose();
  };

  return (
    <BootstrapModal show={isOpen} onHide={isSubmitting ? undefined : handleClose} centered size="lg" backdrop={isSubmitting ? 'static' : true} keyboard={!isSubmitting}>
      <BootstrapModal.Header closeButton={!isSubmitting} style={styles.modalHeader}>
        <BootstrapModal.Title style={styles.title}>Votação</BootstrapModal.Title>
      </BootstrapModal.Header>
      
      <BootstrapModal.Body style={styles.modalBody}>
        <div style={styles.topicContainer}>
          <h5 style={styles.sectionTitle}>{topicName}</h5>
          <p style={styles.description}>{topicDescription}</p>
        </div>

        <Form.Group style={styles.formGroup}>
          <Form.Label style={styles.formLabel}>
            CPF
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="000.000.000-00"
            value={formatCpf(cpf)}
            onChange={handleCpfChange}
            maxLength={14}
            disabled={isSubmitting}
            isInvalid={!!cpfError}
            style={cpfError ? styles.inputError : undefined}
          />
          {cpfError && (
            <div style={styles.errorMessage}>
              {cpfError}
            </div>
          )}
        </Form.Group>

        <div style={styles.voteContainer}>
          <label style={styles.voteLabel}>
            Seu voto
          </label>
          <div style={styles.voteButtonsContainer}>
            <button
              type="button"
              style={styles.getVoteButtonStyle(choice, 'Sim', isSubmitting)}
              onClick={() => !isSubmitting && setChoice('Sim')}
              disabled={isSubmitting}
              onMouseEnter={(e) => {
                if (choice !== 'Sim' && !isSubmitting) {
                  e.currentTarget.style.backgroundColor = `${theme.colors.primary}20`;
                }
              }}
              onMouseLeave={(e) => {
                if (choice !== 'Sim' && !isSubmitting) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              SIM
            </button>
            
            <button
              type="button"
              style={styles.getVoteButtonStyle(choice, 'Não', isSubmitting)}
              onClick={() => !isSubmitting && setChoice('Não')}
              disabled={isSubmitting}
              onMouseEnter={(e) => {
                if (choice !== 'Não' && !isSubmitting) {
                  e.currentTarget.style.backgroundColor = '#dc354520';
                }
              }}
              onMouseLeave={(e) => {
                if (choice !== 'Não' && !isSubmitting) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              NÃO
            </button>
          </div>
        </div>
      </BootstrapModal.Body>

      <BootstrapModal.Footer style={styles.modalFooter}>
        <Button
          label="Votar"
          onClick={handleSubmit}
          disabled={!canSubmit()}
          variant="success"
          fullWidth
        />
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};
