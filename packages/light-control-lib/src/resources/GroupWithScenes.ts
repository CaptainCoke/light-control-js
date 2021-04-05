/* eslint-disable max-classes-per-file */
import { DeconzResource } from './DeconzResource';
import { GroupResource } from './GroupResource';
import { SceneResource } from './SceneResource';

export class GroupWithScenesResource extends GroupResource {
  scenes(): typeof DeconzResource {
    const groupId: number = this.attributes.id;

    class GroupScenes extends SceneResource {
      static endpoint = `/groups/${groupId}/scenes`;

      // eslint-disable-next-line class-methods-use-this
      async group(): Promise<GroupResource> {
        const resource = await GroupWithScenesResource.detail(groupId);
        return <GroupResource>resource;
      }
    }

    return GroupScenes;
  }

  async numberOfScenes(): Promise<number> {
    const { resources: scenes } = await this.scenes().list();
    return scenes.length;
  }

  async getRelativeSceneId(offsetToCurrentScene: number): Promise<string | null> {
    const { resources: scenes } = await this.scenes().list();
    const currentSceneId = this.getCurrentSceneId();
    const sceneIndex = scenes.findIndex((scene) => scene.id === currentSceneId);
    if (sceneIndex < 0) return null;

    const nextScene = (sceneIndex + offsetToCurrentScene) % scenes.length;
    return scenes[nextScene < 0 ? nextScene + scenes.length : nextScene].id;
  }
}
