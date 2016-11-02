// ADD NEW ITEM TO END OF LIST

var myList = document.getElementsByTagName("ul")[0];

var node = document.createElement("li");
node.setAttribute("id", "five");

var content = document.createTextNode("cream");

node.appendChild(content);


myList.appendChild(node);

// ADD NEW ITEM START OF LIST

node = document.createElement("li");
node.setAttribute("id", "zero");

content = document.createTextNode("kale");
node.appendChild(content);

myList.insertBefore(node, myList.childNodes[0]);

// ADD A CLASS OF COOL TO ALL LIST ITEMS

var list_li = document.getElementsByTagName("li");

for (var i = 0; i < list_li.length; i++) {
  list_li[i].className = "cool";
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING

var page = document.getElementsByTagName("h2")[0];

node = document.createElement("span");
content = document.createTextNode(list_li.length);

node.appendChild(content);

page.appendChild(node);
