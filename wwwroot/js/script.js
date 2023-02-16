const styleVars = document.documentElement.style
const animationElements = document.querySelectorAll('.animate-on-scroll')
const projectsList = document.querySelector('#projectsList')

const getRepos = () => {
	projectsList.appendChild(createSkeleton())
	fetch('https://api.github.com/users/ViiKDev/repos')
		.then((response) => response.json())
		.then((data) => listRepos(data))
}

getRepos()

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('animate')
		}
		// else { Add this to animate every time element appears on screen
		// 	entry.target.classList.remove('animate')
		// }
	})
})

for (let i = 0; i < animationElements.length; i++) {
	const el = animationElements[i];
	observer.observe(el)
}

window.onscroll = function () {
	var top = window.scrollY;
	if (top >= 100) {
		styleVars.setProperty('--header-color-control', 'var(--main-darker-color)')
	}
	else {
		styleVars.setProperty('--header-color-control', 'transparent')
	}
}

function scrollToElement(id) {
	$(`#${id}`)[0].scrollIntoView()
}

function listRepos(data) {
	removeSkeleton()
	for (let i = 0; i < data.length; i++) {
		let name = data[i].name
		if (name.includes('HCJ-') || name.includes('React-') || name.includes('uranimes')) {
			let li = createLi(data[i])
			projectsList.appendChild(li)
		}
	}
}

function createLi({ name, description }) {
	let li = document.createElement('li')
	li.title = description

	let a = document.createElement('a')
	a.classList.add('projs')
	a.innerText = name
	a.href = `https://viikdev.github.io/${name}`
	a.target = '_blank'

	li.appendChild(a)
	return li
}

function createSkeleton() {
	let skeleton = document.createElement('skeleton')
	let iS = document.createElement('innerSkeleton')

	skeleton.appendChild(iS)

	return skeleton
}

function removeSkeleton() {
	projectsList.removeChild(document.querySelector('skeleton'))
}

// Click Detections

$('.curriculum span').click(function () {
	w2popup.open({
		title: 'Curriculum',
		body: '<div class="w2ui-centered"><a href="../wwwroot/ext/Curriculum Vitae - Viktor Bonazza Charlanti.pdf" download><button class="download-button"><i class="fa fa-download"></i><span>Download</span></button></a><img src="../wwwroot/img/Curriculum Vitae - Viktor Bonazza Charlanti.png"></img></div>'
	});
});

$('.options li span').click(function () {
	w2popup.open({
		title: 'Curriculum',
		body: '<div class="w2ui-centered"><a href="../wwwroot/ext/Curriculum Vitae - Viktor Bonazza Charlanti.pdf" download><button class="download-button"><i class="fa fa-download"></i><span>Download</span></button></a><img src="../wwwroot/img/Curriculum Vitae - Viktor Bonazza Charlanti.png"></img></div>'
	});
});

// Test Purposes

// function getOffset(el) {
// 	const rect = el.getBoundingClientRect();
// 	return {
// 		left: rect.left + window.scrollX,
// 		top: rect.top + window.scrollY
// 	};
// }