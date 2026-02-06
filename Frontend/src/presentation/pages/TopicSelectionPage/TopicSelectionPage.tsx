import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Table, Button, Modal, VoteModal, Toast } from '../../../design-system';
import type { TableColumn } from '../../../design-system';
import { topicService } from '../../../services/topic.service';
import type { Topic } from '../../../types/Topic';
import { styles } from './TopicSelectionPage.styles';

export const TopicSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [voteModalOpen, setVoteModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'success' | 'error'>('success');

  const showToast = (message: string, variant: 'success' | 'error') => {
    setToastMessage(message);
    setToastVariant(variant);
    setToastShow(true);
  };

  const loadTopics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await topicService.getAllTopics();
      // Filtra apenas pautas abertas
      const openTopics = data.filter(topic => topic.status === 'OPEN');
      setTopics(openTopics);
    } catch (err) {
      setError('Erro ao carregar pautas. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTopics();
  }, []);

  const handleVote = async (topicId: number) => {
    try {
      const topicData = await topicService.getTopicById(topicId);
      
      // Verifica se há pelo menos uma sessão de votação aberta
      const hasOpenSession = topicData.votingSessions?.some(
        (session) => session.status === 'OPEN'
      );

      if (!hasOpenSession) {
        setModalMessage('Não há sessão de votação aberta para esta pauta.');
        setModalOpen(true);
        return;
      }

      // Busca a pauta completa na lista para abrir modal de votação
      const topic = topics.find(t => t.id === topicId);
      if (topic) {
        setSelectedTopic(topic);
        setVoteModalOpen(true);
      }
    } catch (error) {
      console.error('Erro ao buscar pauta:', error);
      setError('Erro ao verificar sessão de votação.');
    }
  };

  const handleModalClose = async () => {
    setModalOpen(false);
  };

  const columns: TableColumn<Topic>[] = [
    {
      key: 'title',
      header: 'Título',
      width: '30%',
    },
    {
      key: 'description',
      header: 'Descrição',
      width: '50%',
      render: (topic) => (
        <div
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '320px',
          }}
          title={topic.description}
        >
          {topic.description}
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Ações',
      width: '20%',
      render: (topic) => (
        <Button
          label="Votar"
          onClick={() => handleVote(topic.id)}
          variant="success"
          size="sm"
        />
      ),
    },
  ];

  return (
    <div style={styles.container}>
      <Header title="Seleção de Pauta" subtitle="Sistema de Votação" />
      
      <main style={styles.main}>
        <div style={styles.headerActions}>
          <div style={styles.buttonWrapper}>
            <Button
              label="Voltar"
              onClick={() => navigate('/')}
              outline variant="success"
            />
          </div>
          
          <h2 style={styles.title}>Lista de Pautas</h2>
          
          <div style={styles.buttonWrapper}>
            <Button
              label="Atualizar"
              onClick={loadTopics}
              disabled={loading}
              outline variant="primary"
            />
          </div>
        </div>

        {error && (
          <div style={styles.errorMessage(styles.message)}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={styles.message}>Carregando pautas...</div>
        ) : (
          <Table
            columns={columns}
            data={topics}
            keyExtractor={(topic) => topic.id}
            emptyMessage="Nenhuma pauta encontrada"
          />
        )}
      </main>

      <Modal
        isOpen={modalOpen}
        title="Sessão de Votação Encerrada"
        message={modalMessage}
        onClose={handleModalClose}
        confirmLabel="OK"
      />

      {selectedTopic && (
        <VoteModal
          isOpen={voteModalOpen}
          topicId={selectedTopic.id}
          topicName={selectedTopic.title}
          topicDescription={selectedTopic.description}
          onClose={() => {
            setVoteModalOpen(false);
            setSelectedTopic(null);
          }}
          onSuccess={(message) => {
            setVoteModalOpen(false);
            setSelectedTopic(null);
            showToast(message, 'success');
          }}
          onError={(message) => {
            setToastMessage(message);
            setToastVariant('error');
            showToast(message, 'error');
          }}
        />
      )}

      <Toast
        show={toastShow}
        message={toastMessage}
        variant={toastVariant}
        onClose={() => setToastShow(false)}
      />
    </div>
  );
};
