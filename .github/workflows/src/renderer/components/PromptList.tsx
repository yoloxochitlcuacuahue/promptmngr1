import { useState } from 'react';

export default function PromptList({ prompts, onDelete, onUpdate }: { prompts: any[], onDelete: (id: string) => void, onUpdate: (data: any) => void }) {
  const [editing, setEditing] = useState<string | null>(null);

  const startEdit = (prompt: any) => {
    window.api.onEditPrompt(null, prompt);
    setEditing(prompt.id);
  };

  return (
    <div>
      {prompts.map(prompt => (
        <div key={prompt.id} className="border p-4 mb-2 flex justify-between items-start">
          <div>
            <h2 className="font-semibold">{prompt.title}</h2>
            <p>{prompt.content}</p>
            <small>{prompt.tags.join(', ')} – {prompt.aiProvider}</small>
          </div>
          <div className="flex gap-2">
            <button onClick={() => startEdit(prompt)} className="text-yellow-600">Editar</button>
            <button onClick={() => onDelete(prompt.id)} className="text-red-600">Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
