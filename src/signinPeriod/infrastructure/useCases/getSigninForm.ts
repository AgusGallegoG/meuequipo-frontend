import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';

async function Api() {
  const response = await api.get('/signin/download', {
    responseType: 'blob',
  });

  const blob = response.data;

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;

  let filename = 'Inscripción_CBXVerin.pdf';
  const contentDisposition = response.headers['content-disposition'];
  if (contentDisposition) {
    const match = contentDisposition.match(/filename="([^"]+)"/);
    if (match && match[1]) {
      filename = match[1];
    }
  }
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

async function getSigninForm() {
  try {
    UtilBase.checkEnvironment() ? await UtilBase.wait(200) : await Api();
  } catch (error) {
    throw new Error(`Error on download`);
  }
}

export { getSigninForm };
