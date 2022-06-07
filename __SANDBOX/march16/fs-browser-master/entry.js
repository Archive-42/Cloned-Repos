module.exports = list;

function getState(){
	
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'path' + window.location.pathname, true);
	xhr.onload = function(e) {
	  if (this.status == 200) {
	    // Note: .response instead of .responseText
	    const state = this.responseText;
		console.log(state)
	  }
	};
	xhr.send()	
}

getState()

function list(obj){
	
	const p = obj[Object.keys(obj)[0]];

	const div = document.createElement('div');
	const parent = document.createElement('a');
	parent.textContent = Object.keys(obj)[0];
	parent.href = '/' + Object.keys(obj)[0];
	const ul = document.createElement('ul');
	div.appendChild(ul);
	div.appendChild(parent);
	
	const children = [];
	
	for(x in p){
		
		const li = document.createElement('li');
		li.textContent = p[x];
		children.unshift(li)
		
	}
	
	children.forEach(e => {
		ul.appendChild(e)
	})
	
	document.body.appendChild(div)
	
}