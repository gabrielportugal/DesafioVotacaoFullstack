import { useNavigate } from 'react-router-dom';
import { Header, Card, theme } from '../../../design-system';
import { FaFolder, FaCog } from 'react-icons/fa';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToSelecaoPauta = () => {
    navigate('/selecao-pauta');
  };

  const handleNavigateToGestaoPauta = () => {
    navigate('/gestao-pauta');
  };

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: theme.colors.background.default,
  };

  const mainStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: theme.spacing.xl,
  };

  return (
    <div style={containerStyle}>
      <Header title="Painel de Controle" subtitle="Sistema de Votação" />
      
      <main style={mainStyle}>
        <Card
          icon={<FaFolder />}
          title="Seleção de Pauta"
          description="Este painel permite que você visualize e selecione pautas disponíveis para votação. Acompanhe as pautas em aberto e suas respectivas sessões de votação."
          buttonLabel="Acessar"
          onButtonClick={handleNavigateToSelecaoPauta}
        />
        
        <Card
          icon={<FaCog />}
          title="Gestão de Pauta"
          description="Este painel permite criar, editar e gerenciar pautas do sistema. Controle completo sobre as pautas, incluindo criação, atualização e monitoramento do histórico de atividades."
          buttonLabel="Acessar"
          onButtonClick={handleNavigateToGestaoPauta}
        />
      </main>
    </div>
  );
};
