import { ThemeProvider } from '@/providers/theme-provider';
import RootLayout from '@/layouts/root-layout';

const AppLayout = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <RootLayout />
    </ThemeProvider>
  );
};

export default AppLayout;
