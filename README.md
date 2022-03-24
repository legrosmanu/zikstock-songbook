# spot4zik-core

spot4zik is a platform to help the musicians to play music.  
And because spot4zik is very new, we propose only one functionality for now: **save in spot4zik the musical resources you need to play music**.

A musical resource is a Web link to a tablature, tutorial, movies, all you need to play music alone or together.  
So you'll find in one place all the Web links you saved to play music. But, you certainly already have them saved in your browser. Isn't it?  
So what is the value to use spot4zik? It's because, you'll be able to share easily all your musical resources with your friends, and it's only a beginning.

To be continued...


## How to test and run it

### Environment variables

You'll need these variables (of course, use the values related to your context):  
```bash
ZIKSTOCK_CORE_DB_URL=jdbc:postgresql://localhost:5432/zikstock
ZIKSTOCK_CORE_DB_USER=postgres
ZIKSTOCK_CORE_DB_PWD=postgres
```

### Unit tests

TODO

### Integration tests or UI development

TODO

### Run it

TODO

## API usage

TODO

### errors

The example of an error below shows you the format of the error you'll always have. Of course, you'll need also to take care the HTTP code of the HTTP response.

```json
{
  "timestamp": "2022-02-17T20:58:52.355+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Required request body is missing: public com.zikstock.songbook.zikresource.Zikresource com.zikstock.songbook.zikresource.ZikresourceController.createZikresource(com.zikstock.songbook.zikresource.Zikresource)"
}
```  

All the endpoints need to be logged in. So, if you are not, you'll have a `401 Unauthorized`.

### users

Description will be here soon. For now, the main information are :

- You can create a user on /POST /users
- You can log in with /POST /users/login, which will give you a JWT in the body of the response.

### zikresources

A zikresource is a Web resource (based on a Web link) saved and used in spot4zik.  
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
  "addedBy": {
    "email": "test@test.com",
    "displayName": "what a user",
    "link": "/users/e6c14f7c-ee7a-79e8-a0cf-5ff67e2224el"
  }
}
```

#### Create a zikresource (`POST /zikresources`)

##### Request

Your first usage will be to save in spot4zik a resource. The operation to use is `POST /zikresources`  
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
Of course, you have to replace `you-username` by your spot4zik username (which is your email), but you can also get the zikresources of another user for example to see what to learn if you want to play with her/him.

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

- `204 No Content` if the deleted has worked fine.
- `403 Forbidden` if you try to delete a zikresource you didn't create.
