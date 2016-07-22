# react-example

To be remodded into a basic react example, and separate an isomorphic example.

* wordpress http://127.0.0.1:8080/
* react http://127.0.0.1:8081

## references

* express in production https://strongloop.com/strongblog/best-practices-for-express-in-production-part-one-security/
* isomorphic redux https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4#.6samy5wz9

## SEO and Routing

google crawling now supports js single page apps.

routing uses hash redirection so users can insert plain links into wordpress
that will respond to component loads.  html5 push state reloads the page on link.

https://webmasters.googleblog.com/2015/10/deprecating-our-ajax-crawling-scheme.html


## apache2 config

apache needs the following .htaccess config setup for regular webservers so
react-router can use virtual paths

<pre>
RewriteEngine On
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]

RewriteRule ^ /index.html [L]
</pre>

## wordpress post location

http://127.0.0.1:8080/?rest_route=/wp/v2/posts&type=page

### queries

routes
\/wp\/v2
\/wp\/v2\/posts
\/wp\/v2\/posts\/(?P<id>[\\d]+)    -    ?rest_route=/wp/v2/pages/1
\/wp\/v2\/posts\/(?P<parent>[\\d]+)\/revisions
\/wp\/v2\/posts\/(?P<parent>[\\d]+)\/revisions\/(?P<id>[\\d]+)

    "replies":[{"embeddable":true,"href":"http:\/\/127.0.0.1:8081\/?rest_route=%2Fwp%2Fv2%2Fcomments&post=10"}]

\/wp\/v2\/pages
\/wp\/v2\/pages\/(?P<id>[\\d]+)
\/wp\/v2\/pages\/(?P<parent>[\\d]+)\/revisions
\/wp\/v2\/pages\/(?P<parent>[\\d]+)\/revisions\/(?P<id>[\\d]+)
\/wp\/v2\/media
\/wp\/v2\/media\/(?P<id>[\\d]+)
\/wp\/v2\/types
\/wp\/v2\/types\/(?P<type>[\\w-]+)
\/wp\/v2\/statuses
\/wp\/v2\/statuses\/(?P<status>[\\w-]+)
\/wp\/v2\/taxonomies
\/wp\/v2\/taxonomies\/(?P<taxonomy>[\\w-]+)
\/wp\/v2\/categories
\/wp\/v2\/categories\/(?P<id>[\\d]+)
\/wp\/v2\/tags
\/wp\/v2\/tags\/(?P<id>[\\d]+)
\/wp\/v2\/users
\/wp\/v2\/users\/(?P<id>[\\d]+)
\/wp\/v2\/users\/me
\/wp\/v2\/comments
\/wp\/v2\/comments\/(?P<id>[\\d]+)
\/oembed\/1.0
\/oembed\/1.0\/embed
_links

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
