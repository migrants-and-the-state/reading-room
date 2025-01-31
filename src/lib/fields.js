const afileFieldMap = {
  'id': {
    'text': 'A-Number',
    'keypath': 'id',
  },
  'page_count': {
    'text': 'Page Count',
    'keypath': 'page_count',
  },
  'last_name_nara': {
    'text': 'Last Name (NARA)',
    'keypath': 'fields.last_name.nara'
  },
  'first_name_nara': {
    'text': 'First Name (NARA)',
    'keypath': 'fields.first_name.nara'
  },
  'dob_nara': {
    'text': 'Date of Birth (NARA)',
    'keypath': 'fields.dob.nara'
  },
  'doe_nara': {
    'text': 'Date of Entry (NARA)',
    'keypath': 'fields.doe.nara'
  },
  'poe_nara': {
    'text': 'Port of Entry (NARA)',
    'keypath': 'fields.poe.nara'
  },
  'cob_nara': {
    'text': 'Country of Birth (NARA)',
    'keypath': 'fields.cob.nara'
  },
  'sex_nara': {
    'text': 'Sex (NARA)',
    'keypath': 'fields.sex.nara'
  },
  'sex_ms': {
    'text': 'Sex (LLM)',
    'keypath': 'fields.sex.ms_sex_llm_v1'
  },
  'form_titles_llm': {
    'text': 'Form Titles (LLM)',
    'keypath': 'fields.form_titles.ms_form_titles_llm_v1'
  },
  'countries_nlp': {
    'text': 'Countries (LLM)',
    'keypath': 'fields.countries.ms_countries_nlp_v1'
  }
};

const pageFieldMap = {
  'id': {
    'text': 'Page ID',
    'keypath': 'id',
  },
  'anumber': {
    'text': 'A-Number',
    'keypath': 'anumber',
  },
  'full_text': {
    'text': 'Full Text (OCR)',
    'keypath': 'full_text',
  },
  'sex_ms': {
    'text': 'Sex (LLM)',
    'keypath': 'fields.sex.ms_sex_llm_v1'
  },
  'doctype_ms': {
    'text': 'Document Type (LLM)',
    'keypath': 'fields.doctype.ms_doctype_llm_v1'
  },
  'form_title_llm': {
    'text': 'Form Title (LLM)',
    'keypath': 'fields.form_title.ms_form_title_llm_v1'
  },
  'countries_nlp': {
    'text': 'Countries (NLP)',
    'keypath': 'fields.countries.ms_countries_nlp_v1'
  },
  'years_nlp': {
    'text': 'Years (NLP)',
    'keypath': 'fields.years.ms_years_nlp_v1'
  }
};

export const fieldMap = {
  'afile': afileFieldMap,
  'page': pageFieldMap
};



const pageFieldsToSearchWithin = [
  'anumber', 
  'form_title_llm',
  'countries_nlp',
  'years_nlp',
  'full_text'
].map((field) => ( { id: field, text: pageFieldMap[field]['text'], keypath: pageFieldMap[field]['keypath'] }));

const afileFieldsToSearchWithin = [
  'id', 
  'form_titles_llm', 
  'countries_nlp', 
  'last_name_nara', 
  'first_name_nara', 
  'poe_nara', 
  'cob_nara'
].map((field) => ( { id: field, text: afileFieldMap[field]['text'], keypath: afileFieldMap[field]['keypath'] }));

export const fieldsToSearchWithin = {
  'afile': afileFieldsToSearchWithin,
  'page': pageFieldsToSearchWithin
}
