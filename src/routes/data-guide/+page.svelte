<script>
	import { base } from '$app/paths';
	import {
		Breadcrumb,
		BreadcrumbItem,
		Link,
		OutboundLink,
		Tag,
		Tile
	} from 'carbon-components-svelte';
	import { methods_glossary, ms_provenance_tags } from '$lib/methods';
</script>

<Breadcrumb class="mb-8">
	<BreadcrumbItem href={base}>Home</BreadcrumbItem>
</Breadcrumb>

<div class="max-w-[85ch]">
	<h1 class="mb-8 md:text-5xl">M/S Data Guide</h1>
	<div class="my-6">
		<h2 class="mb-2">Contents</h2>
		<ul class="list-inside list-disc [&_ul]:list-[revert]">
			<li class="pt-2">
				<a href="#introduction">Introduction</a>
				<ul class="list-inside indent-4">
					<li class="pt-2"><a href="#training-set">Training Set</a></li>
					<li class="pt-2"><a href="#metadata-sources">Metadata Sources</a></li>
					<li class="pt-2"><a href="#metadata-note">Metadata on Sex and Complexion</a></li>
				</ul>
			</li>
			<li class="pt-2"><a href="#methods-glossary">Methods Glossary</a></li>
			<li class="pt-2"><a href="#tags">Data Provenance Tags</a></li>
		</ul>
	</div>

	<h2 id="introduction" class="my-4">Introduction</h2>

	<h3 id="training-set" class="mb-4 mt-6 text-base uppercase tracking-widest md:text-lg">
		Training Set
	</h3>
	<p class="py-2">
		This M/S Reading Room prototype allows users to search the test set of A-Files using metadata
		derived from two sources: the publicly available U.S. National Archives (NARA) catalog metadata,
		and metadata based on information extracted by our machine learning models.
	</p>
	<p class="py-2">
		Most of the training set is made up of files ordered from the Kansas City regional office of
		NARA, where the vast majority of public domain A-Files are held. While these A-files are in the
		public domain (A-files enter the public domain when the birth year of the file holder is at
		least 100 years in the past), NARA reviews each file for third-party privacy violations and
		redacts information as necessary. NARA levies a processing fee of either $27 or $40 (depending
		on the file holder’s year of birth) for each A-File ordered online. Faced with a catalog of a
		million files and a budget for 550 files, we made selections designed to achieve regional and
		temporal breadth, with additional files for two countries of origin (Mexico and Haiti) to enable
		greater depth of research. The remainder of the training set comes from <OutboundLink
			size="lg"
			href="https://catalog.archives.gov/search?typeOfMaterials=Textual%20Records&availableOnline=true&recordGroupNumber=566"
			>A-Files made public by NARA’s San Francisco regional office</OutboundLink
		> and a relatively small number of A-Files obtained from USCIS via that agency’s Electronic Reading
		Room and our Freedom of Information Act (FOIA) requests for the A-Files of verifiably deceased individuals.
		The USCIS files are being used for model training purposes only and are not included in this prototype.
	</p>

	<h3 id="metadata-sources" class="mb-4 mt-6 text-base uppercase tracking-widest md:text-lg">
		Metadata Sources
	</h3>
	<p class="py-2">
		The <OutboundLink
			size="lg"
			href="https://docs.google.com/document/u/0/d/1lnvN77_CaBnOzg9HBF-jtWTwJlisgKoD3E1RKHwQByQ/"
			>metadata available in the NARA catalog</OutboundLink
		> for A-Files varies. Every five years, files that have entered the public domain are transferred
		from the federal agency governing immigration (INS or USCIS) to NARA. At the time of the transfer,
		the agencies determine which metadata fields attached to the files will be transferred, resulting
		in variability in metadata across the entire NARA catalog (approximately 1.6 million A-Files). The
		basic metadata always available from the NARA catalog for each A-File includes date of birth, first
		name, last name, and country of birth. Additional metadata from the NARA catalog can include sex,
		date of entry, port of entry, date file opened, father’s name, mother’s name, date and location of
		naturalization, naturalization certificate number, and class of admission. Reference tables are available
		to identify the agency codes used for <OutboundLink
			size="lg"
			href="https://docs.google.com/spreadsheets/d/1LfmR0QLmalz_6rJT_37QjRyFggsCXXOl5e24nOuw6XI/"
			>countries</OutboundLink
		>, <OutboundLink
			size="lg"
			href="https://docs.google.com/spreadsheets/d/1Zhs2RUElDE96EJmXGOCogfUdukj6mpbhWwsd6e2Sb34/"
			>ports of entry</OutboundLink
		>, and <OutboundLink
			size="lg"
			href="https://docs.google.com/spreadsheets/d/1DH_0Wf0ALAB72D-v1Gu3sl7Iv_d6doSMv5-jj_r5Crc/"
			>naturalization locations</OutboundLink
		>.
	</p>
	<p class="py-2">
		The metadata created by the <span class="italic">Migrants and the State</span> project has been
		derived using a variety of machine learning methods deployed on a training set of 751 files
		comprising 37,396 individual pages. The model training involved two main stages: categorizing
		documents and extracting information from them. In general, our approach has prioritized
		training models to address a larger number of data identification tasks rather than attempting
		fewer tasks and refining the models to achieve peak accuracy. We started by developing a model
		(using <Link size="lg" href="#dnn">Deep Neural Networks</Link>) to create image embeddings for
		every page in the training set. Members of the team reviewed each page to identify
		machine-generated errors and used that information to improve the model’s performance in
		distinguishing among <Link
			size="lg"
			href="{base}/results/page?query=&limit_fields.doctype.ms_doctype_v1=form">forms</Link
		>, <Link size="lg" href="{base}/results/page?query=&limit_fields.doctype.ms_doctype_v1=letter"
			>letters</Link
		>, <Link
			size="lg"
			href="{base}/results/page?query=&limit_fields.doctype.ms_doctype_v1=photograph"
			>photographs</Link
		>, and other kinds of materials (which we labelled <Link
			size="lg"
			href="{base}/results/page?query=&limit_fields.doctype.ms_doctype_v1=misc">“misc”</Link
		>).
	</p>
	<p class="py-2">
		While the model identifying document types relied on the visual information on each A-File page,
		the ability to extract text information required the use of <Link size="lg" href="#ocr"
			>Optical Character Recognition (OCR)</Link
		> to create a machine-readable text version of the training set. This text allows us to perform general
		text extraction (identifying the presence of text in the body of a document, similar to a keyword
		search) as well as extracting information from a specific location within a document (for example,
		a form title or answer to a question).
	</p>
	<p class="py-2">
		We used existing <Link size="lg" href="#ner">Named Entity Recognition (NER)</Link> techniques to
		extract information about the years and country names included in each A-File. For document-specific
		metadata extraction, we chose the G-325 and Certificate of Naturalization forms as our test cases
		for training models (using a Large Language Model approach) that can identify a form type and extract
		specific information from it. The information the models can extract from these forms (employment
		history, residential addresses, and biographical details) is valuable in its own right, but we are
		also attempting to develop a scalable technique that can later be applied to other forms.
	</p>

	<h3 id="metadata-note" class="mb-4 mt-6 text-base uppercase tracking-widest md:text-lg">
		Metadata on Sex and Complexion
	</h3>
	<p class="py-2">
		The NARA catalog metadata, compiled as a limited subset of the metadata created by INS / USCIS,
		often lacks entries corresponding to the field designating biological sex. But information on
		biological sex, along with other biometric data required by government forms, appears frequently
		across documents in A-Files. We used an open-source <Link size="lg" href="#llm"
			>Large Language Model (LLM)</Link
		> to extract this data from the individual pages of A-Files, typically from forms where a biological
		sex designation (e.g. Male / Female) is required. The model then aggregates the total number of identifications
		for biological sex and predicts the sex of the A-File holder. The LLM derived metadata is not 100%
		accurate, and the prototype allows you to compare NARA’s metadata for sex with the metadata extracted
		by the M/S trained LLM.
	</p>
	<p class="py-2">
		Extracting metadata to reflect historical government categories and bureaucratic norms around
		biological sex is relatively straightforward, given the binary categories of male and female
		then in use. Extracting metadata about ethno-racial categorization is more complex. This
		information often takes the form of indications of a file holder’s complexion, for which
		migrants and immigration officers used a variety of adjectives, many of them offensive to
		contemporary sensibilities. Currently, our models extract complexion data only from the
		Certificate of Naturalization forms. From the subset of data available in this prototype,
		complexion was recorded directly in these documents as <Link
			size="lg"
			href="{base}/results/natcert?selectedFields=fields.certificate_naturalization.complexion.complexion_llm_v1&query=medium"
			>medium</Link
		>, <Link
			size="lg"
			href="{base}/results/natcert?selectedFields=fields.certificate_naturalization.complexion.complexion_llm_v1&query=dark"
			>dark</Link
		>, or <Link
			size="lg"
			href="{base}/results/natcert?selectedFields=fields.certificate_naturalization.complexion.complexion_llm_v1&query=fair"
			>fair</Link
		>, if at all. Our models attempt to record these terms exactly or add an <Link
			size="lg"
			href="{base}/results/natcert?selectedFields=fields.certificate_naturalization.complexion.complexion_llm_v1&query=n.a"
			>N.A</Link
		> value if they do not find a complexion value on the page.
	</p>
	<p class="py-2">
		We crucially do not try to infer or profile a value through other cues in the A-File. Our aim is
		to organize the specific terms used by immigration bureaucracies over time as objects of study
		without intervention or curation. Nevertheless, please note that these metadata values, like
		others generated by machine learning in our corpus, are not 100% accurate. Additionally, more
		terms will likely emerge as we incorporate A-Files from broader time periods. For these reasons,
		we plan to solicit and incorporate user feedback to improve how we render this data with care.
	</p>
