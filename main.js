const words = require(`an-array-of-english-words`)

let i = 0

function createNewNode() {
    let newNode = document.createElement(`li`)
    newNode.id = i
    let beforeBtn = document.createElement(`button`)
    beforeBtn.textContent = `+`
    beforeBtn.className = `btn btn-primary`
    beforeBtn.onclick = (e) => {
        insertBefore(e, createNewNode())
    }
    let deleteBtn = document.createElement(`button`)
    deleteBtn.textContent = `X`
    deleteBtn.className = "btn btn-danger"
    deleteBtn.onclick = (e) => {
        deleteNode(e)
    }
    let afterBtn = document.createElement(`button`)
    afterBtn.textContent = `+`
    afterBtn.className = `btn btn-primary`
    afterBtn.onclick = (e) => {
        insertAfter(e, createNewNode())
    }
    let input = document.createElement(`input`)
    input.placeholder = `new node ${i++}`
    input.onkeyup = (e) => {
        listner(e)
    }
    newNode.append(beforeBtn, deleteBtn, input, afterBtn)
    return newNode
}

function createFirstNode() {
    let ul = document.querySelector(`ul`)
    console.log(ul)
    let newNode = document.createElement(`li`)
    newNode.id = i
    let beforeBtn = document.createElement(`button`)
    beforeBtn.textContent = `+`
    beforeBtn.className = `btn btn-primary`
    beforeBtn.onclick = (e) => {
        insertBefore(e, createNewNode())
    }
    let deleteBtn = document.createElement(`button`)
    deleteBtn.textContent = `X`
    deleteBtn.className = `btn btn-danger`
    deleteBtn.onclick = (e) => {
        deleteNode(e)
    }
    let afterBtn = document.createElement(`button`)
    afterBtn.textContent = `+`
    afterBtn.className = `btn btn-primary`
    afterBtn.onclick = (e) => {
        insertAfter(e, createNewNode())
    }
    let input = document.createElement(`input`)
    input.placeholder = `new node ${i++}`
    input.onkeyup = (e) => {
        listner(e)
    }
    newNode.append(beforeBtn, deleteBtn, input, afterBtn)
    ul.append(newNode)
}

function deleteNode(e) {
    e.preventDefault()
    console.log(`removing node ${e.target.parentElement.id}`)
    e.target.parentElement.remove()
}

function insertAfter(e, newNode) {
    e.preventDefault()
    let referenceNode = e.target.parentNode
    console.log(`nodeID=>`,newNode.id)
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function insertBefore(e, newNode) {
    e.preventDefault()
    let referenceNode = e.target.parentNode
    console.log(`nodeID=>`,newNode.id)
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
}

function listner(e) {
    let timer = false
    e.preventDefault()
    clearTimeout(timer)
    timer = setTimeout(() => {
        console.log(`word to search`,e.target.value)
        autocomplete(e.target, getMatchingWords(e.target.value))
    }, 300)
}

function getMatchingWords(target) {
    let wordsArray = words.filter((word) => new RegExp('^' + `${target}`).test(word))
    let arr = []
    wordsArray.forEach((word, i) => {
        arr.push(word)
    })
    return arr.sort((x, y) => x.length - y.length)
}


function autocomplete(inp, arr) {
    console.log(`inp.id`,inp.parentNode.id)
    var currentFocus;
    var a, b, i, val = inp.value;
    var valuesArray = []
    closeAllLists();
    if (!val) {
        return false;
    }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", inp.parentNode.id+ "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    inp.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            b.addEventListener("click", function (e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            // a.appendChild(b);
            valuesArray.push(b)
        }
    }
    valuesArray = valuesArray.slice(0, 5)
    valuesArray.forEach((node) => {
        a.appendChild(node)
    })

    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(inp.parentNode.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) { //up
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}


createFirstNode()