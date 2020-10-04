# hort/backend

## Usage

```
npm start
```

# Dependencies

- cors
- body-parser
- express
- js-yaml
- mongodb

# Documentation

## `GET /health`

Returns the status of the service

```
$ curl "http://localhost:4000/health"

ok
```

## `GET /services`

Returns a list of all services and their metadata

```
$ curl "http://localhost:4000/services"

{"services":[...]}
```

## `GET /mongo`

- `collection`: collection in which query
- `query`: MongoDB query

```
$ curl "http://localhost:4000?collection=index&query=\{\}"

[{"_id":"5e1b56a2eb920ca66368fd74","{\"last_check\":\"1578850048\"}":""}]%
```

## `POST /mongo`

- `collection`: collection where to insert documents

```
$ curl -XPOST "http://localhost:4000?collection=index" --data '{"last_check":"1578850048"}'

{"ok":1,"n":1}
```
