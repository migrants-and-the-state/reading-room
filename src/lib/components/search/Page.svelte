<script>
	import { base } from '$app/paths';
	import { handleSubmit } from '$lib/search';
	import { fields } from '$lib/fields';

	import ButtonControls from './forms/ButtonControls.svelte';
	import { Document as PageIcon } from 'carbon-icons-svelte';
	import {
		Form,
		FormGroup,
		NumberInput,
		RadioButtonGroup,
		RadioButton,
		MultiSelect,
		TextInput,
		Link
	} from 'carbon-components-svelte';

	let query = '';
	let selectedFields = [];
	let yearMin = 1800;
	let yearMax = 1980;

	$: isSearchInvalid = selectedFields.length === 0 && query.length > 0;
</script>

<div class="max-w-[75ch] py-4">
	<p class="py-2">
		<PageIcon class="inline" size="20" /> <span class="font-bold">Pages</span> within an A-File may comprise
		documents like official forms, photographs, correspondence, affidavits, identity documents, vital
		records, interview transcripts, medical and employment records, and interagency communications.
	</p>
	<p class="py-2">Read more in the <Link href="{base}/data-guide">Data Guide</Link>.</p>
</div>
<Form scope="page" on:submit={handleSubmit}>
	<div class="py-4 font-bold">Search Within</div>
	<FormGroup legendText="Fields">
		<div class="flex flex-row flex-wrap justify-start">
			<div class="basis-full md:basis-1/3">
				<MultiSelect
					name="fields"
					label="Select"
					selectionFeedback="fixed"
					itemToInput={(item) => ({ name: 'selectedFields', value: item.id })}
					bind:selectedIds={selectedFields}
					size="lg"
					sortItem={() => {}}
					items={fields['page'].filter((field) => field.search)}
				/>
			</div>
			<div class="basis-full md:basis-2/3">
				<TextInput
					name="query"
					placeholder="Search..."
					invalidText="Select 1+ fields for the search"
					bind:value={query}
					invalid={isSearchInvalid}
				/>
			</div>
		</div>
	</FormGroup>

	<div class="py-4 font-bold">Advanced Filters</div>

	<FormGroup>
		<RadioButtonGroup
			legendText="Document Type (CNN)"
			name="limit_fields.doctype.ms_doctype_v1"
			selected="any"
		>
			<div class="flex flex-row flex-wrap justify-start gap-2">
				<RadioButton labelText="Any" value="any" />
				<RadioButton labelText="Form" value="form" />
				<RadioButton labelText="Letter" value="letter" />
				<RadioButton labelText="Photograph" value="photograph" />
				<RadioButton labelText="Misc" value="misc" />
			</div>
		</RadioButtonGroup>
	</FormGroup>

	<FormGroup>
		<RadioButtonGroup legendText="Sex (LLM)" name="limit_fields.sex.ms_sex_llm_v1" selected="any">
			<div class="flex flex-row flex-wrap justify-start gap-2">
				<RadioButton labelText="Any" value="any" />
				<RadioButton labelText="Female" value="female" />
				<RadioButton labelText="Male" value="male" />
			</div>
		</RadioButtonGroup>
	</FormGroup>

	<FormGroup disabled legendText="Years (NLP)">
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

	<ButtonControls bind:isSearchInvalid />
</Form>
