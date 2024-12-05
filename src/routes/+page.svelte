<script>
	import { onMount } from 'svelte';
	import { addDocument, search } from '$lib/search';

	import {
		Form,
		FormGroup,
		NumberInput,
		Select,
		SelectItem,
		RadioButtonGroup,
		RadioButton,
		MultiSelect,
		TextInput,
		Button,
		ButtonSet,
		Link,
		Tag,
		Tabs,
		Tab,
		TabContent
	} from 'carbon-components-svelte';
	import { 
		FolderShared as AFileIcon,
		Document as PageIcon,
		Identification as G325AIcon,
		Policy as NatCertIcon
	} from "carbon-icons-svelte";

	let query = '';
	let results = [];
	let selectedFields = [];
	let selectedPageFields = [];
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
	$: selectedPageFieldsLabel =
		selectedPageFields.length === 0 ? 'Select' : selectedPageFields.join(', ');
</script>

<Tabs type="container" autoWidth>
	<Tab label="Find A-Files" />
	<Tab label="Find Pages" />
	<Tab label="Find G325A Forms *" />
	<Tab label="Find Naturalization Certificates *" />
	<svelte:fragment slot="content">
		<TabContent class="bg-white">
			<div class="max-w-prose py-4">
				<p class="py-2"><AFileIcon class="inline" size=20/> <span class="font-bold"> A-Files</span> are Fusce non accumsan diam. Quisque ex felis, semper nec lorem vitae, gravida efficitur ligula. </p>
				<p class="py-2">Read more in the <Link href="">Data Guide</Link>.</p>
			</div>
			<Form on:submit={(e) => { e.preventDefault(); handleSearch(); }}>
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
		</TabContent>
			
		<TabContent class="bg-white">
			<div class="max-w-prose py-4">
				<p class="py-2"><PageIcon class="inline" size=20/> <span class="font-bold">Pages</span> are Fusce non accumsan diam. Quisque ex felis, semper nec lorem vitae, gravida efficitur ligula. </p>
				<p class="py-2">Read more in the <Link href="">Data Guide</Link>.</p>
			</div>
			<Form on:submit={(e) => { e.preventDefault(); }}>
				<div class="py-4 font-bold">Search Within</div>
				<FormGroup legendText="Fields">
					<div class="flex flex-row justify-start">
						<div class="basis-1/3">
							<MultiSelect
								label={selectedPageFieldsLabel}
								selectionFeedback="fixed"
								bind:selectedIds={selectedPageFields}
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

				<!-- <FormGroup>
					<RadioButtonGroup legendText="Form Type (Heuristic)" name="form type" selected="any">
						<RadioButton labelText="Any" value="any" />
						<RadioButton labelText="Unset" value="unset" />
						<RadioButton labelText="G325A" value="g325a" />
						<RadioButton labelText="Naturalization Cert" value="cert_naturalization" />
					</RadioButtonGroup>
				</FormGroup> -->

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
		</TabContent>
		<TabContent class="bg-white">
			<div class="max-w-prose py-4">
				<p class="py-2"><G325AIcon class="inline" size=20/> <span class="font-bold">G325A Forms</span> are Fusce non accumsan diam. Quisque ex felis, semper nec lorem vitae, gravida efficitur ligula. </p>
				<p class="py-2">Read more in the <Link href="">Data Guide</Link>.</p>
			</div>
		</TabContent>
		<TabContent class="bg-white">
			<div class="max-w-prose py-4">
				<p class="py-2"><NatCertIcon class="inline" size=20/>  <span class="font-bold">Naturalization Certificates</span> are Fusce non accumsan diam. Quisque ex felis, semper nec lorem vitae, gravida efficitur ligula. </p>
				<p class="py-2">Read more in the <Link href="">Data Guide</Link>.</p>
			</div>
		</TabContent>
	</svelte:fragment>
</Tabs>


<div>
	<ul>
		{#each results as result}
			<li>{result}</li>
		{/each}
	</ul>
</div>