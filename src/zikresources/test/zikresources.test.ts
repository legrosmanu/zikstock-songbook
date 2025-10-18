import { getZikresourcesOfUser } from '../service';

describe("Querries on zikresource", () => {

  const testTimeout = 10000;

  test('should retrieve only the zikresources of the expected user', async () => {
    const zikresources = await getZikresourcesOfUser('legrosmanu');

    expect(zikresources).not.toBeNull();
    expect(zikresources).toHaveLength(2);
  }, testTimeout);

});
