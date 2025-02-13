export const methods_glossary = [
	{
		id: 'dnn',
		term: 'Deep Neural Network (DNN)',
		description:
			'Analyzes and extracts important details from an image, such as shapes, colors, and patterns. Based on the analysis, the DNN then predicts how to classify the image.',
		models: [
			{
				name: 'DINOv2',
				link: 'https://github.com/facebookresearch/dinov2'
			}
		]
	},
	{
		id: 'llm',
		term: 'Large Language Model (LLM)',
		description:
			'A type of artificial intelligence trained on vast amounts of images and text to understand and generate human-like language while also interpreting visual information.  They can analyze and describe images, answer questions about visual content, and generate text based on both visual and textual inputs. This allows them to perform tasks like image captioning, visual question answering, and multimodal reasoning.',
		models: [
			{
				name: 'MiniCPM-V-2_6',
				link: 'https://huggingface.co/openbmb/MiniCPM-V-2_6'
			},
			{
				name: 'Qwen2-VL-2B-Instruct',
				link: 'https://huggingface.co/Qwen/Qwen2-VL-2B-Instruct'
			}
		]
	},
	{
		id: 'ml',
		term: 'Machine Learning (ML)',
		description:
			'A type of artificial intelligence where computers learn patterns from data instead of being explicitly programmed.'
	},
	{
		id: 'ner',
		term: 'Named Entity Recognition (NER)',
		description:
			'An NLP technique that identifies different types of entities such as locations, names, dates, and times by analyzing the surrounding context and linguistic patterns rather than relying solely on predefined rules like capitalization or keyword proximity.',
		models: [
			{
				name: 'English NER in Flair',
				link: 'https://huggingface.co/flair/ner-english-ontonotes-large'
			}
		]
	},
	{
		id: 'nlp',
		term: 'Natural Language Processing (NLP)',
		description:
			'A set of artificial intelligence techniques that enable computers to identify, understand, interpret, and generate human language.'
	},
	{
		id: 'ocr',
		term: 'Optical Character Recognition (OCR)',
		description:
			'A technology that detects and extracts text from images or scanned documents, converting it into machine-readable text.',
		models: [
			{
				name: 'Amazon Textract',
				link: 'https://aws.amazon.com/textract/'
			}
		]
	},
	{
		id: 'text',
		term: 'Text Model',
		description:
			'An artificial intelligence system designed to process, generate, or analyze human language using machine learning techniques. In this case,  a sentence transformer that converts sentences into numerical embeddings, enabling tasks like semantic search, similarity comparison, and clustering.',
		models: [
			{
				name: 'all-mpnet-base-v2',
				link: 'https://huggingface.co/sentence-transformers/all-mpnet-base-v2'
			}
		]
	}
];

export const ms_provenance_tags = {
	ms_sex_llm_v1:
		'An LLM extracts sex information found on individual pages. Those values are also aggregated to predict the sex of the A-File holder',
	ms_form_titles_llm_v1:
		'Identified by the LLM, this is a full list of every form number and corresponding title within the entire A-File',
	ms_countries_nlp_v1:
		'Collated list of all countries identifed on the page by the NLP model harnessing NER. These lists are also aggregated at the A-File level',
	ms_ocr_v1: 'All key word searchable text extracted from the page through OCR',
	ms_form_title_llm_v1: 'Form numbers and corresponding titles identified by the LLM',
	ms_years_nlp_v1:
		'Identified with a BiLSTM, a type of NLP model harnessing NER, this model compiles every year that appears on a page',
	ms_doctype_v1:
		'A DNN processes each scanned document and categorizes it into one of four types: Form, Letter, Photograph, or Misc',
	nationality_llm_v1:
		'Nationality data of A-File holder, as identified and extracted by the LLM from form G325',
	reason_llm_v1:
		'Reason supplied by A-File holder for submitting form G325, as identified and extracted by LLM from form G325',
	occupation_llm_v1:
		'Occupation data of A-File holder, as identified and extracted by the LLM from form G325',
	complexion_llm_v1:
		'Biometric data required by some Certificates of Naturalization as identified and extracted by LLM',
	marital_status_llm_v1:
		'Marital status listed on Certificates of Naturalization, as identified and extracted by LLM',
	residence_naturlization_llm_v1:
		'Place of residence for certificate holder at the time of naturalization, as identified and extracted from Certificate of Naturalization by LLM',
	year_naturalization_llm_v1:
		'Year of naturalization for certificate holder as listed on Certificates of Naturalization, as identified and extracted by LLM'
};
