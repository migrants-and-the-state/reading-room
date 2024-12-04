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

          <div class="py-4 font-bold">Filter by Date Range</div>
          <FormGroup>     
            <div class="py-2">Date of Entry (NARA)</div>
            <div class="flex justify-start py-2">
              <div class="basis-1/2">
                <NumberInput inline label="Start Year" value={yearMin} min={yearMin} max={yearMax} invalidText="Number must be between {yearMin} and {yearMax}."/>
              </div>
              <div class="basis-1/2">
                <NumberInput inline label="End Year" value={yearMax} min={yearMin} max={yearMax} invalidText="Number must be between {yearMin} and {yearMax}."/>
              </div>
            </div>

            <div class="py-2">Date of Birth (NARA)</div>
            <div class="flex justify-start py-2">
              <div class="basis-1/2">
                <NumberInput inline label="Start Year" value={yearMin} min={yearMin} max={yearMax} invalidText="Number must be between {yearMin} and {yearMax}."/>
              </div>
              <div class="basis-1/2">
                <NumberInput inline label="End Year" value={yearMax} min={yearMin} max={yearMax} invalidText="Number must be between {yearMin} and {yearMax}."/>
              </div>
            </div>
          </FormGroup> 

          <div class="py-4 font-bold">Segment</div>
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
      <form>
        <label>
          <div>
            <span>Search within a field</span>
          </div>
          <div>
            <select size="1" aria-label="select field to search within" id="search-limit-select">
              <option>All</option>
              <option>OCR Text</option>
              <option>Countries (NLP)</option>
              <option>Form Title (LLM)</option>
            </select>
            <input size="1" id="search-input" bind:value={query} on:input={handleSearch} placeholder="Search"/>
            <button size="1" aria-label="submit search query" id="search-submit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" /></svg>
            </button>
          </div>
        </label>
      </form>
  
      <form>
        <label>
          <div>
            <span>Search for Date of Birth (LLM) within a range</span>
          </div>
          <div>
            <input size="1" id="search-range-start" placeholder="Start"/>
            <input size="1" id="search-range-end" placeholder="End"/>
            <button size="1" aria-label="submit search range" id="search-range-submit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" /></svg>
            </button>
          </div>
        </label>
      </form>
  
      <form>
        <label>
          <div>
            <span>Facet by document type (CNN)</span>
          </div>
          <div>
            <select size="1" aria-label="select document type to facet" id="facet-select">
              <option>Form</option>
              <option>Letter</option>
              <option>Photograph</option>
              <option>Miscellaneous</option>
            </select>
          </div>
        </label>
      </form>
  
      <br>
      <form>
        <label>
          <div>
            <span>Facet by sex (LLM)</span>
          </div>
          <div>
            <select size="1" aria-label="select document type to facet" id="facet-select">
              <option>Female</option>
              <option>Male</option>
            </select>
          </div>
        </label>
      </form>

    </TabContent>
    </Tile>
  </svelte:fragment>
</Tabs>