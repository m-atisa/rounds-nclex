import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Learn, ModulePage, TopicPage, UnitPage } from './pages/Learn';
import { UNITS } from './data';
import { Flashcards } from './pages/Flashcards';
import { PracticeBuilder } from './pages/Practice';
import { ExamBuilder } from './pages/Exam';
import { SessionPage } from './pages/Session';
import { Results } from './pages/Results';
import { Bank } from './pages/Bank';
import { ProgressPage } from './pages/Progress';
import { NotFound } from './pages/NotFound';
import './styles/app.css';

// Hash routing keeps deep links working on static hosting (GitHub Pages) without server rewrites.
const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/learn', element: <Learn /> },
      ...UNITS.map((u) => ({ path: `/learn/${u.slug}`, element: <UnitPage slug={u.slug} /> })),
      { path: '/learn/:moduleId', element: <ModulePage /> },
      { path: '/learn/:moduleId/:topicId', element: <TopicPage /> },
      { path: '/flashcards', element: <Flashcards /> },
      { path: '/practice', element: <PracticeBuilder /> },
      { path: '/exam', element: <ExamBuilder /> },
      { path: '/session', element: <SessionPage /> },
      { path: '/results/:id', element: <Results /> },
      { path: '/questions', element: <Bank /> },
      { path: '/progress', element: <ProgressPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  </StrictMode>,
);
