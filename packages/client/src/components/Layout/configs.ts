interface IBottomTabs {
  name: () => string;
  href?: string;
}

export const bottomTabs: IBottomTabs[] = [
  {
    name: () => i18n.t('GitHub'),
    href: 'https://github.com/wnyao/scaffold-lerna'
  }
];
