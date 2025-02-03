<script>
	import { base } from '$app/paths';
	import { handleSubmit } from '$lib/search';

	import ButtonControls from './forms/ButtonControls.svelte';
	import { Identification as G325AIcon } from 'carbon-icons-svelte';

	import { Form, FormGroup, MultiSelect, TextInput, Link } from 'carbon-components-svelte';

	let query = '';
	let results = [];
	let selectedFields = [];

	let yearMin = 1800;
	let yearMax = 1980;

	$: isSearchInvalid = selectedFields.length === 0 && query.length > 0;
</script>

<div class="max-w-prose py-4">
	<p class="py-2">
		<G325AIcon class="inline" size="20" /> <span class="font-bold">G325A Forms</span> are Fusce non accumsan
		diam. Quisque ex felis, semper nec lorem vitae, gravida efficitur ligula.
	</p>
	<p class="py-2">Read more in the <Link href="{base}/data-guide">Data Guide</Link>.</p>
</div>

<Form scope="g325a" on:submit={handleSubmit}>
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
						{ id: 'State City', text: 'State/City (LLM)' },
						{ id: 'Country', text: 'Country (LLM)' },
						{ id: 'Occupation', text: 'Occupation (LLM)' }
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

	<ButtonControls bind:isSearchInvalid />
</Form>
