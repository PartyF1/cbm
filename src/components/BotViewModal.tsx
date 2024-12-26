import React from 'react';

interface BotViewModalProps {
  bot: {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
  };
  onClose: () => void;
}

export const BotViewModal: React.FC<BotViewModalProps> = ({ bot, onClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
        <h2>{bot.name}</h2>
        <p>{bot.description}</p>
        <p>Category: {bot.category}</p>
        <p>Price: ${bot.price}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
