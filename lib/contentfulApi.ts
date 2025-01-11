const GENERICLIST_FIELDS = `  
 __typename,
    sys{
      id
    },
    internalName,
    headline,
    subline,
    layout,
    heroBanner{
      url
    },
    heroBannerTitle,
  genericPagesCollection{
    items{
    sys{
      id
    },
      internalName,
      headline,
      subline,
      linkedFrom{
        pageCollection{
          items{
            slug
          }
        }
      }
    }
  }
`;
const GENERICPAGE_FIELDS = `  
    __typename,
    sys{
      id
    },
    internalName,
    headline,
    subline,
    content{
    json
    },
    heroBanner{
      url
    },
    heroBannerTitle,
    leftSectionsCollection{
 items{
   ... on ComponentInfoBlock{
            __typename,
            sys{
              id
            },
            layout
          }
}
},
    bottomSectionsCollection{
        items{
          ... on Slide{
            __typename,
            sys{
              id
            }
          },
          ... on BlockGroup{
            __typename,
            sys{
              id
            },
            layout
          },
          ... on GenericList{
            __typename,
            sys{
              id
              },
              layout
          },  
          ... on ComponentInfoBlock{
            __typename,
            sys{
              id
            },
            layout
          },
          ... on BlockGroup{
              __typename,
              sys{
                id
              }
            },
        }
  }
`;

const GENERIClISTPAGE_FIELDS =
  `  
__typename,
sys{
  id
},
internalName,
headline,
subline,
heroBanner{
  url
},
heroBannerTitle,
  genericPagesCollection{
    items{
    sys{
      id
    },
      internalName,
      headline,
      subline,
      linkedFrom{
        pageCollection{
          items{
            slug
          }
        }
      }
    }
  },
bottomSectionsCollection{
    items{
      ` +
  { GENERICPAGE_FIELDS } +
  `
    }
}
`;

const SIMPLEPAGELIST_FIELDS = `
 __typename,
    sys{
      id
    },
    internalName,
    headline,
    subline,
    layout,
    heroBanner{
      url
    },
    heroBannerTitle,
    layout,
    simplePagesCollection{
      items{
        headline,
        subline,
        content{
        json
        },
        coverImage{
          url
        }
      }
    }
`;

const SIMPLEPAG_FIELDS = `
 __typename,
    sys{
      id
    },
    internalName,
    headline,
    subline,
    content{
      json
    },
    
    coverImage{
    url
    },
    heroBanner{
      url
    },
    heroBannerTitle
`;

const PRODUCTLIST_FIELDS = `  
    __typename,
    sys{
      id
    },
    internalName,
    headline,
    subline,
    layout,
    heroBanner{
      url
    },
    heroBannerTitle,
    layout,
  	productsCollection{
      items{
        sys{
          id
        },
        slug,
        internalName,
        name,
        description{
          json
        },
        price,          
        featuredImage{
          url
        },
        
      }
  }
`;

const ALLPRODUCTLIST_FIELDS = `  
    __typename,
    sys{
      id
    },
    internalName,
    headline,
    subline,
    layout,
    heroBanner{
      url
    },
    heroBannerTitle,
    layout,
  	productsCollection{
      items{
        sys{
          id
        },
        slug,
        internalName,
        name,
        description{
          json
        },
        price,          
        featuredImage{
          url
        },
        
      }
  }
`;
async function fetchGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ['posts'] },
    },
  ).then((response) => response.json());
}

//getAllBasePages
export async function getAllBasePages(preview = false): Promise<any> {
  const entries = await fetchGraphQL(
    `query {
        pageCollection {
          items {
            slug           
          }
  }
}`,
    preview,
  );
  return entries?.data?.pageCollection?.items;
}

//getBasePageBySlug
export async function getBasePageBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
        pageCollection(where: {slug:"${slug}"}, limit: 1) {
          items {
            internalName,
            slug,
            contentSection{
              	... on GenericPage{
                  __typename,
                  sys{
                    id
                  }
                },
              	... on JobPages{
                  __typename,
                  sys{
                    id
                  }
                },
              	... on GenericList{
                  __typename,
                  sys{
                    id
                  }
                },
              ... on CustomerStory{
                 __typename,
                  sys{
                    id
                  }
              },
              ... on SimplePageList{
                __typename,
                sys{
                  id
                }
              },
              ... on News{
                 __typename,
                  sys{
                    id
                  }
              },
              ... on NewsEventsList{
                  __typename,
                    sys{
                      id
                    }
                },
              ... on ProductCategory{
                 __typename,
                  sys{
                    id
                  }
              },
              ... on ProductList{
                 __typename,
                  sys{
                    id
                  }
              },
              ... on TopicProduct{
                 __typename,
                  sys{
                    id
                  }
              }
            }
          }
  }
}`,
    true,
  );
  return entry?.data?.pageCollection?.items?.[0];
}

//get GenericPageById
export async function getGenericPageById(id: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
        genericPageCollection(where: { sys: { id: "${id}" }},limit: 1) {
          items {
             ${GENERICPAGE_FIELDS}
          }
    }
}`,
    true,
  );
  return entry?.data?.genericPageCollection?.items?.[0];
}

