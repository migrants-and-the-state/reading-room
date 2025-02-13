<script>
	import { base } from '$app/paths';
	import { Breadcrumb, BreadcrumbItem, Link, OutboundLink } from 'carbon-components-svelte';

	const directors = [
		{
			name: 'Sibylle Fischer',
			title:
				'Associate Professor of History, Spanish and Portuguese, and Latin American Studies, NYU'
		},
		{
			name: 'Ellen Noonan',
			title: 'Clinical Professor of History and Director, Archives and Public History Program, NYU'
		},
		{
			name: 'Bryan Zehngut-Willits',
			title: 'Immigration historian and doctoral candidate in History, NYU'
		}
	];

	const collaborators = [
		{
			role: 'Data Engineer and UI Developer',
			value: 'Marii Nyrop'
		},
		{
			role: 'Data Scientist',
			value: 'Ajay Krishnan Gopalan'
		},
		{
			role: 'Data Assistant',
			value: 'Joaquin Navarrette'
		},
		{
			role: 'Student Assistants',
			value: 'Elijah VanderMolen, Emma Jeong, Ashley Sarkisian, Marco Garcia'
		}
	];

	const advisors = [
		{
			name: 'Adam Cox',
			title: 'Robert A. Kindler Professor of Law, NYU'
		},
		{
			name: 'Juliana Freire',
			title: 'Professor of Computer Science and Data Science, NYU'
		},
		{
			name: 'Maria Cristina Garcia',
			title:
				'Howard A. Newman Professor of American Studies in the Department of History, Cornell University'
		},
		{
			name: 'Irvin Ibarguen',
			title: 'Assistant Professor of History, NYU'
		},
		{
			name: 'Kevin Kenny',
			title: 'Professor of History and Director of Glucksman Ireland House, NYU'
		},
		{
			name: 'Shannon O’Neill',
			title: 'Curator for Tamiment-Wagner Collections, NYU'
		},
		{
			name: 'Alexandra Provo',
			title: 'Research Curation Librarian, NYU'
		},
		{
			name: 'Marian Smith',
			title: 'Senior Historian at U.S. Citizenship and Immigration Services (USCIS) (retired)'
		},
		{
			name: 'Lauren Tilton',
			title: 'Associate Professor of Digital Humanities, University of Richmond'
		}
	];
</script>

<Breadcrumb class="mb-8">
	<BreadcrumbItem href={base}>Home</BreadcrumbItem>
</Breadcrumb>

<h1 class="mb-8 md:text-5xl">M/S About + Credits</h1>

<div class="my-6">
	<h2 class="mb-2">Contents</h2>
	<ul class="list-inside list-disc [&_ul]:list-[revert]">
		<li class="py-1"><a href="#project-description">Project Description</a></li>
		<li class="py-1"><a href="#project-directors">Project Directors</a></li>
		<li class="py-1"><a href="#project-collaborators">Project Collaborators</a></li>
		<li class="py-1"><a href="#project-advisors">Project Advisors</a></li>
		<li class="py-1"><a href="#gratitude">Gratitude</a></li>
	</ul>
</div>

<div class="max-w-[90ch]">
	<h2 id="project-description" class="my-4">Project Description</h2>
	<p class="py-2">
		<span class="italic">Migrants and the State (M/S)</span> began in 2020 when a group of NYU faculty
		and graduate students came together to investigate the record-keeping practices of migrant advocates,
		attorneys, and the federal government. It became clear that our era’s “border crisis” is ultimately
		inseparable from the long history of migrations and migration restrictions in the hemisphere and
		throughout the world. This history is amply documented in the approximately 1.6 million public domain
		A-files held by the U.S. National Archives, yet because of the limited information available in NARA’s
		catalog, these files are virtually impossible to explore at scale.
	</p>
	<p class="py-2">
		A-files open a window into migrant experiences and the operations of the administrative state
		and have exceptional potential for humanities research as well as for explorations in personal,
		family, and community history. The M/S team is working to harness machine learning and data
		curation methods to enable members of migrant communities and scholars to tap into the rich
		trove of information contained within them and understand histories of migration in new ways.
		While this prototype contains <Link size="lg" href="{base}/results/afile?query=">423 files</Link
		> comprising <Link size="lg" href="{base}/results/page?query=">20,516 pages</Link>, we used a
		training set of 751 files totalling 37,396 pages to test and refine our machine learning models.
	</p>
	<p class="py-2">
		<span class="italic">Migrants and the State</span> received early stage funding from the NYU Bennett-Polonsky Humanities Lab
		program, NYU Center for the Humanities, and the NYU Office of the Provost Humanities Mega-Grants
		Initiative Seed Fund. The M/S Reading Room digital prototype has been made possible in part by a
		grant from the <OutboundLink size="lg" href="http://www.neh.gov"
			>National Endowment for the Humanities</OutboundLink
		> Digital Humanities Advancement Grant program.
	</p>
	<p class="py-2">
		Any views, findings, conclusions, or recommendations expressed in this web resource do not
		necessarily represent those of the National Endowment for the Humanities.
	</p>

	<div class="my-12 flex max-w-[60%] items-center gap-12">
		<div class="basis-1/2">
			<img
				class="max-w-full"
				alt="National Endowment for the Humanities Logo"
				src="https://www.neh.gov/sites/default/files/styles/medium/public/2024-08/NEH%20Logo%20-%20Full%20Color%20-%20Vertical.jpg"
			/>
		</div>
		<div class="basis-1/2">
			<img
				class="max-w-full"
				alt="New York University Logo"
				src="https://migrants-and-the-state.github.io/images/nyu.png"
			/>
		</div>
	</div>

	<h2 id="project-directors" class="my-4">Project Directors</h2>
	<ul class="py-2 text-base">
		{#each directors as director}
			<li class="py-2">
				<span class="font-bold">{director.name}</span><br />
				{director.title}
			</li>
		{/each}
	</ul>

	<h2 id="project-collaborators" class="my-4">Project Collaborators</h2>
	<ul class="py-2 text-base">
		{#each collaborators as collaborator}
			<li class="py-2">
				<span class="font-bold">{collaborator.role}</span>: {collaborator.value}
			</li>
		{/each}
	</ul>

	<h2 id="project-advisors" class="my-4">Project Advisors</h2>
	<ul class="py-2 text-base">
		{#each advisors as collaborator}
			<li class="py-2">
				<span class="font-bold">{collaborator.name}</span><br />
				{collaborator.title}
			</li>
		{/each}
	</ul>

	<h2 id="gratitude" class="my-4">Gratitude</h2>
	<p class="py-2">
		Special thanks to Ben Schmidt, Molly Rogers, Elizabeth Burnes, Jake Ersland, Gabriela Basterra,
		Calista LaMotte, Johanna Morales, Alexandra Cordero, Karin Burrell, Rebecca Maner, Alona Bach,
		Benjamin Berman-Gladstone, Bita Mousavi, Barbara
		Perez Curiel, Sarah Sklaw, Alexia Orengo-Green, Jason Ahlenius, and Alec Ferretti.
	</p>
</div>
