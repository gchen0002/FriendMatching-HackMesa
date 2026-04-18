import { readFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

const mesaRoot = path.join(process.cwd(), 'HACKMESA');
const mesaHtmlPath = path.join(mesaRoot, 'mesa.html');
const mesaSrcRoot = path.join(mesaRoot, 'src');

function htmlResponse(body: string) {
  return new NextResponse(body, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export async function serveMesaHtml() {
  const html = await readFile(mesaHtmlPath, 'utf-8');
  return htmlResponse(html.replaceAll('src="src/', 'src="/mesa-src/'));
}

export async function serveMesaAsset(file: string) {
  if (!/^[A-Za-z0-9._-]+\.(js|jsx)$/.test(file)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const filePath = path.join(mesaSrcRoot, file);

  try {
    const source = await readFile(filePath, 'utf-8');
    return new NextResponse(source, {
      headers: { 'Content-Type': 'text/javascript; charset=utf-8' },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
