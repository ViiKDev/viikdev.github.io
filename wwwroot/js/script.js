const styleVars = document.documentElement.style
const animationElements = document.querySelectorAll('.animate-on-scroll')
const projectsList = document.querySelector('#projectsList')

let aboutLanguages = ["HTML", "CSS", "JavaScript", "React", "React-Native"]
let aboutDatabases = ["Prisma", "SQLite"]

const getRepos = () => {
	projectsList.appendChild(createSkeleton())
	fetch('https://api.github.com/users/ViiKDev/repos')
		.then((response) => response.json())
		.then((data) => {
			listRepos(data)
		})
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
	li.title = description ? description : 'This project has no description'

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

function mountString(list) {
	let str = list[0]
	for (let i = 1; i < list.length; i++) {
		str = str + ', ' + list[i]
	}
	return str
}

function generateTooltip(obj, type) {
	let objPos = obj.offset()
	let objWidth = obj[0].offsetWidth
	let tooltip = document.createElement('div')
	tooltip.classList.add('tooltip')

	let span = document.createElement('span')
	span.innerText = type == 'lang' ? mountString(aboutLanguages) : type == 'dbs' ? mountString(aboutDatabases) : 'This should\'nt have happened!'
	tooltip.appendChild(span)

	document.querySelector('body').appendChild(tooltip)

	let tooltipWidth = $('.tooltip')[0].offsetWidth


	$('.tooltip').offset({
		top: objPos.top + 28,
		left: objPos.left - (tooltipWidth / 2) + (objWidth / 2)
	})
}

// JQuery Detections

$('.curriculum span:not(.mobile)').click(function () {
	w2popup.open({
		title: 'Curriculum',
		body: '<div class="w2ui-centered"><a href="../wwwroot/ext/Curriculum Vitae - Viktor Bonazza Charlanti.pdf" download><button class="download-button"><i class="fa fa-download"></i><span>Download</span></button></a><img src="../wwwroot/img/Curriculum Vitae - Viktor Bonazza Charlanti.png"></img></div>'
	});
});

$('.options li span:not(.mobile)').click(function () {
	w2popup.open({
		title: 'Curriculum',
		body: '<div class="w2ui-centered"><a href="../wwwroot/ext/Curriculum Vitae - Viktor Bonazza Charlanti.pdf" download><button class="download-button"><i class="fa fa-download"></i><span>Download</span></button></a><img src="../wwwroot/img/Curriculum Vitae - Viktor Bonazza Charlanti.png"></img></div>'
	});
});

$('.aboutSpan').mouseover(function () {
	generateTooltip($(this), this.getAttribute('forList'))
})

$('.aboutSpan').mouseout(function () {
	$('.tooltip').remove()
})

// For Mobile

$('.curriculum .mobile').click(function () {
	w2popup.open({
		title: 'Curriculum',
		body: '<div class="w2ui-centered"><a class="animate-curriculum-download" href="../wwwroot/ext/Curriculum Vitae - Viktor Bonazza Charlanti.pdf" download><span>Click to Download</span><img src="../wwwroot/img/Curriculum Vitae - Viktor Bonazza Charlanti.png"></img></a></div>'
	});
});

$('.options li .mobile').click(function () {
	w2popup.open({
		title: 'Curriculum',
		body: '<div class="w2ui-centered"><a class="animate-curriculum-download" href="../wwwroot/ext/Curriculum Vitae - Viktor Bonazza Charlanti.pdf" download><span>Click to Download</span><img src="../wwwroot/img/Curriculum Vitae - Viktor Bonazza Charlanti.png"></img></a></div>'
	});
});

$('.hamburguer').click(function () {
	let list = $('ul.options')
	if (list.hasClass('active')) {
		list.removeClass('active')
		$('header')[0].removeAttribute('style')
	} else {
		list.addClass('active')
		$('header')[0].style.setProperty('background-color', 'black')
		for (let i = 0; i < list[0].children.length; i++) {
			console.log(list[0].children[i])
			// add delay to animations
		}
	}
})

window.addEventListener('click', function (e) {
	if (!document.querySelector('.hamburguer').contains(e.target)) {
		let list = $('ul.options')
		list.removeClass('active')
		$('header')[0].removeAttribute('style')
	}
})

// Test Purposes

// function getOffset(el) {
// 	const rect = el.getBoundingClientRect();
// 	return {
// 		left: rect.left + window.scrollX,
// 		top: rect.top + window.scrollY
// 	};
// }