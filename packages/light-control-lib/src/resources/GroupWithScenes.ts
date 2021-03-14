/* eslint-disable max-classes-per-file */
import Resource from 'rest-resource';
import GroupResource from './GroupResource';
import SceneResource from './SceneResource';

export default class GroupWithScenesResource extends GroupResource {
  scenes(): typeof Resource {
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
}
