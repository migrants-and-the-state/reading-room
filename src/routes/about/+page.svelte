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
			name: 'Marii Nyrop',
			title: 'Data Engineer and UI Developer, NYU'
		},
		{
			name: 'Ajay Krishnan Gopalan',
			title: 'Data Scientist, NYU'
		},
		{
			name: 'Joaquin Navarrette',
			title: 'Data Assistant, NYU'
		},
		{
			name: 'Elijah VanderMolen',
			title: 'Student Assistant, NYU'
		},
		{
			name: 'Emma Jeong',
			title: 'Student Assistant, NYU'
		},
		{
			name: 'Ashley Sarkisian',
			title: 'Student Assistant, NYU'
		},
		{
			name: 'Marco Garcia',
			title: 'Student Assistant, NYU'
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
			title: 'Senior Historian at U.S. Citizenship'
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
		Migrants and the State began in 2020 when a group of NYU faculty and graduate students came
		together to investigate the record-keeping practices of migrant advocates, attorneys, and the
		federal government. It became clear that our era’s so-called “border crisis” is ultimately
		inseparable from the long history of migrations and migration restrictions in the hemisphere and
		throughout the world. This history is amply documented in the approximately 1.6 million public
		domain A-files held by the U.S. National Archives, yet because of the limited information
		available in NARA’s catalog, these files are virtually impossible to explore at scale. (A-files
		enter the public domain when the birth year of the file holder is at least 100 years in the
		past.) A-files open a window into migrant experiences and the operations of the administrative
		state and have exceptional potential for humanities research as well as for explorations in
		personal, family, and community history. The Migrants and the State team is working to harness
		machine learning and data curation methods to increase visibility into the contents of each
		A-file, thus enabling members of migrant communities and scholars to tap into the rich trove of
		information contained within them and understand histories of migration in new ways. While this
		prototype contains XX files comprising XXX pages, we used a training set of xx files totalling
		xxx pages to test and refine our machine learning models.
	</p>
	<p class="py-2">
		Migrants and the State received early stage funding from the NYU Bennett-Polonsky Humanities Lab
		program, NYU Center for the Humanities, and the NYU Office of the Provost Humanities Mega-Grants
		Initiative Seed Fund. The Migrants and the State digital prototype has been made possible in
		part by a major grant from the National Endowment for the Humanities Digital Humanities
		Advancement Grant program: Democracy demands wisdom.
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
	<ul class="py-2">
		{#each directors as director}
			<li class="py-2">
				<span class="text-lg font-bold">{director.name}</span><br />
				{director.title}
			</li>
		{/each}
	</ul>

	<h2 id="project-collaborators" class="my-4">Project Collaborators</h2>
	<ul class="py-2">
		{#each collaborators as collaborator}
			<li class="py-2">
				<span class="text-lg font-bold">{collaborator.name}</span><br />
				{collaborator.title}
			</li>
		{/each}
	</ul>

	<h2 id="project-advisors" class="my-4">Project Advisors</h2>
	<ul class="py-2">
		{#each advisors as collaborator}
			<li class="py-2">
				<span class="text-lg font-bold">{collaborator.name}</span><br />
				{collaborator.title}
			</li>
		{/each}
	</ul>

	<h2 id="gratitude" class="my-4">Gratitude</h2>
	<p class="py-2">
		Special thanks to: Ben Schmidt, Molly Rogers, Elizabeth Burnes, Jake Ersland, Gabriela Basterra,
		Calista LaMotte, Johanna Morales, Alexandra Cordero, Karin Burrell, Rebecca Maner, Alona Bach,
		Maddalena Marinari, Adam Goodman, Anna Law, Benjamin Berman-Gladstone, Bita Mousavi, Barbara
		Perez Curiel, Sarah Sklaw, Alexia Orengo-Green, Jason Ahlenius, and Alec Ferretti.
	</p>
</div>
