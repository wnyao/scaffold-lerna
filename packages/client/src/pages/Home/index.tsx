import React, { FC } from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@packages/core/client/hooks';

const Home: FC = () => {
  useLanguage();

  return (
    <Layout>
      <div>{i18n.t('Hello World, What are you gonna write?')}</div>
    </Layout>
  );
};

export default Home;
