import { useEffect, useState, useCallback } from 'react';
import SearchBox from './SearchBox';
import NavButtons from './NavButtons';
import './App.scss';
import github from './db';
import { queryWithParamsAndPagination } from './query';
import RepoInfo from './RepoInfo';

function App() {
  const [userName, setUserName] = useState('');
  const [repoList, setRepoList] = useState(null);
  const [pageCount, setPageCount] = useState(10);
  const [queryString, setQueryString] = useState('');
  const [totalCount, setTotalCount] = useState(null);

  const [startCursor, setStartCursor] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [paginationKeyword, setPaginationKeyword] = useState('first');
  const [paginationString, setPaginationString] = useState('');

  const fetchData = useCallback(async () => {
    const queryText = JSON.stringify(
      queryWithParamsAndPagination(
        pageCount,
        queryString,
        paginationKeyword,
        paginationString
      )
    );

    try {
      const response = await fetch(github.baseURL, {
        method: 'POST',
        headers: github.headers,
        body: queryText,
      });

      const data = await response.json();

      const name = data.data.viewer.name;
      const repos = data.data.search.edges;
      const total = data.data.search.repositoryCount;
      const start = data.data.search.pageInfo?.startCursor;
      const end = data.data.search.pageInfo?.endCursor;
      const next = data.data.search.pageInfo?.hasNextPage;
      const prev = data.data.search.pageInfo?.hasPreviousPage;

      setUserName(name);
      setRepoList(repos);
      setTotalCount(total);

      setStartCursor(start);
      setEndCursor(end);
      setHasNextPage(next);
      setHasPreviousPage(prev);
    } catch (error) {
      console.log(error);
    }
  }, [pageCount, queryString, paginationString, paginationKeyword]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleQueryStringUpdate = (myString) => {
    setQueryString(myString);
  };

  const handlePageCountChangeUpdate = (myCount) => {
    setPageCount(myCount);
  };

  const handleOnPage = (myKeyword, myString) => {
    setPaginationKeyword(myKeyword);
    setPaginationString(myString);
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
      <NavButtons
        total={totalCount}
        count={pageCount}
        start={startCursor}
        end={endCursor}
        next={hasNextPage}
        previous={hasPreviousPage}
        onPage={(myKeyword, myString) => handleOnPage(myKeyword, myString)}
      />
      {repoList && (
        <ul className='list-group list-group-flush'>
          {repoList.map((repo) => (
            <RepoInfo key={repo.node.id.toString()} repo={repo.node} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
