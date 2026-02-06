import { useState, useEffect } from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { theme } from '../../../../../design-system';
import { Button, Badge } from '../../../../../design-system';
import { topicService } from '../../../../../services/topic.service';
import type { TopicWithSessions } from '../../../../../types/Topic';
import type { VoteResult } from '../../../../../types/VoteResult';
import { formatDateTime } from '../../../../../shared/utils/date';
import { OpenVotingSessionForm } from '../OpenVotingSessionForm';
import { styles } from './TopicInfoModal.styles';

export interface TopicInfoModalProps {
  isOpen: boolean;
  topicId: number | null;
  onClose: () => void;
  onTopicUpdated?: () => void;
  onError?: (message: string) => void;
}

export const TopicInfoModal: React.FC<TopicInfoModalProps> = ({
  isOpen,
  topicId,
  onClose,
  onTopicUpdated,
  onError,
}) => {
  const [topic, setTopic] = useState<TopicWithSessions | null>(null);
  const [voteResult, setVoteResult] = useState<VoteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTopicInfo = async () => {
      if (!topicId || !isOpen) return;

      try {
        setLoading(true);
        setError(null);
        
        const [topicData, resultData] = await Promise.all([
          topicService.getTopicById(topicId),
          topicService.getTopicResult(topicId).catch(() => null),
        ]);
        
        setTopic(topicData);
        setVoteResult(resultData);
      } catch (err) {
        console.error('Erro ao buscar informações:', err);
        setError('Erro ao carregar informações da pauta.');
      } finally {
        setLoading(false);
      }
    };

    loadTopicInfo();
  }, [topicId, isOpen]);

  const handleClose = () => {
    setTopic(null);
    setVoteResult(null);
    setError(null);
    onClose();
  };

  const handleSessionOpened = async () => {
    // Recarrega os dados da pauta
    if (topicId) {
      try {
        const [topicData, resultData] = await Promise.all([
          topicService.getTopicById(topicId),
          topicService.getTopicResult(topicId).catch(() => null),
        ]);
        
        setTopic(topicData);
        setVoteResult(resultData);
        
        // Notifica a página pai para recarregar a lista
        if (onTopicUpdated) {
          onTopicUpdated();
        }
      } catch (err) {
        console.error('Erro ao recarregar informações:', err);
      }
    }
  };

  const handleSessionError = (message: string) => {
    if (onError) {
      onError(message);
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
          Informações da Pauta
        </BootstrapModal.Title>
      </BootstrapModal.Header>

      <BootstrapModal.Body style={styles.modalBody}>
        {loading && (
          <div style={styles.loadingMessage}>
            Carregando informações...
          </div>
        )}

        {error && (
          <div style={styles.errorMessage}>
            {error}
          </div>
        )}

        {!loading && !error && topic && (
          <div style={styles.modalContent}>
            <div style={styles.titleSection}>
              <span style={styles.title}>{topic.title}</span>
              <Badge 
                label={topic.status === 'OPEN' ? 'Aberta' : 'Fechada'}
                variant={topic.status === 'OPEN' ? 'success' : 'danger'}
              />
            </div>
            
            <span style={styles.description}>{topic.description}</span>

            {voteResult && (
              <div style={styles.infoSession}>
                <span style={styles.label}>Resultados da Votação:</span>
                <div style={styles.resultContainer}>
                  <div style={styles.resultRow}>
                    <span style={styles.resultLabel}>SIM:</span>
                    <span style={{...styles.resultValue, color: theme.colors.primary}}>
                      {voteResult.totalSim} ({voteResult.percentualSim.toFixed(2)}%)
                    </span>
                  </div>
                  <div style={styles.resultRow}>
                    <span style={styles.resultLabel}>NÃO:</span>
                    <span style={{...styles.resultValue, color: '#dc3545'}}>
                      {voteResult.totalNao} ({voteResult.percentualNao.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {topic.status === 'OPEN' && topicId && (
              <OpenVotingSessionForm
                topicId={topicId}
                onSessionOpened={handleSessionOpened}
                onError={handleSessionError}
              />
            )}

            <div style={styles.infoSession}>
              <span style={styles.label}>Sessões de Votação:</span>
              <div style={styles.sessionsContainer}>
                {topic.votingSessions && topic.votingSessions.length > 0 ? (
                  [...topic.votingSessions]
                    .sort((a, b) => {
                      // Sessões abertas primeiro
                      if (a.status === 'OPEN' && b.status === 'CLOSED') return -1;
                      if (a.status === 'CLOSED' && b.status === 'OPEN') return 1;
                      // Dentro do mesmo status, mais recentes primeiro
                      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    })
                    .map((session, index) => (
                    <div key={index} style={styles.sessionItem}>
                      <Badge 
                        label={session.status === 'OPEN' ? 'Aberta' : 'Fechada'}
                        variant={session.status === 'OPEN' ? 'success' : 'danger'}
                      />
                      <div style={styles.sessionInfo}>
                        <strong>Criada em:</strong> {formatDateTime(session.createdAt)}
                      </div>
                      <div style={styles.sessionInfo}>
                        <strong>Duração:</strong> {session.duration} minutos
                      </div>
                      {session.closedAt && (
                        <div style={styles.sessionInfo}>
                          <strong>Encerrada em:</strong> {formatDateTime(session.closedAt)}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <span style={styles.value}>Nenhuma sessão de votação</span>
                )}
              </div>
            </div>
          </div>
        )}
      </BootstrapModal.Body>

      <BootstrapModal.Footer style={{ borderTop: 'none', paddingLeft: theme.spacing.xl, paddingRight: theme.spacing.xl }}>
        <Button
          label="Fechar"
          onClick={handleClose}
          variant="primary"
          fullWidth
        />
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};
