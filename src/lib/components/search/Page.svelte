<script>
	import { base } from '$app/paths';
	import { handleSubmit } from '$lib/search';

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

<div class="max-w-prose py-4">
	<p class="py-2">
		<PageIcon class="inline" size="20" /> <span class="font-bold">Pages</span> are Fusce non accumsan
		diam. Quisque ex felis, semper nec lorem vitae, gravida efficitur ligula.
	</p>
	<p class="py-2">Read more in the <Link href="{base}/data-guide">Data Guide</Link>.</p>
</div>
<Form scope="page" on:submit={handleSubmit}>
	<div class="py-4 font-bold">Search Within</div>
	<FormGroup legendText="Fields">
		<div class="flex flex-row justify-start">
			<div class="basis-1/3">
				<MultiSelect
					name="fields"
					label="Select fields"
					selectionFeedback="fixed"
					itemToInput={(item) => ({ name: 'selectedFields', value: item.id })}
					bind:selectedIds={selectedFields}
					size="lg"
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
		<RadioButtonGroup legendText="Document Type (CNN)" name="document type" selected="any">
			<RadioButton labelText="Any" value="any" />
			<RadioButton labelText="Undefined" value="undefined" />
			<RadioButton labelText="Form" value="form" />
			<RadioButton labelText="Letter" value="letter" />
			<RadioButton labelText="Photograph" value="photograph" />
			<RadioButton labelText="Miscellaneous" value="miscellaneous" />
		</RadioButtonGroup>
	</FormGroup>

	<FormGroup>
		<RadioButtonGroup legendText="Sex (LLM)" name="sex" selected="any">
			<RadioButton labelText="Any" value="any" />
			<RadioButton labelText="Undefined" value="undefined" />
			<RadioButton labelText="F" value="F" />
			<RadioButton labelText="M" value="M" />
		</RadioButtonGroup>
	</FormGroup>

	<FormGroup disabled legendText="Date of Birth (LLM)">
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

	<ButtonControls />
</Form>
