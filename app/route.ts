import { serveMesaHtml } from './lib/mesa';

export async function GET() {
  return serveMesaHtml();
}
