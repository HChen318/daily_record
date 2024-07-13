function myFetch(url, method, data) {
  return fetch(url, {
    body: data ? Json.stringify(data) : "",
    method,
  }).then((res) => res.json());
}

myFetch.get = (url, data) => {
  return myFetch(url, "GET", data);
};

myFetch.post = (url, data) => {
  return myFetch(url, "POST", data);
};

export default myFetch;
