import { getZikresourcesOfUser } from '../service';

test('should retrieve only the zikresources of the expected user', async () => {
  var zikresources = await getZikresourcesOfUser('legrosmanu');
  console.log(zikresources);
  
  expect(zikresources).not.toBeNull();
  expect(zikresources).toHaveLength(2);
});
