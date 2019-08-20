---
title: HTTP & Rest
verticalSeparator: ---//
---

# HTTP

- HTTP stands for Hypertext Transfer Protocol

  <!-- .element: class="fragment" data-fragment-index="1" -->

- It's a stateless, application-layer protocol for communicating between distributed systems, and is the foundation of the modern web

  <!-- .element: class="fragment" data-fragment-index="2"-->

- Current version of the protocol is HTTP 1.1, although 2.0 is underway
  <!-- .element: class="fragment" data-fragment-index="3"-->

---

## Message

Communication between a host an a client occurs, via a request/response pair and are composed of textual information encoded in ASCII

<img src="./images/HTTPMsgStructure2.png" style="background-color:#f0efe7"/>
  <!-- .element: class="fragment" data-fragment-index="1" -->

---//

### Composition

1. A start-line describing the requests to be implemented, or its status
   <!-- .element: class="fragment" data-fragment-index="1" -->
2. An optional set of HTTP headers specifying the request, or describing the body included in the message.
   <!-- .element: class="fragment" data-fragment-index="2" -->
3. A blank line indicating all meta-information for the request have been sent.
   <!-- .element: class="fragment" data-fragment-index="3" -->
4. An optional body containing data associated with the request, or the document associated with a response
   <!-- .element: class="fragment" data-fragment-index="4" -->

---

## Request

A request is made via a Uniform Resource Locator (URL)

<img src="./images/http1-url-structure.png" />

---//

### Url Parts

- **Protocol** http, https, ftp, ...
- **Port** The default port is 80 for http
- **Resource Path** The local path to the resource on the server
- **Query** Url-encoded values

```
# querystring
?param1=value1&param2=value2
```

---//

### Verbs

- **GET:** The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.

- **POST:** The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server.

  <!-- .element: class="fragment" data-fragment-index="1" -->

- **PUT:** The PUT method replaces all current representations of the target resource with the request payload.

  <!-- .element: class="fragment" data-fragment-index="2" -->

---//

- **DELETE:** The DELETE method deletes the specified resource.

- **PATCH:** The PATCH method is used to apply partial modifications to a resource.

  <!-- .element: class="fragment" data-fragment-index="1" -->

- **HEAD:** The HEAD method asks for a response identical to that of a GET request, but without the response body.

  <!-- .element: class="fragment" data-fragment-index="2" -->

- **OTHERS:** OPTIONS, TRACE, CONNECT

  <!-- .element: class="fragment" data-fragment-index="3" -->

---

### Request Headers

#### Accept

The Accept request HTTP header advertises which content types, expressed as MIME types, the client is able to understand.

```http
Accept: <MIME_type>/<MIME_subtype>
Accept: <MIME_type>/*
Accept: */*

# Multiple types, weighted with the quality value syntax:
Accept: text/html, application/xml;q=0.9, */*;q=0.8
```

---//

#### User-Agent

The User-Agent request header contains a characteristic string that allows the network protocol peers to identify the application type, operating system, software vendor or software version of the requesting software user agent.

```http
User-Agent: <product>/<product-version> <comment>

# Example
User-Agent: PostmanRuntime/7.15.0
```

---//

#### Host

The Host request header specifies the domain name of the server (for virtual hosting), and (optionally) the TCP port number on which the server is listening.

```http
Host: <host>:<port>

# Example
Host: localhost:3000
```

---//

#### More ...

