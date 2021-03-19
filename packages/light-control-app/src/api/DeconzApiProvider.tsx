import { ReactElement, ReactNode } from 'react';
import { DeconzResource } from 'light-control-lib';

export function DeconzApiProvider({ children } : { children: ReactNode }): ReactElement {
  try {
    DeconzResource.setupApi(process.env.DECONZ_HOST, process.env.DECONZ_API_KEY);
    return <>{children}</>;
  } catch (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }
}
