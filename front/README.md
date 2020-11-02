# FRONTEND
we used semantic-ui css for our front, we get the `css file` by:
```
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.css"/>

  <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="  crossorigin="anonymous"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.js"></script>
```

we send request and get data from server by [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
```
fetch(address ,{ method: 'GET' })
                .then(
                  function (response) {
                        if (response.status !== 200) {
                            console.log('there is a problem ' + response.status);
                            return;
                        }
                        response.text().then(
                          // something to do
                          );
                    }
                )
                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });
    }
```
