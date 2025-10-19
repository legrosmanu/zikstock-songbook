import { getZikresourcesOfUser, createZikresource } from '../domain/service';

describe("Querries on zikresource", () => {

  const testTimeout = 10000;

  test('should create and retrieve only the zikresources of the expected user', async () => {
    const zikresource1 = {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Never gonna give you up",
      artist: "Rick Astley",
      createdBy: "legrosmanu"
    };

    const zikresource2 = {
      url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
      title: "Numb",
      artist: "Linkin Park",
      createdBy: "legrosmanu"
    };

    const zikresource3 = {
      url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
      title: "Bohemian Rhapsody",
      artist: "Queen",
      createdBy: "freddiem"
    };

    await createZikresource(zikresource1);
    await createZikresource(zikresource2);
    await createZikresource(zikresource3);

    const zikresources = await getZikresourcesOfUser('legrosmanu');

    expect(zikresources).not.toBeNull();
    expect(zikresources).toHaveLength(2);
  }, testTimeout);

});
