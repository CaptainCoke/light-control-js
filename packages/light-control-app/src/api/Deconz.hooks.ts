import { useState, useEffect } from 'react';
import { DeconzResource, LightResource, LightState } from 'light-control-lib';

type LightInfo = {
  name: string,
  type: string,
  state: LightState,
}

export function useLight(id: number): {
  light: LightInfo | null,
  isLoading: boolean,
  error?: Error,
} {
  const [light, setLight] = useState<LightInfo | null>(null);
  useEffect(() => {
    LightResource.detail(id).then((res) => setLight({
      name: res.get('name'),
      type: res.get('type'),
      state: res.getState(),
    }));
  }, []);

  const isLoading = !light;
  return {
    light,
    isLoading,
  };
}

export function useList<T extends typeof DeconzResource>(ResourceType: T): {
  resourceIds: number[],
  isLoading: boolean,
  error?: Error
} {
  const [idStrings, setData] = useState<string[] | null>(null);
  useEffect(() => {
    ResourceType.list().then(({ resources }) => setData(resources.map((res) => res.id)));
  }, []);

  const isLoading = !idStrings;
  return {
    resourceIds: idStrings?.map((id) => Number.parseInt(id, 10)) ?? [],
    isLoading,
  };
}