Please see [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

---

## Response

### Status Codes

- **1XX** Informational responses

  <!-- .element: class="fragment" data-fragment-index="1" -->

- **2XX** Successful responses

  <!-- .element: class="fragment" data-fragment-index="2" -->

- **3XX** Redirection messages

  <!-- .element: class="fragment" data-fragment-index="3" -->

- **4XX** Client error responses

  <!-- .element: class="fragment" data-fragment-index="4" -->

- **5XX** Server error responses
  <!-- .element: class="fragment" data-fragment-index="5" -->

---//

#### **1XX:** Informational responses

- **100 Continue** This interim response indicates that everything so far is OK and that the client should continue with the request or ignore it if it is already finished.

- **101 Switching Protocol** This code is sent in response to an Upgrade request header by the client, and indicates the protocol the server is switching to.

---//

#### **2XX** Successful responses

- **200 OK** The request has succeeded
- **201 Created** The request has succeeded and a new resources has been created as a result of it
- **204 No Content** There is no content to send for this request

---//

#### **3XX** Redirection messages

- **301 Moved Permanently** The resource is now located at a new URL.
- **303 See Other** The resource is temporarily located at a new URL. The Location response header contains the temporary URL.
- **304 Not Modified** This is used for caching purposes. It tells the client that the response has not been modified, so the client can continue to use the same cached version of the response.

---//

#### **4XX** Client error responses

- **400 Bad Request** The request was malformed
- **401 Unauthorized** The request requires authentication
- **403 Forbidden** The client does not have access rights to the content, unlike 401 the clients identity is known to the server
- **404 Not Found** The resource is not found
- **405 Method Not Allowed** The request method is known by the server but cannot be used
- **409 Conflict** The request conflicts with the current state of the server

---//

#### **5XX** Server error responses

- **500 Internal Server Error** The server has encountered a situation that it does not know how to handle
- **501 Not Implemented** The server does not yet support the requested functionality.
- **503 Service Unavailable** The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded.

---//

### Response headers

#### Content-Type

The Content-Type entity header is used to indicate the media type of the resource.

```http
Content-Type: text/html; charset=utf-8
```

---//

#### Server

The Server header contains information about the software used by the origin server to handle the request.

```http
Server: <product>

# Example
Server: Apache/2.4.1 (Unix)
```

---//

#### Content-Length

The Content-Length entity header indicates the size of the entity-body, in bytes, sent to the recipient.

```http
Content-Length: <length>
```

---//

#### Set-Cookie

The Set-Cookie HTTP response header is used to send cookies from the server to the user agent.

```http
Set-Cookie: <cookie-name>=<cookie-value>
Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<non-zero-digit>
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>
Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value>
Set-Cookie: <cookie-name>=<cookie-value>; Secure
Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly

Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Strict
Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Lax

# Multiple directives are also possible, for example:
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly
```

---

# REST

REST stands for REpresentational State Transfer, and it is an architectural style, or design pattern for API's.

> REST was defined by Roy Fielding, a computer scientist. He presented the REST principles in his PhD dissertation in 2000.

The representation of the state can be in a JSON format (mostly), XML or HTML format.

---//

What the server does when you, the client, call one of its APIs depends on 2 things that you need to provide to the server:

1. An identifier for the resource you are interested in. This is the URL for the resource, also known as the endpoint. In fact, URL stands for Uniform Resource Locator.
2. The operation you want the server to perform on that resource, in the form of an HTTP method, or verb. The common HTTP methods are GET, POST, PUT, and DELETE

---//

## Basic principles

- **Client-Server Communication** distinct separation of concerns
- **Stateless** each client request to the server requires that its state be fully represented.
- **Cacheable** cache constraints may be used, thus enabling response data to to be marked as cacheable or not-cacheable.

---//

## Resource Identifier

Each resource is identified by its resource identifier. For example:

```
Car: http://www.automart.com/cars/12345

Part: http://www.automart.com/part/12345

Engine: http://www.automart.com/engine/12345
```

---

# Exercices

```bash
# Ensure you have checked out the bootcamp source
git clone git@github.com:Euricom/training-bootcamp-frontend-2019Q3.git

# Navigate to the api folder and install deps
npm i

# Run our fake api server
npm run serve:user-api
```

Open the [API](http://localhost:3000/) and use postman to complete the following exercises

---//

### Exercise 1

> Get a list of all users ordered by lastName asc and firstName asc

---//

### Exercise 2

> Get a paginated list of users where the pageSize is 5 and get the second page. As a bonus find out how the api communicates the total amount of users

---//

### Exercise 3

> Get the user with the id 2

---//

### Exercise 4

> Create a new user with the data of yourself

---//

### Exercise 5

> Remove yourself again
