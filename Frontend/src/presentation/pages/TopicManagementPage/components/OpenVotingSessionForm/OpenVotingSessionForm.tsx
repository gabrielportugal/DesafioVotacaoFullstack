import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from '../../../../../design-system';
import { topicService } from '../../../../../services/topic.service';
import { votingSessionService } from '../../../../../services/votingSession.service';
import { styles } from './OpenVotingSessionForm.styles.js';

export interface OpenVotingSessionFormProps {
  topicId: number;
  onSessionOpened: () => void;
  onError: (message: string) => void;
}

export const OpenVotingSessionForm: React.FC<OpenVotingSessionFormProps> = ({
  topicId,
  onSessionOpened,
  onError,
}) => {
  const [duration, setDuration] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permite apenas números
    if (value === '' || /^\d+$/.test(value)) {
      setDuration(value);
    }
  };

  const isValid = (): boolean => {
    const durationNumber = parseInt(duration, 10);
    return duration !== '' && !isNaN(durationNumber) && durationNumber > 0;
  };

  const handleOpenSession = async () => {
    if (!isValid()) return;

    setIsLoading(true);
    
    try {
      // Primeiro recarrega as pautas abertas
      await topicService.getTopicById(topicId)

      // Depois cria a sessão de votação
      await votingSessionService.createVotingSession({
        topicId,
        duration: parseInt(duration, 10),
      });

      setDuration('');
      onSessionOpened();
    } catch (error) {
      console.error('Erro ao abrir sessão:', error);
      let errorMessage = 'Erro ao abrir sessão. Tente novamente.';
      if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = (error as { message?: string }).message || errorMessage;
      }
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formGroup}>
        <Form.Label style={styles.label}>Duração da Sessão (minutos)</Form.Label>
        <div style={styles.inputGroup}>
          <Form.Control
            type="text"
            value={duration}
            onChange={handleDurationChange}
            placeholder="Ex: 60"
            disabled={isLoading}
            style={styles.input}
          />
          <Button
            label="Abrir Sessão"
            onClick={handleOpenSession}
            variant="primary"
            disabled={!isValid() || isLoading}
          />
        </div>
      </div>
    </div>
  );
};
