import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import prisma from '../prismaClient';

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  win.loadFile('dist/index.html');
}

app.whenReady().then(createWindow);

ipcMain.handle('get-prompts', async () => await prisma.prompt.findMany({ orderBy: { updatedAt: 'desc' } }));
ipcMain.handle('add-prompt', async (_, data) => await prisma.prompt.create({ data }));
ipcMain.handle('update-prompt', async (_, data) => await prisma.prompt.update({ where: { id: data.id }, data }));
ipcMain.handle('delete-prompt', async (_, id) => await prisma.prompt.delete({ where: { id } }));
