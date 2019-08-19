# spot4zik-core

A new project soon... its goal is suspense for now ;-)

## API usage

### zik-resources

A zik-resource is a resource saved and used in spot4zik.  
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
    }
  ],
  "creation-date": "2019-08-19T01:33:39Z",
  "added-by": "legrosmanu"
}
```

#### Create a zik-resource (`POST /zik-resources`)

Your first usage will be to save in spot4zik a resource you found on the web.  
So, this resource has an url, and this url is the only field mandatory to create a zik-resource.  
The operation to do: `POST /zik-resources`  
In the body of the request, you'll have at least an url, as we said but, a musician resource is about a song, so it's better to add an artist and a title of a song:
```json
{
  "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
  "artist": "Tool",
  "title": "Sober"
}
```

**Responses**    
In addition to the usual `40*` and (hope not) `50*` responses, you'll have:  
 
- `201 Created` if everything is ok, and so your zik-resource is created.
- `401 Unauthorized` if you are not logged in.