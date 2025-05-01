import { useEffect, useState } from 'react';
import PromptForm from './components/PromptForm';
import PromptList from './components/PromptList';

function App() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState('');

  const loadPrompts = async () => {
    const data = await window.api.getPrompts();
    setPrompts(data);
  };

  useEffect(() => { loadPrompts(); }, []);

  const showMessage = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAdd = async (prompt: any) => {
    if (!prompt.title || !prompt.content) return showMessage('Título y prompt son requeridos');
    await window.api.addPrompt(prompt);
    showMessage('Prompt guardado');
    loadPrompts();
  };

  const handleUpdate = async (prompt: any) => {
    if (!prompt.title || !prompt.content) return showMessage('Título y prompt son requeridos');
    await window.api.updatePrompt(prompt);
    showMessage('Prompt actualizado');
    loadPrompts();
  };

  const handleDelete = async (id: string) => {
    await window.api.deletePrompt(id);
    showMessage('Prompt eliminado');
    loadPrompts();
  };

  const filtered = prompts.filter(p =>
    p.title.includes(filter) || p.content.includes(filter) || p.tags.join(',').includes(filter)
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gestor de Prompts</h1>
      {message && <div className="bg-green-200 p-2 mb-4 rounded">{message}</div>}
      <input
        className="border p-2 mb-4 w-full"
        placeholder="Filtrar por título, contenido o etiqueta"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <PromptForm onAdd={handleAdd} onUpdate={handleUpdate} />
      <PromptList prompts={filtered} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
}

export default App;
