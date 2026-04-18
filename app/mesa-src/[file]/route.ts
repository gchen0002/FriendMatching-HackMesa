import { serveMesaAsset } from '../../lib/mesa';

export async function GET(
  _request: Request,
  context: { params: Promise<{ file: string }> },
) {
  const { file } = await context.params;
  return serveMesaAsset(file);
}
