<script>
	import { onMount } from 'svelte';
	import { addDocument, search } from '$lib/search';
	import { base } from '$app/paths';

	import { Document as PageIcon } from 'carbon-icons-svelte';
	import {
		Form,
		FormGroup,
		NumberInput,
		RadioButtonGroup,
		RadioButton,
		MultiSelect,
		TextInput,
		Button,
		ButtonSet,
		Link
	} from 'carbon-components-svelte';

	let query = '';
	let results = [];
	let selectedFields = [];
	let yearMin = 1800;
	let yearMax = 1980;

	// Sample documents
	const documents = [
		{ id: 1, content: 'First document content' },
		{ id: 2, content: 'Second document content' }
	];

	onMount(() => {
		documents.forEach((doc) => addDocument(doc.id, doc.content));
	});

	function handleSearch() {
		results = search(query, { suggest: true });
	}

	$: console.log('query length', query.length);
	$: isSearchInvalid = selectedFields.length === 0 && query.length > 0;
	$: selectedFieldsLabel = selectedFields.length === 0 ? 'Select' : selectedFields.join(', ');
</script>

<div class="max-w-prose py-4">
	<p class="py-2">
		<PageIcon class="inline" size="20" /> <span class="font-bold">Pages</span> are Fusce non accumsan
		diam. Quisque ex felis, semper nec lorem vitae, gravida efficitur ligula.
	</p>
	<p class="py-2">Read more in the <Link href="{base}/data-guide">Data Guide</Link>.</p>
</div>
<Form
	on:submit={(e) => {
		e.preventDefault();
	}}
>
	<div class="py-4 font-bold">Search Within</div>
	<FormGroup legendText="Fields">
		<div class="flex flex-row justify-start">
			<div class="basis-1/3">
				<MultiSelect
					label={selectedFieldsLabel}
					selectionFeedback="fixed"
					bind:selectedIds={selectedFields}
					size="lg"
					useTitleInItem="true"
					sortItem={() => {}}
					items={[
						{ id: 'Page Text', text: 'Page Text (OCR)' },
						{ id: 'Countries', text: 'Countries (NLP)' },
						{ id: 'Form Title', text: 'Form Title (LLM)' },
						{ id: 'Years', text: 'Years (NLP)' }
					]}
				/>
			</div>
			<div class="basis-2/3">
				<TextInput
					placeholder="Search..."
					invalidText="Select 1+ fields for the search"
					bind:value={query}
					invalid={isSearchInvalid}
				/>
			</div>
		</div>
	</FormGroup>

	<div class="py-4 font-bold">Advanced Filters</div>

	<FormGroup legendText="Date of Birth (LLM)">
		<div class="flex justify-start py-2">
			<div class="basis-1/2">
				<NumberInput
					inline
					helperText="Start Year"
					value={yearMin}
					min={yearMin}
					max={yearMax}
					invalidText="Number must be between {yearMin} and {yearMax}."
				/>
			</div>
			<div class="basis-1/2">
				<NumberInput
					inline
					helperText="End Year"
					value={yearMax}
					min={yearMin}
					max={yearMax}
					invalidText="Number must be between {yearMin} and {yearMax}."
				/>
			</div>
		</div>
	</FormGroup>

	<FormGroup>
		<RadioButtonGroup legendText="Document Type (CNN)" name="document type" selected="any">
			<RadioButton labelText="Any" value="any" />
			<RadioButton labelText="Unset" value="unset" />
			<RadioButton labelText="Form" value="form" />
			<RadioButton labelText="Letter" value="letter" />
			<RadioButton labelText="Photograph" value="photograph" />
			<RadioButton labelText="Miscellaneous" value="miscellaneous" />
		</RadioButtonGroup>
	</FormGroup>

	<FormGroup>
		<RadioButtonGroup legendText="Sex (LLM)" name="sex" selected="any">
			<RadioButton labelText="Any" value="any" />
			<RadioButton labelText="Unset" value="unset" />
			<RadioButton labelText="F" value="F" />
			<RadioButton labelText="M" value="M" />
		</RadioButtonGroup>
	</FormGroup>

	<ButtonSet>
		<Button kind="secondary">Reset</Button>
		<Button>Submit</Button>
	</ButtonSet>
</Form>
