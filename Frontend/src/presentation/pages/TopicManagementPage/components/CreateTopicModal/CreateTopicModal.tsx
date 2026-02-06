import { useState } from 'react';
import { Modal as BootstrapModal, Form } from 'react-bootstrap';
import { Button } from '../../../../../design-system';
import { theme } from '../../../../../design-system';
import { topicService } from '../../../../../services/topic.service';
import { styles } from './CreateTopicModal.styles';

export interface CreateTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError: (message: string) => void;
  onShowToast: (message: string, variant: 'success' | 'error') => void;
}

export const CreateTopicModal: React.FC<CreateTopicModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onError
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setTitle(value);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 255) {
      setDescription(value);
    }
  };

  const isValid = (): boolean => {
    return (
      title.trim() !== '' &&
      title.length <= 100 &&
      description.trim() !== '' &&
      description.length <= 255
    );
  };

  const handleCreateTopic = async () => {
    if (!isValid()) return;

    setIsLoading(true);

    try {
      // Cria a pauta
      await topicService.createTopic({
        title: title.trim(),
        description: description.trim(),
        status: 'OPEN',
      });

      // Limpa os campos
      setTitle('');
      setDescription('');
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro ao criar pauta:', error);
      let errorMessage = 'Erro ao criar pauta. Tente novamente.';
      if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = (error as { message?: string }).message || errorMessage;
      }
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  const modalHeaderStyle: React.CSSProperties = {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    borderBottom: 'none',
  };

  const titleStyle: React.CSSProperties = {
    fontWeight: 700,
    fontSize: '1.25rem',
  };

  return (
    <BootstrapModal show={isOpen} onHide={handleClose} centered size="lg">
      <BootstrapModal.Header closeButton style={modalHeaderStyle}>
        <BootstrapModal.Title style={titleStyle}>
          Criar Nova Pauta
        </BootstrapModal.Title>
      </BootstrapModal.Header>

      <BootstrapModal.Body style={styles.modalBody}>
        <div style={styles.formGroup}>
          <Form.Label style={styles.label}>
            Título
            <span style={styles.charCount}>
              {title.length}/100
            </span>
          </Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Digite o título da pauta"
            disabled={isLoading}
          />
        </div>

        <div style={styles.formGroup}>
          <Form.Label style={styles.label}>
            Descrição
            <span style={styles.charCount}>
              {description.length}/255
            </span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Digite a descrição da pauta"
            disabled={isLoading}
          />
        </div>

        <div style={styles.infoBox}>
          <span style={styles.infoText}>
            ℹ️ A pauta será criada com status <strong>Aberta</strong>. Você poderá abrir uma sessão de votação posteriormente acessando as informações da pauta.
          </span>
        </div>
      </BootstrapModal.Body>

      <BootstrapModal.Footer style={{ borderTop: 'none', padding: theme.spacing.xl }}>
        <div style={styles.buttonGroup}>
          <Button
            label="Cancelar"
            onClick={handleClose}
            variant="primary"
            outline
            disabled={isLoading}
          />
          <Button
            label="Criar Pauta"
            onClick={handleCreateTopic}
            variant="success"
            disabled={!isValid() || isLoading}
          />
        </div>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};
