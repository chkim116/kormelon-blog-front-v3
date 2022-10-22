import { ChangeEventHandler } from 'react';
import { Box, Input, InputLabel } from '@mui/material';
import Image from 'next/image';
import { feedbackService } from '@common/components/Feedback';

interface PostWriteThumbnailProps {
  onUploadImage: (file: File) => void;
  previewThumbnail: string;
}

export const PostWriteThumbnail = ({
  onUploadImage,
  previewThumbnail,
}: PostWriteThumbnailProps) => {
  const handleUploadImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      feedbackService('error', '올바르게 업로드 되지 않았습니다.');
      return;
    }

    onUploadImage(file);
  };

  return (
    <Box display="flex" gap={4}>
      <InputLabel sx={{ width: '80px' }} htmlFor="image">
        썸네일
      </InputLabel>
      <Box display="flex" flexDirection="column">
        <Box
          position="relative"
          width="100%"
          maxWidth="480px"
          pb="56.25%"
          sx={{
            img: {
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            },
          }}
        >
          <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
            <Image src={previewThumbnail} alt="미리보는 썸네일" layout="fill" />
          </Box>
        </Box>

        <Input type="file" id="image" onChange={handleUploadImage} />
      </Box>
    </Box>
  );
};
