# spot4zik-core

A new project soon... its goal is a suspense for now ;-)

## API usage

### zik-resources

A zik-resource is a Web resource saved and used in spot4zik.  
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

Your first usage will be to save in spot4zik a resource you found on the web to play music (like a tab, a tutorial, etc).  
The operation to use: `POST /zik-resources`    
The resource has at least an url, and to use it easily a title. These two fields are the mandatory fields to create a zik-resource. 
So, an example of the body of your request could be:
```json
{
  "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
  "title": "Sober"
}
```
But, you can see above in the example of a whole zik-resource, you can add other information, like an artist (of a song), and some tags.  
The tags are here to let you free to add information you need. But you can't add more than 10 tags.  

**Responses**    
In addition to the usual `40*` and (hope not) `50*` responses, you'll have:  
 
- `201 Created` if everything is ok, and so your zik-resource has been created.
- `401 Unauthorized` if you are not logged in.