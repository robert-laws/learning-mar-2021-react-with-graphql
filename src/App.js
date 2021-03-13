import { useEffect, useState, useCallback } from 'react';
import './App.scss';
import github from './db';
import { licenseGithubQuery } from './query';
import RepoInfo from './RepoInfo';

function App() {
  const [userName, setUserName] = useState('');
  const [repoList, setRepoList] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(github.baseURL, {
        method: 'POST',
        headers: github.headers,
        body: JSON.stringify(licenseGithubQuery),
      });

      const data = await response.json();

      const name = data.data.viewer.name;
      const repos = data.data.search.nodes;

      setUserName(name);
      setRepoList(repos);
    } catch (error) {
      console.log(error);
    }

    // fetch(github.baseURL, {
    //   method: 'POST',
    //   headers: github.headers,
    //   body: JSON.stringify(licenseGithubQuery),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const name = data.data.viewer.name;
    //     const repos = data.data.search.nodes;
    //     setUserName(name);
    //     setRepoList(repos);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className='container mt-5'>
      <h1 className='text-primary'>
        <i className='bi bi-diagram-2-fill'></i> Repos
      </h1>
      <p>Hello, {userName}</p>

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
