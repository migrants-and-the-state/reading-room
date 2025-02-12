<script>
	import { base } from '$app/paths';
	import { handleSubmit } from '$lib/search';
	import { fields } from '$lib/fields';

	import ButtonControls from './forms/ButtonControls.svelte';
	import { FolderShared as AFileIcon } from 'carbon-icons-svelte';
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

	const countryCodeTableURL =
		'https://docs.google.com/spreadsheets/d/1LfmR0QLmalz_6rJT_37QjRyFggsCXXOl5e24nOuw6XI/';
	const portCodeTableURL =
		'https://docs.google.com/spreadsheets/d/1Zhs2RUElDE96EJmXGOCogfUdukj6mpbhWwsd6e2Sb34/edit?gid=1972875230#gid=1972875230';

	$: isSearchInvalid = selectedFields.length === 0 && query.length > 0;
	$: cobSelected = selectedFields.includes('fields.cob.nara');
	$: poeSelected = selectedFields.includes('fields.poe.nara');
</script>

<div class="max-w-[75ch] py-4">
	<p class="py-2">
		<AFileIcon class="inline" size="20" /> <span class="font-bold">A-Files</span> are individual immigration
		records, each identified by a unique registration number (A-Number). They contain all the documentation
		of a person's interactions with immigration bureaucracies.
	</p>
	<p class="py-2">Read more in the <Link href="{base}/data-guide">Data Guide</Link>.</p>
</div>

<Form scope="afile" on:submit={handleSubmit}>
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
					items={fields['afile'].filter((field) => field.search)}
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
				<div class="opacity-7 my-2 ml-4 text-xs">
					{#if cobSelected}
						* Please use the country code (see: <a target="_blank" href={countryCodeTableURL}
							>reference table</a
						>) to search Country of Birth (NARA).<br />
					{/if}
					{#if poeSelected}
						* Please use the port code (see: <a target="_blank" href={portCodeTableURL}
							>reference table</a
						>) to search Port of Entry (NARA).
					{/if}
				</div>
			</div>
		</div>
	</FormGroup>

	<div class="py-4 font-bold">Advanced Filters</div>

	<FormGroup>
		<RadioButtonGroup legendText="Sex (NARA)" name="limit_fields.sex.nara" selected="any">
			<div class="flex flex-row flex-wrap justify-start gap-2">
				<RadioButton labelText="Any" value="any" />
				<RadioButton labelText="F" value="F" />
				<RadioButton labelText="M" value="M" />
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

	<FormGroup disabled legendText="Page Count">
		<div class="flex justify-start py-2">
			<div class="basis-1/2">
				<NumberInput
					allowEmpty
					name="range_min.page_count"
					inline
					helperText="Minimum"
					min="1"
					max="1000"
					invalidText="Number must be between 0 and 1000."
				/>
			</div>
			<div class="basis-1/2">
				<NumberInput
					inline
					allowEmpty
					name="range_max.page_count"
					helperText="Maximum"
					min="0"
					max="2000"
					invalidText="Number must be between 0 and 1000."
				/>
			</div>
		</div>
	</FormGroup>

	<FormGroup disabled legendText="Date of Entry (NARA)">
		<div class="flex justify-start py-2">
			<div class="basis-1/2">
				<NumberInput
					inline
					allowEmpty
					helperText="Start Year"
					min={yearMin}
					max={yearMax}
					invalidText="Number must be between {yearMin} and {yearMax}."
				/>
			</div>
			<div disabled class="basis-1/2">
				<NumberInput
					inline
					allowEmpty
					helperText="End Year"
					min={yearMin}
					max={yearMax}
					invalidText="Number must be between {yearMin} and {yearMax}."
				/>
			</div>
		</div>
	</FormGroup>

	<FormGroup disabled legendText="Date of Birth (NARA)">
		<div class="flex justify-start py-2">
			<div class="basis-1/2">
				<NumberInput
					inline
					allowEmpty
					helperText="Start Year"
					min={yearMin}
					max={yearMax}
					invalidText="Number must be between {yearMin} and {yearMax}."
				/>
			</div>
			<div class="basis-1/2">
				<NumberInput
					inline
					allowEmpty
					helperText="End Year"
					min={yearMin}
					max={yearMax}
					invalidText="Number must be between {yearMin} and {yearMax}."
				/>
			</div>
		</div>
	</FormGroup>
	<ButtonControls bind:isSearchInvalid />
</Form>
