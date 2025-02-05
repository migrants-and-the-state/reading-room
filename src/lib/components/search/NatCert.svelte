<script>
	import { base } from '$app/paths';
	import { handleSubmit } from '$lib/search';
	import { fields } from '$lib/fields';

	import ButtonControls from './forms/ButtonControls.svelte';
	import { Policy as NatCertIcon } from 'carbon-icons-svelte';

	import {
		Form,
		FormGroup,
		MultiSelect,
		TextInput,
		NumberInput,
		RadioButton,
		RadioButtonGroup,
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
		<NatCertIcon class="inline" size="20" />
		<span class="font-bold">Naturalization Certificates</span> are Fusce non accumsan diam. Quisque ex
		felis, semper nec lorem vitae, gravida efficitur ligula.
	</p>
	<p class="py-2">Read more in the <Link href="{base}/data-guide">Data Guide</Link>.</p>
</div>

<Form scope="natcert" on:submit={handleSubmit}>
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
					items={fields['natcert'].filter((field) => field.search)}
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
		<RadioButtonGroup
			legendText="Marital status (LLM)"
			name="limit_fields.certificate_naturalization.marital_status.marital_status_llm_v1"
			selected="any"
		>
			<RadioButton labelText="Any" value="any" />
			<RadioButton labelText="Single" value="single" />
			<RadioButton labelText="Married" value="married" />
			<RadioButton labelText="Divorced" value="divorced" />
			<RadioButton labelText="Widowed" value="widowed" />
		</RadioButtonGroup>
	</FormGroup>

	<FormGroup disabled legendText="Year of Naturalization (LLM)">
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
