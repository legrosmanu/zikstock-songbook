# zikstock-core

> Not ready yet for production. Dev in progress

zikstock is a platform to help the musicians to play music.  
And because zikstock is very new, we propose only one functionality for now: **save in zikstock the musical resources you need to play music**.  

A musical resource is a Web link to a tablature, tutorial, movies, all you need to play music alone or together.  
So you'll find in one place all the Web links you saved to play music. But, you certainly already have them saved in your browser. Isn't it?  
So what is the value to use zikstock? It's because, you'll be able to share easily all your musical resources with your friends, and it's only a beginning.  

To be continued...

[//]: < not docker for now >

[//]: < ## How to run it>

[//]: < When you are in the root folder of the Dockerfile, first, you have to create the docker image:  >
[//]: < `docker build -t=zikstock-core .`  >
[//]: < After that, you just have to run it:  >
[//]: < `docker-compose up -V`  >
[//]: < If you did no changes, you'll be able to use it on http://localhost:3000/api/zikresources.>

## API usage

### Errors  

The example of an error below shows you the format of the error you'll always have. Of course, you'll need also to take care the HTTP code of the HTTP response.  

```json
{
  "code": "403-1",
  "details" : "You can't delete a zikresource you didn't create"
}
```  

All the endpoints need to be logged in. So, if you are not, you'll have a `401 Unauthorized`.

### zikresources

A zikresource is a Web resource (based on a Web link) saved and used in zikstock.  
It looks like:

```json
{
  "_id": "e4c44f7c-ee6a-40e8-a0cf-5ff67e1504ab",
  "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
  "artist": "Tool",
  "title": "Sober",
  "type" : "tablature",
  "tags" : [
    {
      "label": "difficulty",
       "value": "intermediate"
    },
    {
      "label": "to learn",
      "value": "My personal tag"
    }
  ],
  "createdAt": "2019-08-19T01:33:39Z",
  "updatedAt": "2019-12-10T10:33:39Z",
  "addedBy": "legrosmanu"
}
```

#### Create a zikresource (`POST /zikresources`)

##### Request

Your first usage will be to save in zikstock a resource. The operation to use is `POST /zikresources`  
The resource has at least an url, and a title to use it easily. These two fields are the mandatory fields to create a zikresource.
So, an example of the minimal body of a request could be:

```json
{
  "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
  "title": "Sober"
}
```

You can see above in the example of a whole zikresource, you can add other information, like an artist (of a song), and some tags.  
The tags are here to let you free to add information you need. But you can't add more than 10 tags.  

###### Responses

- `201 Created` if everything is ok, and so your zikresource has been created.
- `400 Bad request` if your request is not correct.

#### Get your zikresources (`GET /zikresources?addedBy={your-username}`)

##### Request

After creating some zikresources, you'll want to get them.  
To get your zikresources, you just have to do a `GET /zikresources?addedBy={your-username}`.
Of course, you have to replace `you-username` by your spot4zik username, but you can also get the zikresources of another user for example to see what to learn if you want to play with her/him.

##### Responses

- `200 OK` with the array of the zikresources in the body or an empty array if no zikresource has been found.

#### Get a zikresource (`GET /zikresources/{id}`)

##### Request

To get a zikresource, you just have to do a `GET /zikresources/{id}` with the id of the zikresource added when the zikresource has been created.

##### Response

- `200 OK` with the zikresource in the body.
- `404 Not Found` if the zikresource with this id doesn't exist.

#### Delete a zikresource (`DELETE /zikresources/{id})

##### Request

To delete a zikresource, you just have to do a `DELETE /zikresources/{id}` with the id of the zikresource added when the zikresource has been created.  
You can do it only for a resource you added in spot4zik.

##### Response

- `204 No Content` if the delete has worked fine.
- `403 Forbidden` if you try to delete a zikresource you didn't create.
