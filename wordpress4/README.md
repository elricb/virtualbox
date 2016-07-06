# react-example

To be remodded into a basic react example, and separate an isomorphic example.


## wordpress post location

http://127.0.0.1:8081/?rest_route=/wp/v2/posts&type=page

### sample page
<pre><code>
[  
   {  
      "id":1,
      "date":"2016-07-06T21:34:44",
      "date_gmt":"2016-07-06T21:34:44",
      "guid":{  
         "rendered":"http:\/\/127.0.0.1:8081\/?p=1"
      },
      "modified":"2016-07-06T21:34:44",
      "modified_gmt":"2016-07-06T21:34:44",
      "slug":"hello-world",
      "type":"post",
      "link":"http:\/\/127.0.0.1:8081\/?p=1",
      "title":{  
         "rendered":"Hello world!"
      },
      "content":{  
         "rendered":"<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!<\/p>\n"
      },
      "excerpt":{  
         "rendered":"<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!<\/p>\n"
      },
      "author":1,
      "featured_media":0,
      "comment_status":"open",
      "ping_status":"open",
      "sticky":false,
      "format":"standard",
      "categories":[  
         1
      ],
      "tags":[  

      ],
      "_links":{  
         "self":[  
            {  
               "href":"http:\/\/127.0.0.1:8081\/?rest_route=\/wp\/v2\/posts\/1"
            }
         ],
         "collection":[  
            {  
               "href":"http:\/\/127.0.0.1:8081\/?rest_route=\/wp\/v2\/posts"
            }
         ],
         "about":[  
            {  
               "href":"http:\/\/127.0.0.1:8081\/?rest_route=\/wp\/v2\/types\/post"
            }
         ],
         "author":[  
            {  
               "embeddable":true,
               "href":"http:\/\/127.0.0.1:8081\/?rest_route=\/wp\/v2\/users\/1"
            }
         ],
         "replies":[  
            {  
               "embeddable":true,
               "href":"http:\/\/127.0.0.1:8081\/?rest_route=%2Fwp%2Fv2%2Fcomments&post=1"
            }
         ],
         "version-history":[  
            {  
               "href":"http:\/\/127.0.0.1:8081\/?rest_route=\/wp\/v2\/posts\/1\/revisions"
            }
         ],
         "wp:attachment":[  
            {  
               "href":"http:\/\/127.0.0.1:8081\/?rest_route=%2Fwp%2Fv2%2Fmedia&parent=1"
            }
         ],
         "wp:term":[  
            {  
               "taxonomy":"category",
               "embeddable":true,
               "href":"http:\/\/127.0.0.1:8081\/?rest_route=%2Fwp%2Fv2%2Fcategories&post=1"
            },
            {  
               "taxonomy":"post_tag",
               "embeddable":true,
               "href":"http:\/\/127.0.0.1:8081\/?rest_route=%2Fwp%2Fv2%2Ftags&post=1"
            }
         ],
         "curies":[  
            {  
               "name":"wp",
               "href":"https:\/\/api.w.org\/{rel}",
               "templated":true
            }
         ]
      }
   }
]
</pre></code>
