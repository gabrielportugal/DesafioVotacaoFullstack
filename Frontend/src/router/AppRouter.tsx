import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage, TopicSelectionPage, TopicManagementPage } from '../presentation/pages';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/selecao-pauta" element={<TopicSelectionPage />} />
      <Route path="/gestao-pauta" element={<TopicManagementPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
