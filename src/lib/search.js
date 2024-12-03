const FlexSearch = require("flexsearch");

const index = FlexSearch.Index({});

export function addDocument(id, content) {
  index.add(id, content);
}

export function search(query) {
  return index.search(query);
}