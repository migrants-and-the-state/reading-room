export const pageFields = [
	{
		text: 'Page ID',
		id: 'id',
		search: false,
		view: false
	},
	{
		text: 'A-Number',
		id: 'anumber',
		search: true,
		view: false
	},
	{
		text: 'Full text (OCR)',
		id: 'full_text',
		search: true,
		view: false
	},
	{
		text: 'Sex (LLM)',
		id: 'fields.sex.ms_sex_llm_v1',
		view: true,
		search: false
	},
	{
		text: 'Document type (LLM)',
		id: 'fields.doctype.ms_doctype_v1',
		search: false,
		view: true
	},
	{
		text: 'Form title (LLM)',
		id: 'fields.form_title.ms_form_title_llm_v1',
		search: true,
		view: true
	},
	{
		text: 'Countries (NLP)',
		id: 'fields.countries.ms_countries_nlp_v1',
		search: true,
		view: true
	},
	{
		text: 'Years (NLP)',
		id: 'fields.years.ms_years_nlp_v1',
		search: false,
		view: true
	}
];
