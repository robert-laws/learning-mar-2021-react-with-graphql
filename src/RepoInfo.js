import React from 'react';

const RepoInfo = ({ repo }) => {
  const { url, name, description, viewerSubscription, licenseInfo } = repo;

  const license = licenseInfo?.spdxId;
  let licenseOutput;

  switch (license) {
    case undefined:
      licenseOutput = (
        <span className='px-1 py-0 ms-1 d-inline-block btn btn-sm btn-danger'>
          No License
        </span>
      );
      break;

    case 'MIT':
      licenseOutput = (
        <span className='px-1 py-0 ms-1 d-inline-block btn btn-sm btn-warning'>
          {license}
        </span>
      );
      break;

    case '0BSD':
      licenseOutput = (
        <span className='px-1 py-0 ms-1 d-inline-block btn btn-sm btn-primary'>
          {license}
        </span>
      );
      break;

    default:
      break;
  }

  return (
    <li className='list-group-item'>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='d-flex flex-column'>
          <a href={url} className='h5 mb-0 text-decoration-none'>
            {name}
          </a>
          <p className='small'>{description}</p>
        </div>
        <div className='text-nowrap ms-3'>
          {licenseOutput}
          <span
            className={
              'px-1 py-0 ms-1 d-inline-block btn btn-sm ' +
              (viewerSubscription === 'SUBSCRIBED'
                ? 'btn-success'
                : 'btn-outline-secondary')
            }
            style={{ fontSize: '0.8em' }}
          >
            {viewerSubscription}
          </span>
        </div>
      </div>
    </li>
  );
};

export default RepoInfo;
