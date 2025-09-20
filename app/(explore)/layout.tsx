import Header from './header';
import Footer from './footer';
import { type Metadata } from 'next'


type Props = {
    children: React.ReactNode;
}

const ExploreLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-1 flex-col items-center justify-center p-4">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default ExploreLayout;
