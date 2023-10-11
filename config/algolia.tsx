import algoliasearch from "algoliasearch/lite";

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID as string;
const searchKey = process.env.NEXT_PUBLIC_APP_ALGOLIA_SEARCH_KEY as string;

const searchClient = algoliasearch(appId, searchKey);

const AttributeToRetrieve = {
  ProductCard: ["name", "image", "id", "default_code", "qty_available"],
};
export { searchClient, AttributeToRetrieve };
