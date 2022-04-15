import React, { ReactNode, ComponentType, PropsWithChildren, PropsWithoutRef, lazy as ReactLazy } from 'react';

interface ILazyLoader<P> {
  (): Promise<{ default: ComponentType<P> }>;
}

const lazy = <P extends Record<string, unknown>>(loader: ILazyLoader<P>, loading: ReactNode = null) => {
  const LazyComponent = ReactLazy(loader);

  const SuspenseComponent = (props: PropsWithChildren<PropsWithoutRef<P>>) => (
    <React.Suspense fallback={loading}>
      <LazyComponent {...props} />
    </React.Suspense>
  );

  return SuspenseComponent;
};

export default lazy;
