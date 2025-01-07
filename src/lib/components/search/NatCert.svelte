<script>
	import { base } from '$app/paths';
	import ButtonControls from './forms/ButtonControls.svelte';
	import { Policy as NatCertIcon } from 'carbon-icons-svelte';

	import {
		Form,
		FormGroup,
		MultiSelect,
		TextInput,
		NumberInput,
		Link
	} from 'carbon-components-svelte';

	let query = '';
	let results = [];
	let selectedFields = [];

	let yearMin = 1800;
	let yearMax = 1980;

	$: isSearchInvalid = selectedFields.length === 0 && query.length > 0;
	$: selectedFieldsLabel = selectedFields.length === 0 ? 'Select' : selectedFields.join(', ');
</script>

<div class="max-w-prose py-4">
	<p class="py-2">
		<NatCertIcon class="inline" size="20" />
		<span class="font-bold">Naturalization Certificates</span> are Fusce non accumsan diam. Quisque ex
		felis, semper nec lorem vitae, gravida efficitur ligula.
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
						{ id: 'Complexion', text: 'Complexion (LLM)' },
						{ id: 'Marital Status', text: 'Marital Status (LLM)' },
						{ id: 'Residence', text: 'Residence at Naturalization (LLM)' }
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

	<FormGroup legendText="Date of Naturalization (LLM)">
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
