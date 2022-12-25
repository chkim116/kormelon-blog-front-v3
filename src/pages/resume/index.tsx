import { GetStaticProps } from 'next';
import fs from 'fs';
import { ResumePage } from '@features/resume/routes/ResumePage';

export default ResumePage;

export const getStaticProps: GetStaticProps = async () => {
  const myResume = fs.readFileSync(process.cwd() + '/resume.md', {
    encoding: 'utf8',
    flag: 'r',
  });

  return {
    props: {
      myResume,
    },
  };
};
