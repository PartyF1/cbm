import React from 'react';
import './TemplateList.css';

interface Template {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
}

interface TemplateListProps {
  templates: Template[];
  onView: (template: Template) => void;
  onAddToCart: (template: Template) => void;
}

const TemplateList: React.FC<TemplateListProps> = ({ templates, onView, onAddToCart }) => {
  return (
    <div className="template-grid">
      {templates.map((template) => (
        <div key={template.id} className="template-card">
          <h2>{template.name}</h2>
          <p>{template.description}</p>
          <p>Category: {template.category}</p>
          <p>Price: ${template.price}</p>
          <div className='actions'>
            <button onClick={() => onView(template)}>View</button>
            <button onClick={() => onAddToCart(template)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateList;