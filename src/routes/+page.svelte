<script>
  import { onMount } from 'svelte';
  import { addDocument, search } from '$lib/search';
  
  import {
    Form, FormGroup,
    NumberInput,
    Select, SelectItem,
    RadioButtonGroup, RadioButton,
    MultiSelect,
    TextInput,
    Button,
    Tile,
    Tag,
    Tabs, Tab, TabContent
  } from "carbon-components-svelte";


  let query = '';
  let results = [];
  let selectedFields = [];
  let selectedPageFields = [];
  let yearMin = 1800;
  let yearMax = 1980;

  // Sample documents
  const documents = [
    { id: 1, content: 'First document content' },
    { id: 2, content: 'Second document content' },
  ];

  onMount(() => {
    documents.forEach(doc => addDocument(doc.id, doc.content));
  });

  function handleSearch() {
    results = search(query, {suggest: true});
  }
  
  $: console.log('query length', query.length);
  $: isSearchInvalid = selectedFields.length === 0 && query.length > 0;
  $: selectedFieldsLabel = selectedFields.length === 0 ? 'Select' : selectedFields.join(', ');
  $: selectedPageFieldsLabel = selectedPageFields.length === 0 ? 'Select' : selectedPageFields.join(', ');
</script>


<Tabs type="container" class="py-12">
  <Tab label="Find A-Files" />
  <Tab label="Find Pages" />
  <svelte:fragment slot="content">
    <Tile>
      <TabContent>
        <Form on:submit={(e) => {
          e.preventDefault();
          handleSearch();
        }}>
          <div class="py-4 font-bold">Search Within</div>
          <FormGroup legendText="Fields">
            <div class="flex flex-row justify-start">
              <div class="basis-1/3">
                <MultiSelect
                  label={selectedFieldsLabel}
                  selectionFeedback="fixed"
                  bind:selectedIds={selectedFields}
                  size="lg"
                  useTitleInItem=true
                  items={[
                    { id: "A-Number", text: "A-Number (NARA)" },
                    { id: "CoB", text: "Country of birth (NARA)" },
                    { id: "Last Name", text: "Last name (NARA)" },
                    { id: "First Name", text: "First name (NARA)" },
                    { id: "PoE", text: "Port of entry (NARA)"}
                  ]}
                />
              </div>
              <div class="basis-2/3">
                <TextInput placeholder="Search..." invalidText="Select 1+ fields for the search" bind:value={query} invalid={isSearchInvalid}/>
              </div>
            </div>
          </FormGroup>

          <div class="py-4 font-bold">Advanced Filters</div>

          <FormGroup legendText="Page Count">     
            <div class="flex justify-start py-2">
              <div class="basis-1/2">
                <NumberInput inline helperText="Minimum" value=0 min=0 max=1000 invalidText="Number must be between 0 and 1000."/>
              </div>
              <div class="basis-1/2">
                <NumberInput inline helperText="Maximum" value=1000 min=0 max=1000 invalidText="Number must be between 0 and 1000."/>
              </div>
            </div>
          </FormGroup>

          
          <FormGroup legendText="Date of Entry (NARA)">     
            <div class="flex justify-start py-2">
              <div class="basis-1/2">
                <NumberInput inline helperText="Start Year" value={yearMin} min={yearMin} max={yearMax} invalidText="Number must be between {yearMin} and {yearMax}."/>
              </div>
              <div class="basis-1/2">
                <NumberInput inline helperText="End Year" value={yearMax} min={yearMin} max={yearMax} invalidText="Number must be between {yearMin} and {yearMax}."/>
              </div>
            </div>
          </FormGroup>

          <FormGroup legendText="Date of Birth (NARA)">
            <div class="flex justify-start py-2">
              <div class="basis-1/2">
                <NumberInput inline helperText="Start Year" value={yearMin} min={yearMin} max={yearMax} invalidText="Number must be between {yearMin} and {yearMax}."/>
              </div>
              <div class="basis-1/2">
                <NumberInput inline helperText="End Year" value={yearMax} min={yearMin} max={yearMax} invalidText="Number must be between {yearMin} and {yearMax}."/>
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

          <Button on:click={handleSearch}>Submit</Button>
        </Form>

        <div>
          <ul>
            {#each results as result}
              <li>{result}</li>
            {/each}
          </ul>
        </div>
      </TabContent>
    <TabContent>
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
                useTitleInItem=true
                items={[
                  { id: "Page Text", text: "Page Text (OCR)" },
                  { id: "Countries", text: "Countries (NLP)" },
                  { id: "Form Title", text: "Form Title (LLM)" }
                ]}
              />
            </div>
            <div class="basis-2/3">
              <TextInput placeholder="Search..." invalidText="Select 1+ fields for the search" bind:value={query} invalid={isSearchInvalid}/>
            </div>
          </div>
        </FormGroup>

        <FormGroup legendText="Date of Birth (LLM)">
          <div class="flex justify-start py-2">
            <div class="basis-1/2">
              <NumberInput inline helperText="Start Year" value={yearMin} min={yearMin} max={yearMax} invalidText="Number must be between {yearMin} and {yearMax}."/>
            </div>
            <div class="basis-1/2">
              <NumberInput inline helperText="End Year" value={yearMax} min={yearMin} max={yearMax} invalidText="Number must be between {yearMin} and {yearMax}."/>
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

        <Button>Submit</Button>
      </Form>
    </TabContent>
    </Tile>
  </svelte:fragment>
</Tabs>