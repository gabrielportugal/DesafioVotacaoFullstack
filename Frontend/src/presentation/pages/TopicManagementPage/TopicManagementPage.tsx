import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Table, Button, Badge, Toast, ConfirmModal } from '../../../design-system';
import type { TableColumn } from '../../../design-system';
import { topicService } from '../../../services/topic.service';
import type { Topic } from '../../../types/Topic';
import { styles } from './TopicManagementPage.styles';
import { sortTopicsByStatus } from './utils';
import { formatDate } from '../../../shared/utils/date';
import { TopicInfoModal } from './components/TopicInfoModal/TopicInfoModal';
import { CreateTopicModal } from './components/CreateTopicModal';

export const TopicManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'success' | 'error'>('success');
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState<number | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

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
      const sortedTopics = sortTopicsByStatus(data);
      setTopics(sortedTopics);
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

  const handleCloseTopic = (topicId: number) => {
    setTopicToDelete(topicId);
    setConfirmDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!topicToDelete) return;

    try {
      await topicService.deleteTopic(topicToDelete);
      showToast('Pauta excluída com sucesso!', 'success');
      setConfirmDeleteModalOpen(false);
      setTopicToDelete(null);
      await loadTopics();
    } catch (error) {
      console.error('Erro ao excluir pauta:', error);
      showToast('Erro ao excluir pauta. Tente novamente.', 'error');
    }
  };

  const handleViewInfo = (topicId: number) => {
    setSelectedTopicId(topicId);
    setInfoModalOpen(true);
  };

  const handleCreateTopic = () => {
    setCreateModalOpen(true);
  };

  const handleCreateSuccess = () => {
    showToast('Pauta criada com sucesso!', 'success');
    loadTopics();
  };

  const columns: TableColumn<Topic>[] = [
    {
      key: 'title',
      header: 'Nome da Pauta',
      width: '30%',
    },
    {
      key: 'status',
      header: 'Status',
      width: '15%',
      render: (topic) => (
        <Badge 
          label={topic.status === 'OPEN' ? 'Aberta' : 'Fechada'}
          variant={topic.status === 'OPEN' ? 'success' : 'danger'}
        />
      ),
    },
    {
      key: 'createdAt',
      header: 'Criado em',
      width: '15%',
      render: (topic) => <span>{formatDate(topic.createdAt)}</span>,
    },
    {
      key: 'actions',
      header: 'Ações',
      width: '220px',
      render: (topic) => (
        <div style={styles.actionButtons}>
          <Button
            label="Informações"
            onClick={() => handleViewInfo(topic.id)}
            variant="primary"
            size="sm"
            outline
          />
          {topic.status === 'OPEN' && (
            <Button
              label="Fechar pauta"
              onClick={() => handleCloseTopic(topic.id)}
              variant="danger"
              size="sm"
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={styles.container}>
      <Header title="Gestão de Pautas" subtitle="Sistema de Votação" />
      
      <main style={styles.main}>
        <div style={styles.headerActions}>
          <div style={styles.buttonWrapper}>
            <Button
              label="Voltar"
              onClick={() => navigate('/')}
              outline
              variant="success"
            />
          </div>
          
          <h2 style={styles.title}>Todas as Pautas</h2>
          
          <div style={styles.buttonWrapper}>
            <Button
              label="Atualizar"
              onClick={loadTopics}
              disabled={loading}
              outline
              variant="primary"
            />
            <Button
              label="Criar pauta"
              onClick={handleCreateTopic}
              variant="success"
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

      <TopicInfoModal
        isOpen={infoModalOpen}
        topicId={selectedTopicId}
        onClose={() => {
          setInfoModalOpen(false);
          setSelectedTopicId(null);
        }}
        onTopicUpdated={loadTopics}
        onError={(message) => showToast(message, 'error')}
      />

      <CreateTopicModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
        onError={(message) => showToast(message, 'error')}
        onShowToast={showToast}
      />

      <ConfirmModal
        isOpen={confirmDeleteModalOpen}
        title="Confirmar fechamento de pauta"
        message="Tem certeza que deseja fechar esta pauta? Esta ação não poderá ser desfeita e a pauta não poderá ser aberta novamente."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmDeleteModalOpen(false);
          setTopicToDelete(null);
        }}
        confirmLabel="Fechar pauta"
        cancelLabel="Cancelar"
        variant="danger"
      />

      <Toast
        show={toastShow}
        message={toastMessage}
        variant={toastVariant}
        onClose={() => setToastShow(false)}
      />
    </div>
  );
};
