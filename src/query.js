export const basicGithubQuery = {
  query: `
        {
          viewer {
            name
            repositories(first:10) {
              nodes {
                name
                description
                id
                url
              }
            }
          }
        }
      `,
};

export const searchGithubQuery = {
  query: `
        {
          viewer {
            name
          }
          search(query: "user:robert-laws sort:updated-desc", type: REPOSITORY, first: 10) {
            nodes {
              ... on Repository {
                id
                name
                description
                url
                viewerSubscription
              }
            }
          }
        }
      `,
};

export const licenseGithubQuery = {
  query: `
        {
          viewer {
            name
          }
          search(query: "user:robert-laws sort:updated-desc", type: REPOSITORY, first: 10) {
            nodes {
              ... on Repository {
                id
                name
                description
                url
                viewerSubscription
                licenseInfo {
                  spdxId
                }
              }
            }
          }
        }
      `,
};
