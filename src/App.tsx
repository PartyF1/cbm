import React, { useEffect, useState } from 'react';
import AuthModal from './components/AuthModal.tsx';
import {BotViewModal} from './components/BotViewModal.tsx';
import TemplateList from './components/templateList/TemplateList.tsx';
import Cart from './components/cart/Cart.tsx';
import { fetchTemplates } from './api.ts';

export interface Template {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
}

const App: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isBotViewOpen, setIsBotViewOpen] = useState<boolean>(false);
  const [selectedBot, setSelectedBot] = useState<Template | null>(null);
  const [cart, setCart] = useState<Template[]>([]);

  useEffect(() => {
    fetchTemplates().then((data) => {
      setTemplates(data);
      setFilteredTemplates(data);
    });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    setFilteredTemplates(
      templates.filter((template) =>
        template.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openBotView = (template: Template) => {
    setSelectedBot(template);
    setIsBotViewOpen(true);
  };
  const closeBotView = () => {
    setSelectedBot(null);
    setIsBotViewOpen(false);
  };

  const addToCart = (template: Template) => {
    setCart((prevCart) => [...prevCart, template]);
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1>ChatBotMarket</h1>
      <button onClick={openAuthModal}>Login / Register</button>
      <input
        type="text"
        placeholder="Search templates..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <TemplateList templates={filteredTemplates} onView={openBotView} onAddToCart={addToCart} />
      <Cart cartItems={cart} onRemove={removeFromCart} onView={openBotView}/>

      {isAuthModalOpen && <AuthModal onClose={closeAuthModal} />}
      {isBotViewOpen && selectedBot && <BotViewModal bot={selectedBot} onClose={closeBotView} />}
    </div>
  );
};

export default App;
