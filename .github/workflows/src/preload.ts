import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  getPrompts: () => ipcRenderer.invoke('get-prompts'),
  addPrompt: (data) => ipcRenderer.invoke('add-prompt', data),
  updatePrompt: (data) => ipcRenderer.invoke('update-prompt', data),
  deletePrompt: (id) => ipcRenderer.invoke('delete-prompt', id)
});
