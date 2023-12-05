import {VIDEO_UPLOAD_URL} from '../api/config';

interface FileType {
  type: string;
  uri: string;
  fileName: string;
}

export const uploadVideo = async (data: FileType) => {
  const formData = new FormData();

  formData.append('file', {
    type: data.type,
    uri: data.uri,
    name: data.fileName,
  });

  const response = await fetch(VIDEO_UPLOAD_URL, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });

  let responseData = await response.json();

  return {data: responseData, status: response.status};
};
