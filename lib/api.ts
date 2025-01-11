const POST_GRAPHQL_FIELDS = `
  slug
  title
  coverImage {
    url
    return menuItems;
  }
  date
  author {
    name
    picture {
      url
    }
  }
  excerpt
  content {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
`;
const AUTHOR_GRAPHQL_FIELDS = `  
    name,
    picture {
      title
      description
      contentType
      fileName
      size
      url
      width
      height
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

function extractPost(fetchResponse: any): any {
  return fetchResponse?.data?.postCollection?.items?.[0];
}

function extractPostEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.postCollection?.items;
}
function extractAuthorEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.authorCollection?.items;
}
export async function getPreviewPostBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true,
  );
  return extractPost(entry);
}

export async function getPostBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true,
  );
  return extractPost(entry);
}

export async function getAllPosts(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC, preview: ${
        isDraftMode ? 'true' : 'false'
      }) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode,
  );
  return extractPostEntries(entries);
}

export async function getPostAndMorePosts(
  slug: string,
  preview: boolean,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
      preview ? 'true' : 'false'
    }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  };
}

export async function getAllAuthors(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      authorCollection(preview: ${isDraftMode ? 'true' : 'false'}) {
        items {
          ${AUTHOR_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode,
  );
  return extractAuthorEntries(entries);
}

// export async function getHeaderMenus(isDraftMode: boolean): Promise<any[]> {
//   return fetchGraphQL(
// `query {
//   menuItemsCollection(order:menuOrder_ASC, preview: ${
//     isDraftMode ? 'true' : 'false'
//   }) {
//     items {
//       menuTitle,
//       menuKey,
//       menuLink,
//       parentMenuKey
//     }
//   }
// }`,
//     isDraftMode,
//   ).then((response) => response.data.menuItemsCollection.items);
// }

//function menuGroup
export async function getAllMenuGroups(isDraftMode: boolean): Promise<any[]> {
  return fetchGraphQL(
    `query {
      menuGroupCollection(preview: ${isDraftMode ? 'true' : 'false'}) {
        items {
          _id,
          groupName          
        }
      }
    }`,
    isDraftMode,
  ).then((response) => response.data.menuGroupCollection.items);
}

//getMenuItem by entry id
export async function getMenuItemByEntryId(
  entryId: string,
  isDraftMode: boolean,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      menuItemsCollection(where: { sys: { id: "${entryId}" }}, preview: ${
      isDraftMode ? 'true' : 'false'
    }) {
        items {
          sys{
          id
          },
          menuTitle,
          menuKey,
          menuLink,
          submenus:referenceMenusCollection{
          	items{
            sys{
            id
            },
              menuTitle,
              menuLink
            }
        }
        }
      }
    }`,
    isDraftMode,
  );
  return entry?.data?.menuItemsCollection?.items?.[0];
}

export async function getMenuItems(
  entryId: string,
  isDraftMode: boolean,
): Promise<any[]> {
  const entry = await fetchGraphQL(
    `query{
      menuItemsCollection(where: { sys: { id: "${entryId}" }}, preview: false
      ) {
        items {
          menuTitle,
          menuKey,
          menuLink,
         
        }
      }
    }`,
    isDraftMode,
  );
  // menuitems:referenceMenusCollection(limit:8){
  //   items{
  //     sys{
  //       id,
  //     },
  //     menuTitle,
  //     menuLink
  //   }
  // }
  return entry?.data?.menuItemsCollection?.items?.[0];
}

//function get Header menu
export async function getHeaderMenus(): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      menuGroupCollection(where:{ groupName:"Header Menu"},preview: false) {
        items {
          groupName,
          groupLink:groupLinkCollection{
            items{
              sys{
                id,
              },
              menuTitle,
              menuLink
            }
          }
        }
      }
    }`,
    true,
  );
  const data = entry?.data?.menuGroupCollection?.items?.[0];
  if (data && data.groupLink && data.groupLink.items) {
    return data.groupLink.items;
  }
  return [];
}

