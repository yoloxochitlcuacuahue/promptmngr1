import { useState, useEffect } from 'react';

export default function PromptForm({ onAdd, onUpdate }: { onAdd: (data: any) => void, onUpdate: (data: any) => void }) {
  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [aiProvider, setAiProvider] = useState('ChatGPT');

  useEffect(() => {
    const listener = (_: any, prompt: any) => {
      setId(prompt.id);
      setTitle(prompt.title);
      setContent(prompt.content);
      setTags(prompt.tags.join(','));
      setAiProvider(prompt.aiProvider);
    };
    window.api.onEditPrompt = listener;
    return () => { delete window.api.onEditPrompt; };
  }, []);

  const submit = () => {
    const data = { id: id || undefined, title, content, tags: tags.split(','), aiProvider };
    if (id) onUpdate(data);
    else onAdd(data);
    setId(null); setTitle(''); setContent(''); setTags('');
  };

  return (
    <div className="mb-6 grid grid-cols-[1fr,1fr,1fr,auto] gap-2">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" className="border p-2" />
      <input value={content} onChange={e => setContent(e.target.value)} placeholder="Prompt" className="border p-2" />
      <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Etiquetas (coma)" className="border p-2" />
      <select value={aiProvider} onChange={e => setAiProvider(e.target.value)} className="border p-2">
        <option>ChatGPT</option>
        <option>MidJourney</option>
        <option>DALL·E</option>
      </select>
      <button onClick={submit} className="bg-blue-600 text-white px-4 py-2">
        {id ? 'Actualizar' : 'Guardar'}
      </button>
    </div>
  );
}
