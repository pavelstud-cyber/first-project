http://localhost:3000

<!-- //auth and profile request -->

POST /auth/sign_up
params: { "email": string !required, "password": string !required, "password_confirmation": string !optional "first_name": string !optional, "last_name": string !optional }
response example:
{ "status": "success", "data": { "id": 2, "email": "user1@email.com", "firs_name": null, "last_name": null, } }

POST /auth/sign_in
params: { "email": string !required, "password": string !required}
response example:
{ "status": "success", "data": { "id": 2, "email": "user1@email.com", "firs_name": null, "last_name": null, } }

GET /user/profile
response example:
{ "status": "success", "data": { "id": 2, "email": "user1@email.com", "firs_name": null, "last_name": null,posts:[{}],comments:[{}] } }

<!-- // post request -->

GET /posts/all
response example:
{ "status": "success", "data":[
{
"id": 1,"user_id": null,"title": "first post","description": "tests","createdAt": "2021-06-04T11:20:46.539Z","updatedAt": "2021-06-04T11:20:46.539Z","comments": []
}
]
}

GET /posts/all/:lim
:lim- limit returns posts
request example:/posts/all/:5
response example:
{"status": "success", "data":[{},{},{},{},{}]}

GET /posts/post/:id
{"status": "success", "data":{id:1,user_id:1,tittle:'....',description:'...',"createdAt": "2021-06-04T11:20:46.539Z","updatedAt": "2021-06-04T11:20:46.539Z",comments:[{}]}}

POST /posts/add
params: { "title": string !required, "description": string !optional }
response example:
{"status": "success", "data":{id:1,user_id:1,tittle:'....',description:'...',"createdAt": "2021-06-04T11:20:46.539Z","updatedAt": "2021-06-04T11:20:46.539Z"}}

DELETE /posts/post/:id
response example:
{"status": "success", "data":{post id deleted}}

PUT /posts/post/:id
params: { "title": string !required, "description": string !optional }
response example:
{"status": "success", "data":{id:1,user_id:1,tittle:'....',description:'...',"createdAt": "2021-06-04T11:20:46.539Z","updatedAt": "2021-06-04T11:20:46.539Z"}}

<!-- comments request -->

POST /comments/add
params: { "title": string !required, "post_id": numder !required }
response example:
{"status": "success", "data":{id:1,user_id:1,post_id:'1',tittle:'....',,"createdAt": "2021-06-04T11:20:46.539Z","updatedAt": "2021-06-04T11:20:46.539Z"}}

DELETE /comments/comment/:id
response example:
{"status": "success", "data":{comment id deleted}}

PUT /comments/comment/:id
params: { "title": string !required}
response example:
{"status": "success", "data":{id:1,user_id:1,post_id:'1',tittle:'....',,"createdAt": "2021-06-04T11:20:46.539Z","updatedAt": "2021-06-04T11:20:46.539Z"}}
