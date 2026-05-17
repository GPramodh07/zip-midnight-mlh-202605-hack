
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Onboarding } from './pages/Onboarding';
import { Dashboard, GenerateProof } from './pages/DashboardAndProof';
import { NovaSocial } from './pages/NovaSocial';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="onboard" element={<Onboarding />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="generate-proof" element={<GenerateProof />} />
          <Route path="nova-social" element={<NovaSocial />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
