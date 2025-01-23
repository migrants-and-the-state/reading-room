<script>
	import { base } from '$app/paths';
	import { Breadcrumb, BreadcrumbItem, Link, Tag } from 'carbon-components-svelte';
</script>

<Breadcrumb noTrailingSlash class="mb-8">
	<BreadcrumbItem href={base}>M/S Corpus UI v1-Sample</BreadcrumbItem>
	<BreadcrumbItem href="/data-guide" isCurrentPage>Data Guide</BreadcrumbItem>
</Breadcrumb>

<h1>Data Guide</h1>

<h2 class="py-4">Introduction</h2>
<p class="py-1">
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eleifend diam orci, sed aliquet
	enim malesuada sit amet. Sed sollicitudin viverra elit, non vehicula lacus posuere ut. Suspendisse
	et porttitor mauris. Nam at convallis leo. Vestibulum cursus, magna vitae venenatis porttitor,
	ipsum mi posuere est, at accumsan dolor tellus vitae purus. Suspendisse porttitor gravida laoreet.
	Integer tristique elementum ipsum fermentum accumsan. Vivamus arcu elit, pulvinar nec semper et,
	auctor et augue. Nunc sed fringilla nisl, sit amet placerat tellus. Etiam nec mollis nisi, vel
	tincidunt erat. Maecenas vel porta mi, sit amet faucibus massa. Nulla facilisi. Suspendisse tortor
	diam, egestas vel lobortis rutrum, fermentum eu orci. Nam vehicula dignissim neque ac
	sollicitudin. Morbi vel hendrerit metus, non tristique nunc.
</p>
<p class="py-1">
	Aenean sit amet sapien nunc. Nam bibendum libero et augue varius, in lobortis ipsum fringilla.
	Duis aliquet mauris non ultricies porta. Curabitur risus mauris, ultricies et molestie id,
	venenatis posuere dolor. Maecenas non nibh justo. Maecenas eget pellentesque lorem. Aliquam
	vehicula purus et egestas rhoncus. Aliquam erat volutpat.
</p>

<h2 class="py-4">Provenance Tags</h2>
<div class="w-full">
	<div class="flex gap-6 py-4">
		<div class="min-w-32">
			<Link href="#nara">
				<Tag interactive id="nara" type="blue"># nara</Tag>
			</Link>
		</div>
		<div>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eleifend diam orci, sed
				aliquet enim malesuada sit amet. Sed sollicitudin viverra elit, non vehicula lacus posuere
				ut. Suspendisse et porttitor mauris. Nam at convallis leo. Vestibulum cursus, magna vitae
				venenatis porttitor, ipsum mi posuere est, at accumsan dolor tellus vitae purus. Suspendisse
				porttitor gravida laoreet. Integer tristique elementum ipsum fermentum accumsan. Vivamus
				arcu elit, pulvinar nec semper et, auctor et augue. Nunc sed fringilla nisl, sit amet
				placerat tellus. Etiam nec mollis nisi, vel tincidunt erat. Maecenas vel porta mi, sit amet
				faucibus massa. Nulla facilisi. Suspendisse tortor diam, egestas vel lobortis rutrum,
				fermentum eu orci. Nam vehicula dignissim neque ac sollicitudin. Morbi vel hendrerit metus,
				non tristique nunc.
			</p>
		</div>
	</div>
	<div class="flex gap-6 py-4">
		<div class="min-w-32">
			<Link href="#ms_sex_llm_v1">
				<Tag interactive id="ms_sex_llm_v1" type="green"># ms_sex_llm_v1</Tag>
			</Link>
		</div>
		<div>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eleifend diam orci, sed
				aliquet enim malesuada sit amet. Sed sollicitudin viverra elit, non vehicula lacus posuere
				ut. Suspendisse et porttitor mauris. Nam at convallis leo. Vestibulum cursus, magna vitae
				venenatis porttitor, ipsum mi posuere est, at accumsan dolor tellus vitae purus. Suspendisse
				porttitor gravida laoreet. Integer tristique elementum ipsum fermentum accumsan. Vivamus
				arcu elit, pulvinar nec semper et, auctor et augue. Nunc sed fringilla nisl, sit amet
				placerat tellus. Etiam nec mollis nisi, vel tincidunt erat. Maecenas vel porta mi, sit amet
				faucibus massa. Nulla facilisi. Suspendisse tortor diam, egestas vel lobortis rutrum,
				fermentum eu orci. Nam vehicula dignissim neque ac sollicitudin. Morbi vel hendrerit metus,
				non tristique nunc.
			</p>
		</div>
	</div>
</div>
