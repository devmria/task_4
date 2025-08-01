import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="flex flex-col w-full h-screen p-50 gap-l">
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}