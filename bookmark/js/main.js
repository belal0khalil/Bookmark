var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteurl");
var tablebody = document.getElementById("tableBody");
// App varaibles
var bookmarklist =  JSON.parse(localStorage.getItem("bookmarks")) || [];
displayAllBookmarks();
var sitenameregex = /^[A-Za-z]{4,}$/;
var siteurlregex = /^(https?:\/\/)?(www\.)?[a-z]+\.(com|net)$/;
// functions
function saveBookmark() {
    if(validation(sitenameregex , siteName) && validation(siteurlregex , siteUrl)) {
        var bookmark = {
            name: siteName.value,
            url : siteUrl.value
        };
        bookmarklist.push(bookmark)
        localStorage.setItem("bookmarks" , JSON.stringify(bookmarklist));
        displayBookmark(bookmarklist.length -1);
        clearInputs(); 
    } else {
        alert("Invalid input");
    }
}
function displayBookmark(index) {
    var bookmarkRow = `
     <tr class="border-bottom">
                    <td class="text-center p-2">${index + 1}</td>
                    <td class="text-center p-2"> ${bookmarklist[index].name}</td>
                    <td class="text-center p-2">
                     <a href="${bookmarklist[index].url}" target="_blank">
                        <button class="btn btn-success" id="visitbutton" type="button">visit</button>
                     </a>
                    </td>
                    <td class="text-center p-2"> 
                            <button class="btn btn-danger" id="deletebutton" type="button" onclick="deleteBookmark(${index})">Delete</button>
                    </td>  
                </tr>
    `
    tablebody.innerHTML += bookmarkRow ;
}
function displayAllBookmarks() {
    for(var i = 0 ; i< bookmarklist.length ; i++) {
        displayBookmark(i)
    }
}
function clearInputs() {
    siteName.value= "";
    siteUrl.value = "";
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");
}
function deleteBookmark(index) {
    bookmarklist.splice(index , 1);
    localStorage.setItem("bookmarks" , JSON.stringify(bookmarklist));
    teblebody.innerHTML = "";
    displayAllBookmarks();
}
function validation(regex, element) {
    if(regex.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.add("d-none");
        return true;
    }else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.remove("d-none");
        return false;
    }
}
