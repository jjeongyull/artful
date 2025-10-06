// Router.jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';

import HomePage from '../pages/Home/HomePage';
import About from '../pages/Home/About';
import Program from '../pages/Home/Program';
import Login from '../pages/Admin/LoginPage';
import AdminLayout from '../pages/Admin/AdminLayout';
import Header from '../components/Header';
import Footer from '../components/Footer';

function UserLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function Router() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ 일반 사용자 페이지 */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/program" element={<Program />} />
        </Route>

        {/* ✅ 어드민 로그인 */}
        <Route path="/admin" element={<Login />} />

        {/* ✅ 어드민 내부 대시보드 (헤더/푸터 없이 별도 레이아웃) */}
        <Route path="/admin/dashboard/*" element={<AdminLayout />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Router;
