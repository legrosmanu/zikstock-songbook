import { getZikresourcesOfUser } from '../service';

describe("Retrieve behavior on zikresource", () => {

  const testTimeout = 10000;

  test('should retrieve only the zikresources of the expected user', async () => {
    var zikresources = await getZikresourcesOfUser('legrosmanu');

    expect(zikresources).not.toBeNull();
    expect(zikresources).toHaveLength(2);
  }, testTimeout);

});
