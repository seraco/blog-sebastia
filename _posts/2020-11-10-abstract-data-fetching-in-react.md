---
excerpt: How to simplify requesting data.
time_to_read: 3 min
---

When I work with large code bases, I often find that they lack a clear and unified strategy for data fetching. A pattern I have noticed when using [Hooks](https://reactjs.org/docs/hooks-intro.html){:class="ext-link"} is the following code snippet repeated every time data need to be loaded:

```javascript
function useData() {
  const [data, setData] = useState({
    isLoading: false,
    data: undefined,
    hasError: false,
  });

  const fetchData = async () => {
    setData(prevState => ({
      ...prevState,
      isLoading: true,
      hasError: false,
    }));
    try {
      // getData provides the requested data
      const response = await getData();
      setData(prevState => ({
        ...prevState,
        data: response,
        isLoading: false,
      }));
    } catch (error) {
      setData(prevState => ({
        ...prevState,
        isLoading: false,
        hasError: true,
      }));
    }
  };

  return { data, fetchData };
}
```

The main difference between each repetition of this code is `getData`. For instance, when fetching posts or profile information it could be `getPosts` or `getUserInfo`.

Even though in many circumstances [repeating code is completely acceptable and even encouraged](https://overreacted.io/the-wet-codebase){:class="ext-link"}, I believe that this case should be abstracted. The reason why is because when thinking about user experience, the same functionality is usually expected by users every time they fetch new data.

Data fetching is usually triggered through some sort of action, such as clicking a button or typing into a search box. After this, if the data are not received immediately, users expect to see some sort of [visual feedback](https://www.nngroup.com/articles/response-times-3-important-limits){:class="ext-link"} like a spinner. If there is a problem getting the data, they expect an [error message](https://www.nngroup.com/articles/error-message-guidelines){:class="ext-link"}.

So, it would make sense to have a Hook that would abstract all of this functionality. One way this can be achieved is with the following:

```javascript
const [{ loading, data, hasError }, fetchData] = useRequest(request);
```

The amount of typing involved is greatly reduced and now `useRequest` clearly returns what users need: a loading state, the requested data, an error state and a function for fetching the data.

One way `useRequest` could be implemented is by taking the same structure as in `useData` but now passing `request` as an argument of the Hook:

```javascript
function useRequest(request) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);
  const [hasError, setHasError] = useState(false);

  async function fetchData(...args) {
    try {
      setLoading(true);
      setHasError(false);
      // arbitrary args can be sent through fetchData to request
      const response = await request(...args);
      setData(response);
    } catch (error) {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }

  return [{ loading, data, hasError }, fetchData];
}
```

Although `useRequest` provides a more declarative and simple solution for data fetching, there are a few more questions that remain open:

* How can a caching strategy be implemented?
* How does one deal with stale data?
* When should refetching happen?
* Which retry approach should be followed after failures?
* How can support for paginated queries be added?
* Can one cancel an active request?

Several open source libraries for remote data fetching tackle these points. For further information, I recommend [React Query](https://github.com/tannerlinsley/react-query){:class="ext-link"} and [SWR](https://github.com/vercel/swr){:class="ext-link"}.
