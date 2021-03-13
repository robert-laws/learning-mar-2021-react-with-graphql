import { useEffect, useState, useCallback } from 'react';
import SearchBox from './SearchBox';
import './App.scss';
import github from './db';
import { queryWithParams } from './query';
import RepoInfo from './RepoInfo';

function App() {
  const [userName, setUserName] = useState('');
  const [repoList, setRepoList] = useState(null);
  const [pageCount, setPageCount] = useState(10);
  const [queryString, setQueryString] = useState('');
  const [totalCount, setTotalCount] = useState(null);

  const fetchData = useCallback(async () => {
    const queryText = JSON.stringify(queryWithParams(pageCount, queryString));

    try {
      const response = await fetch(github.baseURL, {
        method: 'POST',
        headers: github.headers,
        body: queryText,
      });

      const data = await response.json();

      const name = data.data.viewer.name;
      const repos = data.data.search.nodes;
      const total = data.data.search.repositoryCount;

      setUserName(name);
      setRepoList(repos);
      setTotalCount(total);
    } catch (error) {
      console.log(error);
    }
  }, [pageCount, queryString]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleQueryStringUpdate = (myString) => {
    setQueryString(myString);
  };

  const handlePageCountChangeUpdate = (myCount) => {
    setPageCount(myCount);
  };

  return (
    <div className='container mt-5'>
      <h1 className='text-primary'>
        <i className='bi bi-diagram-2-fill'></i> Repos
      </h1>
      <p>Hello, {userName}</p>
      <SearchBox
        totalCount={totalCount}
        pageCount={pageCount}
        queryString={queryString}
        onQueryChange={handleQueryStringUpdate}
        onPageCountChange={handlePageCountChangeUpdate}
      />
      {repoList && (
        <ul className='list-group list-group-flush'>
          {repoList.map((repo) => (
            <RepoInfo key={repo.id.toString()} repo={repo} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