// getPageBySlug
export async function getPageBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      pagesCollection(where: { slug: "${slug}", isActive:true}, preview: false, limit: 1) {
        items {
          title,
          slug,
          content {
            json
          },
          coverImage {
            url
          },
          colorPalette,
          references:referencesCollection{
            items{
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
  return entry?.data?.pagesCollection?.items?.[0];
}
//getPageby entry id
export async function getPageByEntryId(entryId: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      pagesCollection(where: { sys: { id: "${entryId}" }}, preview: false, limit: 1) {
        items {
          title,
          excerpt,
          slug,
          content {
            json
          },
          coverImage {
            url
          },
          colorPalette,
          references:referencesCollection{
            items{
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
  return entry?.data?.pagesCollection?.items?.[0];
}

// get slide by slug hoemslide
export async function getHomeSlideBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      slideCollection(where: { slug: "${slug}"}, preview: false, limit: 1) {
        items {
          slug,
          name,
          title
        }
      }
    }`,
    true,
  );
  return entry?.data?.slideCollection?.items?.[0];
}

//get homeslide by entry id 5LgCnhOe6ljwAFsTriocHg
export async function getHomeSlideByEntryId(
  entryId: string | null,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      slideCollection(where: { sys: { id: "${entryId}" }}, preview: false, limit: 1) {
        items {
          slug,
          name,
          title,
          content{
            json
          },
          bannerItems:bannerItemsCollection {
                  				total,
                          items {
                                sys{ 
                                  id,
                                },
                                internalName,
                                headline,
                                body{
                                  json
                                },
                                  image{
                                    url
                                  },
                                  link
                          }
                } ,       
        }
      }
    }`,
    true,
  );
  return entry?.data?.slideCollection?.items?.[0];
}

//get all banner items
export async function getBannerItemById(
  isDraftMode: boolean,
  entryId: any,
): Promise<any[]> {
  return fetchGraphQL(
    `query {
        componentHeroBannerCollection(where: { sys: { id: "${entryId}" }}, preview: ${
      isDraftMode ? 'true' : 'false'
    }) {
        items {
        internalName,
        headline,
        body{
          json
        },
          image{
            url
          },
          colorPalette
        }
      }
    }`,
    isDraftMode,
  ).then((response) => response.data.componentHeroBannerCollection.items);
}

export async function getAllBannerItems(isDraftMode: boolean): Promise<any[]> {
  return fetchGraphQL(
    `query {
        componentHeroBannerCollection(preview: ${
          isDraftMode ? 'true' : 'false'
        }) {
        items {
        internalName,
        headline,
        body{
          json
        },
          image{
            url
          },
          colorPalette,
          link
        }
      }
    }`,
    isDraftMode,
  ).then((response) => response.data.componentHeroBannerCollection.items);
}

//get blockGroup by entry id
export async function getTextBlockGroupByEntryId(
  entryId: string | null,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      blockGroupCollection(where: { sys: { id: "${entryId}" }}, preview: false, limit: 1) {
        items {
           groupName,
          headline,
          body{
            json
          },
          textBlockList:textBlockComponentCollection{
             items{
                sys{
                  id
                },
                headline,
              	subline,
                body{
                  json
                },
                colorPalette,
                linkText,
                link,
                image{
                  url
                }
              }
          }
        }
      }
    }`,
    true,
  );
  return entry?.data?.blockGroupCollection?.items?.[0];
}

//get all componentTextBlocks
export async function getAllComponentTextBlocks(
  isDraftMode: boolean,
): Promise<any[]> {
  return fetchGraphQL(
    `query {
      componentTextBlockCollection(preview: ${isDraftMode ? 'true' : 'false'}) {
        items {
        internalName,
        headline,
        subline,
        body{
          json
        },
          colorPalette,
          link
        }
      }
    }`,
    isDraftMode,
  ).then((response) => response.data.componentTextBlockCollection.items);
}
//get one componentTextBlocks by entry id
export async function getComponentTextBlockByEntryId(
  entryId: string | null,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      componentTextBlockCollection(where: { sys: { id: "${entryId}" }}, preview: false, limit: 1) {
        items {
        internalName,
        headline,
        subline,
        body{
          json
        },
          colorPalette,
          link
        }
      }
    }`,
    true,
  );
  return entry?.data?.componentTextBlockCollection?.items?.[0];
}

//get componentInfoBlock by entry id
export async function getComponentInfoBlockByEntryId(
  entryId: string | null,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      componentInfoBlockCollection(where: { sys: { id: "${entryId}" }}, preview: false, limit: 1) {
        items {
          internalName,
          headline,
          subline,
          block1Image{
            url
          },
          block1Title,
          block1Link,
          block1Body{
            json
          },
          block2Image{
            url
          },
          block2Title,
          block2Link,
          block2Body{
            json
          },
          block3Image{
            url
          },
          block3Title,
          block3Link,
          block3Body{
            json
          },
          block4Image{
            url
          },
          block4Title,
          block4Link,
          block4Body{
            json
          },
          body{
            json
          },
          colorPalette,
          referenceVideoLink
        }
      }
    }`,
    true,
  );
  return entry?.data?.componentInfoBlockCollection?.items?.[0];
}

//get all Pages
export async function getAllPages(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      pagesCollection(where: { slug_exists: true}, preview: ${
        isDraftMode ? 'true' : 'false'
      }) {
        items {
          title,
          slug,
          content {
            json
          },
          coverImage {
            url
          }
        }
      }
    }`,
    isDraftMode,
  );
  return entries?.data?.pagesCollection?.items;
}

