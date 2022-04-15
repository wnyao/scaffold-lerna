import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import Tab from '@packages/core/client/components/Tab';
import { useRouter, useLanguage } from '@packages/core/client/hooks';
import ROUTES from '@packages/core/client/routes';
import { LANGUAGE } from '@packages/core/lib/i18n';
import { bottomTabs } from './configs';

interface ILayoutProps {
  children?: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  const { language, languageOptions, changeLanguage } = useLanguage();
  const { navigate } = useRouter();

  return (
    <LayoutContainer>
      <Header>
        <div onClick={() => navigate(ROUTES.HOME)}>
          <span>Scaffold Lerna</span>
        </div>
        <Tab options={languageOptions} value={language} onClick={({ value }) => changeLanguage(value as LANGUAGE)} />
      </Header>
      <Content>
        {children}
        <br />
        <Links>
          {bottomTabs.map(({ name, href }) => (
            <div key={name()} onClick={() => window.open(href, '_blank')}>
              {name()}
            </div>
          ))}
        </Links>
      </Content>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100%;
`;

const ContentWrapper = styled.div`
  width: 1280px;
  margin: auto;
`;

const Header = styled(ContentWrapper)`
  display: flex;
  justify-content: space-between;

  padding: 20px 0;

  > div span {
    font-size: 12px;

    &:first-child {
      font-size: 24px;
      font-weight: bold;
      margin-right: 20px;
      cursor: pointer;
    }
  }
`;

const Content = styled(ContentWrapper)`
  flex: 1;
  padding: 20px 0;
`;

const Links = styled(ContentWrapper)`
  > div:hover {
    cursor: pointer;
    font-weight: bold;
    text-decoration: underline;
  }
`;