</div>

<h2 id="methods-glossary" class="py-4">Methods Glossary</h2>
<div class="my-10 grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3">
	{#each methods_glossary as method}
		<Tile id={method.id}>
			<dl class="w-full">
				<dt class="text-base font-semibold">{method.term}</dt>
				<dd class="py-2 leading-normal">
					{method.description}
					{#if method.models}
						<span class="block py-2 font-mono text-xs">
							M/S models used: {#each method.models as model, i}<OutboundLink
									size="sm"
									href={model.link}>{model.name}</OutboundLink
								>&nbsp;{/each}
						</span>
					{/if}
				</dd>
			</dl>
		</Tile>
	{/each}
</div>

<h2 id="tags" class="py-4">Data Provenance Tags</h2>
<p class="pt-2 pb-6 max-w-[85ch]">
	When exploring A-Files in the M/S Reading Room prototype, you'll see the following "data provenance tags" next to metadata fields by the A-File viewer. Clicking one will take you to the corresponding tag below, where you will find context for the source of that data. Definitions for terms like "LLM", "NLP", and "OCR" can be found above.
</p>
<div class="w-full">
	<div class="flex gap-6 py-4">
		<div class="min-w-56">
			<Link href="#nara">
				<Tag interactive id="nara" type="blue">#nara</Tag>
			</Link>
		</div>
		<div>
			<p class="max-w-[85ch] text-sm">
				Fields with this tag come directly from the U.S. National Archives catalog.
			</p>
		</div>
	</div>

	{#each Object.entries(ms_provenance_tags) as [tag, description]}
		<div class="flex gap-6 py-4">
			<div class="min-w-56">
				<Link href={`#${tag}`}>
					<Tag interactive id={tag} type="green">#{tag}</Tag>
				</Link>
			</div>
			<div>
				<p class="max-w-[85ch] text-sm">
					{description}
				</p>
			</div>
		</div>
	{/each}
</div>
