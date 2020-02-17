# hort/mongorest

Rest API to query MongoDB index from client.

## Usage

```
npm start
```

# Dependencies

- body-parser
- express
- mongodb

# Documentation

## `GET /`

- `collection`: collection in which query
- `query`: MongoDB query

```
$ curl "http://localhost:4000?collection=index&query=\{\}"

[{"_id":"5e1b56a2eb920ca66368fd74","{\"last_check\":\"1578850048\"}":""}]%
```

## `POST /`

- `collection`: collection where to insert documents

```
$ curl -XPOST "http://localhost:4000?collection=index" --data '{"last_check":"1578850048"}'
```