//get all Events items where status is true
export async function getAllEventsItems(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      newsCollection(where: { type: false},preview: ${
        isDraftMode ? 'true' : 'false'
      }) {
        items {
          headline,
          subline{
            json
          },
          slug,
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
          updatedDate
        }
      }
    }`,
    isDraftMode,
  );
  return entries?.data?.newsCollection?.items;
}
export async function getAllNewsItems(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      newsCollection(where: { type: true},preview: ${
        isDraftMode ? 'true' : 'false'
      }) {
        items {
          headline,
          subline{
            json
          },
          slug,
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
          updatedDate
        }
      }
    }`,
    isDraftMode,
  );
  return entries?.data?.newsCollection?.items;
}
//get one news item by slug
export async function getNewsEventItemBySlug(
  slug: string | null,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      newsCollection(where: { slug: "${slug}"}, preview: false, limit: 1) {
        items {
          headline,
          subline{
            json
          },
          slug,
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
          updatedDate
        }
      }
    }`,
    true,
  );
  return entry?.data?.newsCollection?.items?.[0];
}

//get all customerStory items ： headline, subline, conent, coverImage
export async function getAllCustomerStories(
  isDraftMode: boolean,
): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      customerStoryCollection(preview: ${isDraftMode ? 'true' : 'false'}) {
        items {
          headline,
          subline,
          content {
            json
          },
          coverImage {
            url
          }
        }
      }
    }`,
    isDraftMode,
  );
  return entries?.data?.customerStoryCollection?.items;
}

//get all products topicProduct
export async function getAllTopicProducts(
  isDraftMode: boolean,
): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      topicProductCollection(preview: false) {
        items {
          _id,
          slug,
          internalName,
          name,
          description{
            json
          },
          featuredImage{
            url
          },
          price,
          features:featuresCollection{
            items{
              internalName,
              name,
              shortDescription{
                json
              }
            }
          }
        }
      }
    }`,
    isDraftMode,
  );
  return entries?.data?.topicProductCollection?.items;
}

export async function getAllTopicProductsByCategorySlug(
  slug: string | null,
  isDraftMode: boolean,
): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      topicProductCollection(where: {category:{slug:"${slug}"}}, preview: false) {
        items {
          _id,
          slug,
          internalName,
          name,
          description{
            json
          },
          featuredImage{
            url
          },
          price,
          features:featuresCollection{
            items{
              internalName,
              name,
              shortDescription{
                json
              }
            }
          }
        }
      }
    }`,
    isDraftMode,
  );
  return entries?.data?.topicProductCollection?.items;
}

//get one product by slug topicProduct
export async function getTopicProductBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      topicProductCollection(where: { slug: "${slug}"}, preview: false, limit: 1) {
        items {
          _id,
          slug,
          internalName,
          name,
          description{
            json
          },
          keyFeatures{
          json
          },
          diseaseRelevance{
          json
          },
          technicalSpecs{
          json
          },
          orderingInformation{
          json
          },
          featuredImage{
            url
          },
          price,
          features:featuresCollection{
            items{
              internalName,
              name,
              shortDescription{
                json
              }
            }
          }
        }
      }
    }`,
    true,
  );
  return entry?.data?.topicProductCollection?.items?.[0];
}

//get one product by slug topicProduct
export async function getTopicProductById(
  entryId: string | null,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      topicProductCollection(where: { sys: { id: "${entryId}" }}, preview: false, limit: 1) {
        items {
          _id,
          slug,
          internalName,
          name,
          description{
            json
          },
          keyFeatures{
          json
          },
          diseaseRelevance{
          json
          },
          technicalSpecs{
          json
          },
          orderingInformation{
          json
          },
          featuredImage{
            url
          },
          price,
          features:featuresCollection{
            items{
              internalName,
              name,
              shortDescription{
                json
              }
            }
          }
        }
      }
    }`,
    true,
  );
  return entry?.data?.topicProductCollection?.items?.[0];
}

//get componentProductTable by entry id
export async function getComponentProductTableByEntryId(
  entryId: string | null,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      componentProductTableCollection(where: { sys: { id: "${entryId}" }}, preview: false, limit: 1) {
        items {
          internalName,
          headline,
          subline,
          products:productsCollection{
            items{
              slug,
              name,
              description{
                json
              },
              featuredImage{
                url
              }
            }
          }
        }
      }
    }`,
    true,
  );
  return entry?.data?.componentProductTableCollection?.items?.[0];
}

//get product category, products
export async function getProductsCategoryList(): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      productCategoryCollection(where: {}, preview: false) {
        items {
          title,
          slug,
          subCategory:subCategoryCollection(limit:5){
            items{
              sys{
                id
              },
              title,
              slug
            }
          },
        }
      }
    }`,
    true,
  );
  // products:productsCollection(limit:8){
  //   items{
  //     sys{
  //       id
  //     },
  //     slug,
  //     internalName,
  //     name,
  //     featuredImage{
  //       url
  //     }
  //   }
  // }

  return entry?.data?.productCategoryCollection?.items;
}

export async function getProductsCategory(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      productCategoryCollection(where: { slug: "${slug}"}, preview: false) {
        items {
          title,
          slug
        }
      }
    }`,
    true,
  );

  return entry?.data?.productCategoryCollection?.items?.[0];
}

//get all products topicProduct
export async function getProductsCategorySlug(
  isDraftMode: boolean,
): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      productCategoryCollection(preview: false) {
        items {
          slug
        }
      }
    }`,
    isDraftMode,
  );
  return entries?.data?.productCategoryCollection?.items;
}
