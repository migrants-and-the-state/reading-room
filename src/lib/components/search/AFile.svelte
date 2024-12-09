<script>
	import { onMount } from 'svelte';
	import { addDocument, search } from '$lib/search';
	import { base } from '$app/paths';

	import { FolderShared as AFileIcon } from 'carbon-icons-svelte';
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
		<AFileIcon class="inline" size="20" /> <span class="font-bold"> A-Files</span> are Fusce non accumsan
		diam. Quisque ex felis, semper nec lorem vitae, gravida efficitur ligula.
	</p>
	<p class="py-2">Read more in the <Link href="{base}/data-guide">Data Guide</Link>.</p>
</div>
<Form
	on:submit={(e) => {
		e.preventDefault();
		handleSearch();
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
						{ id: 'A-Number', text: 'A-Number (NARA)' },
						{ id: 'CoB', text: 'Country of birth (NARA)' },
						{ id: 'Last Name', text: 'Last name (NARA)' },
						{ id: 'First Name', text: 'First name (NARA)' },
						{ id: 'PoE', text: 'Port of entry (NARA)' },
						{ id: 'Doc Types', text: 'Document Types (CNN)' },
						{ id: 'Form Titles', text: 'Form Titles (LLM)' }
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

	<FormGroup legendText="Page Count">
		<div class="flex justify-start py-2">
			<div class="basis-1/2">
				<NumberInput
					inline
					helperText="Minimum"
					value="0"
					min="0"
					max="1000"
					invalidText="Number must be between 0 and 1000."
				/>
			</div>
			<div class="basis-1/2">
				<NumberInput
					inline
					helperText="Maximum"
					value="1000"
					min="0"
					max="1000"
					invalidText="Number must be between 0 and 1000."
				/>
			</div>
		</div>
	</FormGroup>

	<FormGroup legendText="Date of Entry (NARA)">
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

	<FormGroup legendText="Date of Birth (NARA)">
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
		<RadioButtonGroup legendText="Sex (NARA)" name="sex" selected="any">
			<RadioButton labelText="Any" value="any" />
			<RadioButton labelText="Unset" value="unset" />
			<RadioButton labelText="F" value="F" />
			<RadioButton labelText="M" value="M" />
		</RadioButtonGroup>
	</FormGroup>
	<ButtonSet>
		<Button kind="secondary">Reset</Button>
		<Button on:click={handleSearch}>Submit</Button>
	</ButtonSet>
</Form>