//get GenericListById
export async function getGenericListById(id: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
        genericListCollection(where: { sys: { id: "${id}" }},limit: 1) {
          items {
             ${GENERICLIST_FIELDS}
          }
    }
}`,
    true,
  );
  return entry?.data?.genericListCollection?.items?.[0];
}

//get GenericListPageById
export async function getGenericListPageById(id: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
        genericListCollection(where: { sys: { id: "${id}" }},limit: 1) {
          items {
             ${GENERIClISTPAGE_FIELDS}
          }
    }
}`,
    true,
  );
  return entry?.data?.genericListCollection?.items?.[0];
}

//getSimplePageListById
export async function getSimplePageListById(id: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
        simplePageListCollection(where: { sys: { id: "${id}" }},limit: 1) {
          items {
            ${SIMPLEPAGELIST_FIELDS}
          }
        }
}`,
    true,
  );
  return entry?.data?.simplePageListCollection?.items?.[0];
}

//getSimplePageById
export async function getSimplePageById(id: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
        customerStoryCollection(where: { sys: { id: "${id}" }},limit: 1) {
          items {
            ${SIMPLEPAG_FIELDS}
          }
        }
}`,
    true,
  );
  return entry?.data?.customerStoryCollection?.items?.[0];
}

//getProductListById
export async function getProductListById(id: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
        productListCollection(where: { sys: { id: "${id}" }},limit: 1) {
          items {
            ${PRODUCTLIST_FIELDS}
          }
        }
}`,
    true,
  );
  return entry?.data?.productListCollection?.items?.[0];
}

//getAllProductList
export async function getAllProductList(preview = false): Promise<any> {
  const entries = await fetchGraphQL(
    `query {
        productListCollection(where: {showOnProductPage:true}) {
          items {
            sys{
              id
            },
            headline,
            subline      
          }
  }
}`,
    preview,
  );
  return entries?.data?.productListCollection?.items;
}

//get All news items by id
export async function getNewsListItemsByEntryId(
  id: string | null,
): Promise<any> {
  const entries = await fetchGraphQL(
    `query {
        newsEventsListCollection(where: { sys: { id: "${id}" }}, limit: 1) {
          items {
            internalName, 
            headline,
            subline,
            heroBanner{
              url
            },
            heroBannerTitle,
            newsEventsPagesCollection(order:createdDate_DESC){
              items {
                headline,
                subline{
                  json
                },
                content {
                  json
                },
                bannerImage {
                  url
                },
                bannerBody{
                  json 
                },
                createdDate,
                updatedDate,
                 linkedFrom{
        pageCollection{
          items{
            slug
          }
        }
      }
              }
            }
            }
          }
}`,
  );
  return entries?.data?.newsEventsListCollection?.items?.[0];
}

// get New Detail by Entry Id
export async function getNewsEventItemByEntryId(
  id: string | null,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
        newsCollection(where: { sys: { id: "${id}" }}, limit: 1) {
          items {
                headline,
                subline{
                  json
                },
                content {
                  json
                },
                bannerImage {
                  url
                },
                bannerBody{
                  json 
                },
                createdDate,
                updatedDate,
                 linkedFrom{
        pageCollection{
          items{
            slug
          }
        }
      }
            }
          }
}`,
  );
  return entry?.data?.newsCollection?.items?.[0];
}

export async function getNewsTop5Items(): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      newsCollection(where: { type: true}, limit: 5) {
        items {
          headline,
          subline{
            json
          },
          content {
            json
          },
          bannerImage {
            url
          },
          bannerBody{
            json 
          },
          linkedFrom{
            pageCollection{
              items{
                slug
              }
            }
          }
          createdDate,
          updatedDate
        }
      }
    }`,
  );
  return entries?.data?.newsCollection?.items;
}

//get all job items
export async function getAllJobList(): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      jobPagesCollection {
        items {
          sys{
            id
          },
          internalName,
          headline,
          type,
          pushDate,
          address,
          heroBanner{
            url
          },
          heroBannerTitle,
           linkedFrom{
            pageCollection{
              items{
                slug
              }
            }
          }
        }
      }
    }`,
  );
  return entries?.data?.jobPagesCollection?.items;
}

export async function getJobItemByEntryId(id: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
        jobPagesCollection(where: { sys: { id: "${id}" }}, limit: 1) {
          items {
            sys{
              id
            },
            internalName,
            headline,
            type,
            pushDate,
            address,
            content{
              json
            },
            contactInfo{
              json
            },
            heroBanner{
              url
            },
            heroBannerTitle
          }
        }
      }`,
  );
  return entry?.data?.jobPagesCollection?.items?.[0];
}

// getJobPageBySlug
export async function getJobPageBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
        jobPagesCollection(where: {linkedFrom:"${slug}"}, limit: 1) {
          items {
            sys{
              id
            },
            internalName,
            headline,
            type,
            pushDate,
            address,
            content{
              json
            },
            contactInfo{
              json
            },
            heroBanner{
              url
            },
            heroBannerTitle
          }
        }
      }`,
  );
  return entry?.data?.jobPagesCollection?.items?.[0];
}
