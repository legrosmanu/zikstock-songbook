# spot4zik-core

spot4zik is a platform to help the musicians to play music.  
And because spot4zik is very new, we propose only one functionality: **save in spot4zik the musical resources you need to play music**.  

A musical resource is a Web link to a tab, tutorial, movies, all you need to play music alone or together.  
So you'll find in one place all the Web links you saved to play music. But, you certainly already have them saved in your browser. Isn't it?  
So what is the value to use spot4zik? It's because, you'll be able to share easily all your musical resources with your friends, and it's only a beginning.  

To be continued...

## How to run it

When you are in the root folder of the Dockerfile, first, you have to create the docker image:  
`docker build -t=spot4zik-core .`  
After that, you just have to run it:  
`docker run -p 5000:80 spot4zik-core`  
If you did no changes, you'll be able to use it on <http://localhost:5000/zik-resources.>

## API usage

### Errors  

The example of an error below shows you the format of the error you'll always have. Of course, you'll need also to take care the HTTP code of the HTTP response.  

```json
{
  "code": "403-1",
  "more_info" : "http://a-link-to-the-doc-of-this-error",
  "message" : "You can't delete a zik-resource you didn't create"
}
```  

All the endpoints need to be logged in. So, if you are not, you'll have a `401 Unauthorized`.

### zik-resources

A zik-resource is a Web resource (based on a Web link) saved and used in spot4zik.  
It looks like:

```json
{
  "id": "e4c44f7c-ee6a-40e8-a0cf-5ff67e1504ab",
  "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
  "artist": "Tool",
  "title": "Sober",
  "tags" : [
    {
      "label": "type",
      "value": "tab"
    },
    {
      "label": "difficulty",
       "value": "intermediate"
    },
    {
      "label": "",
      "value": "My personal tag"
    }
  ],
  "creation_date": "2019-08-19T01:33:39Z",
  "added_by": "legrosmanu"
}
```

#### Create a zik-resource (`POST /zik-resources`)

##### Request

Your first usage will be to save in spot4zik a resource. The operation to use is `POST /zik-resources`  
The resource has at least an url, and a title to use it easily. These two fields are the mandatory fields to create a zik-resource.
So, an example of the minimal body of a request could be:

```json
{
  "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
  "title": "Sober"
}
```

You can see above in the example of a whole zik-resource, you can add other information, like an artist (of a song), and some tags.  
The tags are here to let you free to add information you need. But you can't add more than 10 tags.  

###### Responses

- `201 Created` if everything is ok, and so your zik-resource has been created.
- `400 Bad request` if your request is not correct.

#### Get your zik-resources (`GET /zik-resources?added-by={your-username}`)

##### Request

After creating some zik-resources, you'll want to get them.  
To get your zik-resources, you just have to do a `GET /zik-resources?added-by={your-username}`.
Of course, you have to replace `you-username` by your spot4zik username, but you can also get the zik-resources of another user for example to see what learn if you want to play with him.

##### Responses

- `200 OK` with the array of the zik-resources in the body or an empty array if no zik-resources has been found.

#### Get a zik-resource (`GET /zik-resources/{id}`)

##### Request

To get a zik-resource, you just have to do a `GET /zik-resources/{id}` with the id of the zik-resource added when the zik-resource has been created.

##### Response

- `200 OK` with the zik-resource in the body.
- `404 Not Found` if the zik-resource with this id doesn't exist.

#### Delete a zik-resource (`DELETE /zik-resources/{id})

##### Request

To delete a zik-resource, you just have to do a `DELETE /zik-resources/{id}` with the id of the zik-resource added when the zik-resource has been created.  
You can do it only for a resource you added in spot4zik.

##### Response

- `204 No Content` if the delete has worked fine.
- `403 Forbidden` if you try to delete a zik-resource you didn't create.
