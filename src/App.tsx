// React + TypeScript Frontend Code
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Template {
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

  useEffect(() => {
    axios.get('http://localhost:3000/templates').then((response) => {
      setTemplates(response.data);
      setFilteredTemplates(response.data);
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
      <div>
        {filteredTemplates.map((template) => (
          <div key={template.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h2>{template.name}</h2>
            <p>{template.description}</p>
            <p>Category: {template.category}</p>
            <p>Price: ${template.price}</p>
            <button onClick={() => openBotView(template)}>View</button>
          </div>
        ))}
      </div>

      {isAuthModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
            <h2>Login / Register</h2>
            <form>
              <div>
                <label>Email:</label>
                <input type="email" required />
              </div>
              <div>
                <label>Password:</label>
                <input type="password" required />
              </div>
              <button type="submit">Submit</button>
            </form>
            <button onClick={closeAuthModal}>Close</button>
          </div>
        </div>
      )}

      {isBotViewOpen && selectedBot && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
            <h2>{selectedBot.name}</h2>
            <p>{selectedBot.description}</p>
            <p>Category: {selectedBot.category}</p>
            <p>Price: ${selectedBot.price}</p>
            <button onClick={closeBotView}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
